use better_cursor::BetterRead;
use std::fs;
use std::sync::Arc;
use std::time::Instant;
use tokio::sync::Mutex;

use crate::editor::questlist::quest_info::QuestInfo;
use sqlx::QueryBuilder;
use sqlx::Result;

pub mod types;

use crate::app::utils::CustomResult;

use super::db::DB;
use super::types::CountResult;
use super::types::PERIOD;
use super::types::SEASON;

use self::types::QuestBinDB;
use self::types::QuestDB;
use self::types::QuestDBQueryOptions;

fn get_quest_buffer(filepath: &str) -> CustomResult<Vec<u8>> {
    let mut reader = better_cursor::from_filepath(filepath)?;
    let result = reader.get_buffer()?;

    Ok(result)
}

pub async fn import_quest(db: &DB, filepath: String) -> CustomResult<()> {
    let filename = filepath.split("\\").collect::<Vec<&str>>().pop().unwrap();
    let quest_id = filename[0..5].parse::<i32>().unwrap();
    let period = filename.chars().nth(5).unwrap();
    let season = filename
        .chars()
        .nth(6)
        .unwrap()
        .to_string()
        .parse::<u8>()
        .unwrap();

    insert_or_update_quest(
        db,
        quest_id,
        PERIOD::from_char(period),
        SEASON::from_u8(season),
        filepath,
    )
    .await?;

    Ok(())
}

pub async fn import_quest_thread(db: DB, files: Arc<Mutex<Vec<String>>>) {
    loop {
        let mut files_lock = files.lock().await;
        let file = files_lock.pop();
        drop(files_lock);

        if let Some(filepath) = file {
            if let Err(err) = import_quest(&db, filepath.clone()).await {
                println!("Failed to import quest {}:{}", filepath, err);
            }
        } else {
            break;
        }
    }
}

async fn do_it_in_parallel(db: &DB, files: Vec<String>) -> Result<()> {
    let files = Arc::new(Mutex::new(files));

    let iter = 0..db.max_connections;
    let futures: Vec<_> = iter
        .map(|_| {
            let files_ref = Arc::clone(&files);
            return tokio::spawn(import_quest_thread(db.clone(), files_ref));
        })
        .collect();

    let futures = futures;

    for f in futures.into_iter() {
        f.await.unwrap();
    }
    Ok(())
}

pub async fn import_quests(db: &DB, folderpath: String) -> Result<()> {
    let files = fs::read_dir(folderpath)?;
    let files: Vec<String> = files
        .map(|f| f.unwrap().path().to_str().unwrap().to_string())
        .collect();

    let now = Instant::now();
    do_it_in_parallel(db, files).await?;
    println!("{}", now.elapsed().as_secs());
    Ok(())
}

pub async fn count_quests(db: &DB, options: QuestDBQueryOptions) -> Result<u32> {
    let mut query = QueryBuilder::new(
        "
            SELECT COUNT(*) as count
            FROM quests
            where 1=1
        ",
    );

    if let Some(quest_id) = options.quest_id {
        query.push(" AND quest_id = ");
        query.push_bind(quest_id);
    }

    if let Some(period) = options.period {
        query.push(" AND period = ");
        query.push_bind(period);
    }

    if let Some(season) = options.season {
        query.push(" AND season = ");
        query.push_bind(season);
    }

    if let Some(title) = options.title {
        query.push(" AND title like ");
        query.push_bind(title);
    }

    if let Some(main_objective) = options.main_objective {
        query.push(" AND main_objective like ");
        query.push_bind(main_objective);
    }

    if let Some(sub_a_objective) = options.sub_a_objective {
        query.push(" AND sub_a_objective like ");
        query.push_bind(sub_a_objective);
    }

    if let Some(sub_b_objective) = options.sub_b_objective {
        query.push(" AND sub_b_objective like ");
        query.push_bind(sub_b_objective);
    }

    if let Some(reward_item1) = options.reward_item1 {
        query.push(" AND reward_item1 = ");
        query.push_bind(reward_item1);
    }

    if let Some(reward_item2) = options.reward_item2 {
        query.push(" AND reward_item2 = ");
        query.push_bind(reward_item2);
    }

    if let Some(reward_item3) = options.reward_item3 {
        query.push(" AND reward_item3 = ");
        query.push_bind(reward_item3);
    }

    let result = query
        .build_query_as::<CountResult>()
        .fetch_one(&db.pool)
        .await?;

    Ok(result.count as u32)
}

pub async fn get_quests(db: &DB, options: QuestDBQueryOptions) -> Result<Vec<QuestDB>> {
    let mut query = QueryBuilder::new("
            SELECT
                quest_id, period, season, title, main_objective, sub_a_objective, sub_b_objective, reward_item1, reward_item2, reward_item3
            FROM quests
            WHERE 1=1
        ");

    if let Some(quest_id) = options.quest_id {
        query.push(" AND quest_id = ");
        query.push_bind(quest_id);
    }

    if let Some(period) = options.period {
        query.push(" AND period = ");
        query.push_bind(period);
    }

    if let Some(season) = options.season {
        query.push(" AND season = ");
        query.push_bind(season);
    }

    if let Some(title) = options.title {
        query.push(" AND title like ");
        query.push_bind(title);
    }

    if let Some(main_objective) = options.main_objective {
        query.push(" AND main_objective like ");
        query.push_bind(main_objective);
    }

    if let Some(sub_a_objective) = options.sub_a_objective {
        query.push(" AND sub_a_objective like ");
        query.push_bind(sub_a_objective);
    }

    if let Some(sub_b_objective) = options.sub_b_objective {
        query.push(" AND sub_b_objective like ");
        query.push_bind(sub_b_objective);
    }

    if let Some(reward_item1) = options.reward_item1 {
        query.push(" AND reward_item1 = ");
        query.push_bind(reward_item1);
    }

    if let Some(reward_item2) = options.reward_item2 {
        query.push(" AND reward_item2 = ");
        query.push_bind(reward_item2);
    }

    if let Some(reward_item3) = options.reward_item3 {
        query.push(" AND reward_item3 = ");
        query.push_bind(reward_item3);
    }

    query.push(" ORDER BY quest_id DESC");

    let per_page = options.per_page.unwrap_or(15);
    query.push(" LIMIT ");
    query.push_bind(per_page as i32);

    let page = options.page.unwrap_or(0);
    query.push(" OFFSET ");
    query.push_bind((page * per_page) as i32);

    let quests = query
        .build_query_as::<QuestDB>()
        .fetch_all(&db.pool)
        .await?;

    Ok(quests)
}

pub async fn get_quest_bin(
    db: &DB,
    quest_id: u32,
    period: PERIOD,
    season: SEASON,
) -> Result<Option<QuestBinDB>> {
    let quest = sqlx::query_as::<_, QuestBinDB>(
        "
            SELECT
                quest_id, period, season, quest_bin
            FROM quests
            WHERE quest_id = $1 AND period = $2 AND season = $3
        ",
    )
    .bind(quest_id as i32)
    .bind(period)
    .bind(season)
    .fetch_optional(&db.pool)
    .await?;

    Ok(quest)
}

pub async fn quest_exists(
    db: &DB,
    quest_id: i32,
    period: &PERIOD,
    season: &SEASON,
) -> Result<bool> {
    let result = sqlx::query(
        "
            SELECT
                quest_id, period, season
            FROM quests
            WHERE quest_id = $1 AND period = $2 AND season = $3
            LIMIT 1
        ",
    )
    .bind(quest_id)
    .bind(period)
    .bind(season)
    .fetch_optional(&db.pool)
    .await?;

    match result {
        None => Ok(false),
        Some(_) => Ok(true),
    }
}

pub async fn insert_or_update_quest(
    db: &DB,
    quest_id: i32,
    period: PERIOD,
    season: SEASON,
    quest_filepath: String,
) -> CustomResult<()> {
    let exists = quest_exists(db, quest_id, &period, &season).await?;

    if exists {
        update_quest(db, quest_id, period, season, quest_filepath).await?;
    } else {
        insert_quest(db, quest_id, period, season, quest_filepath).await?;
    }

    Ok(())
}

pub async fn insert_quest(
    db: &DB,
    quest_id: i32,
    period: PERIOD,
    season: SEASON,
    quest_filepath: String,
) -> CustomResult<()> {
    let quest_info = QuestInfo::from_questfile(&quest_filepath)?;
    let quest_bin = get_quest_buffer(&quest_filepath)?;

    sqlx::query(
        "
            INSERT INTO quests (
                quest_id,
                period,
                season,
                title,
                main_objective,
                sub_a_objective,
                sub_b_objective,
                reward_item1,
                reward_item2,
                reward_item3,
                quest_bin
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11
            )
        ",
    )
    .bind(quest_id)
    .bind(period)
    .bind(season)
    .bind(&quest_info.strings.title)
    .bind(&quest_info.strings.main_objective)
    .bind(&quest_info.strings.sub_a_objective)
    .bind(&quest_info.strings.sub_b_objective)
    .bind(quest_info.quest_type_flags.rewards_focus.item1 as i32)
    .bind(quest_info.quest_type_flags.rewards_focus.item2 as i32)
    .bind(quest_info.quest_type_flags.rewards_focus.item3 as i32)
    .bind(&quest_bin)
    .execute(&db.pool)
    .await?;

    Ok(())
}

pub async fn update_quest(
    db: &DB,
    quest_id: i32,
    period: PERIOD,
    season: SEASON,
    quest_filepath: String,
) -> CustomResult<()> {
    let quest_info = QuestInfo::from_questfile(&quest_filepath)?;
    let quest_bin = get_quest_buffer(&quest_filepath)?;

    sqlx::query(
        "
            UPDATE quests
            SET
                title = $1,
                main_objective = $2,
                sub_a_objective = $3,
                sub_b_objective = $4,
                reward_item1 = $5,
                reward_item2 = $6,
                reward_item3 = $7,
                quest_bin = $8
            WHERE quest_id=$9 AND period=$10 AND season=$11;
        ",
    )
    .bind(&quest_info.strings.title)
    .bind(&quest_info.strings.main_objective)
    .bind(&quest_info.strings.sub_a_objective)
    .bind(&quest_info.strings.sub_b_objective)
    .bind(quest_info.quest_type_flags.rewards_focus.item1 as i32)
    .bind(quest_info.quest_type_flags.rewards_focus.item2 as i32)
    .bind(quest_info.quest_type_flags.rewards_focus.item3 as i32)
    .bind(&quest_bin)
    .bind(quest_id)
    .bind(period)
    .bind(season)
    .execute(&db.pool)
    .await?;

    Ok(())
}
