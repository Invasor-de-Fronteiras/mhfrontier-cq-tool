use editor::questlist::quest_info::QuestInfo;
use editor::questlist::questlist_file::QuestlistFile;
use sqlx::QueryBuilder;
use sqlx::Result;

pub mod types;

use self::types::QuestlistBinDB;
use self::types::QuestlistDB;
use self::types::QuestlistDBOptions;
use self::types::QuestlistDBQueryOptions;

use super::db::DB;
use super::types::CountResult;
use super::types::PERIOD;
use super::types::SEASON;



pub async fn import_questlist(db: &DB, filepath: String) -> Result<()> {
    let mut questlists = QuestlistFile::read_all_questlist(&filepath)?;

    for questlist in questlists.iter_mut() {
        for quest in questlist.quests.iter_mut() {
            insert_or_update_questlist(
                db,
                quest,
                QuestlistDBOptions {
                    position: 0,
                    enable: true,
                    only_dev: false
                },
            )
            .await?;
        }
    }

    Ok(())
}

pub async fn count_questlist(db: &DB, options: QuestlistDBQueryOptions) -> Result<u32> {
    let mut query = QueryBuilder::new(
        "
            SELECT COUNT(*) as count
            FROM questlist
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
        query.push("% ");
    }

    if let Some(category) = options.category {
        query.push(" AND category = ");
        query.push_bind(category);
    }

    if let Some(enable) = options.enable {
        query.push(" AND enable = ");
        query.push_bind(enable);
    }

    if let Some(only_dev) = options.only_dev {
        query.push(" AND only_dev = ");
        query.push_bind(only_dev);
    }

    if let Some(position) = options.position {
        query.push(" AND position = ");
        query.push_bind(position);
    }

    let result = query
        .build_query_as::<CountResult>()
        .fetch_one(&db.pool)
        .await?;

    Ok(result.count as u32)
}

pub async fn get_questlists(db: &DB, options: QuestlistDBQueryOptions) -> Result<Vec<QuestlistDB>> {
    let mut query = QueryBuilder::new("
            SELECT
                quest_id, period, season, category, title, only_dev, enable, priority
            FROM questlist
            where 1=1
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
        query.push("% ");
    }

    if let Some(category) = options.category {
        query.push(" AND category = ");
        query.push_bind(category);
    }

    if let Some(enable) = options.enable {
        query.push(" AND enable = ");
        query.push_bind(enable);
    }

    if let Some(only_dev) = options.only_dev {
        query.push(" AND only_dev = ");
        query.push_bind(only_dev);
    }

    if let Some(position) = options.position {
        query.push(" AND position = ");
        query.push_bind(position);
    }

    if let Some(per_page) = options.per_page {
        query.push(" LIMIT ");
        query.push_bind(per_page as i32);
    }

    if let Some(page) = options.page {
        query.push(" OFFSET ");
        query.push_bind(page as i32);
    }

    let quests = query
        .build_query_as::<QuestlistDB>()
        .fetch_all(&db.pool)
        .await?;

    Ok(quests)
}

pub async fn get_questlist_bin(
    db: &DB,
    quest_id: u32,
    period: PERIOD,
    season: SEASON,
) -> Result<Option<QuestlistBinDB>> {
    let quest = sqlx::query_as::<_, QuestlistBinDB>(
        "
            SELECT
            quest_id, period, season, category, title, only_dev, enable, priority, quest_list_bin
            FROM questlist
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

pub async fn questlist_exists(
    db: &DB,
    quest_id: u32,
    period: PERIOD,
    season: SEASON,
) -> Result<bool> {

    let result = sqlx::query(
        "
            SELECT
                quest_id, period, season
            FROM questlist
            WHERE quest_id = $1 AND period = $2 AND season = $3
            LIMIT 1
        ",
    )
    .bind(quest_id as i32)
    .bind(period)
    .bind(season)
    .fetch_optional(&db.pool)
    .await?;

    println!("questlist_exists: finish");

    match result {
        None => Ok(false),
        Some(_) => Ok(true),
    }
}

pub async fn insert_or_update_questlist(
    db: &DB,
    quest_info: &mut QuestInfo,
    options: QuestlistDBOptions,
) -> Result<()> {
    let period = quest_info.quest_type_flags.get_periot();
    let season = quest_info.quest_type_flags.get_season();
    let quest_id = quest_info.quest_type_flags.main_quest_prop.quest_id;

    let exists = questlist_exists(
        db,
        quest_id as u32,
        PERIOD::from_char(period),
        SEASON::from_u8(season),
    )
    .await?;

    if exists {
        update_questlist(db, quest_info, options).await?;
    } else {
        insert_questlist(db, quest_info, options).await?;
    }

    Ok(())
}

pub async fn insert_questlist(
    db: &DB,
    quest_info: &mut QuestInfo,
    options: QuestlistDBOptions,
) -> Result<()> {
    let questlist_bin = quest_info.get_buffer()?;
    let period = quest_info.quest_type_flags.get_periot();
    let season = quest_info.quest_type_flags.get_season();
    let quest_id = quest_info.quest_type_flags.main_quest_prop.quest_id as i32;

    sqlx::query(
        "
            INSERT INTO questlist (
                quest_id,
                period,
                season,
                category,
                title,
                questlist_bin,
                enable,
                position,
                only_dev
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9
            )
        ",
    )
    .bind(quest_id)
    .bind(PERIOD::from_char(period) as PERIOD)
    .bind(SEASON::from_u8(season) as SEASON)
    .bind(quest_info.header.quest_category as i32)
    .bind(&quest_info.strings.title)
    .bind(&questlist_bin)
    .bind(options.enable)
    .bind(options.position)
    .bind(options.only_dev)
    .execute(&db.pool)
    .await?;

    Ok(())
}

pub async fn update_questlist(
    db: &DB,
    quest_info: &mut QuestInfo,
    options: QuestlistDBOptions,
) -> Result<()> {
    let questlist_bin = quest_info.get_buffer()?;
    let period = quest_info.quest_type_flags.get_periot();
    let season = quest_info.quest_type_flags.get_season();
    let quest_id = quest_info.quest_type_flags.main_quest_prop.quest_id as i32;

    sqlx::query(
        "
            UPDATE questlist
            SET
                category = $1,
                title = $2,
                enable = $3,
                position = $4,
                only_dev = $5,
                questlist_bin = $6,
            WHERE quest_id=$7 AND period=$8 AND season=$9;
        ",
    )
    .bind(quest_info.header.quest_category as i32)
    .bind(&quest_info.strings.title)
    .bind(options.enable)
    .bind(options.position)
    .bind(options.only_dev)
    .bind(&questlist_bin)
    .bind(quest_id)
    .bind(PERIOD::from_char(period) as PERIOD)
    .bind(SEASON::from_u8(season) as SEASON)
    .execute(&db.pool)
    .await?;

    Ok(())
}

pub async fn update_questlist_options(
    db: &DB,
    quest_id: u32,
    period: PERIOD,
    season: SEASON,
    options: QuestlistDBOptions,
) -> Result<()> {
    sqlx::query(
        "
            UPDATE questlist
            SET
                enable = $1,
                position = $2,
                only_dev = $3
            WHERE quest_id=$4 AND period=$5 AND season=$6;
        ",
    )
    .bind(options.enable)
    .bind(options.position)
    .bind(options.only_dev)
    .bind(quest_id as i32)
    .bind(period)
    .bind(season)
    .execute(&db.pool)
    .await?;

    Ok(())
}
