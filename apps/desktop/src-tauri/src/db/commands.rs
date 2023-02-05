use editor::{questlist::quest_info::QuestInfo, file::writer::FileWriter};
use serde::{Serialize, Deserialize};

use crate::utils::CustomResult;

use super::config::DBConfig;
use super::questlist::types::{QuestlistDBQueryOptions, QuestlistDB, QuestlistDBOptions, QuestlistDBWithInfo};
use super::quests::types::{QuestDBQueryOptions, QuestDB};
use super::types::{PERIOD, SEASON};
use super::db::DB;
use super::quests;
use super::questlist;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ImportQuestlistPayload {
    db_config: DBConfig,
    filepath: String,
}

pub async fn import_questlist(event: String) -> CustomResult<()> {
    let payload = serde_json::from_str::<ImportQuestlistPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    questlist::import_questlist(&db, payload.filepath).await?;

    db.pool.close().await;
    Ok(())
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct DownloadQuestPayload {
    db_config: DBConfig,
    filepath: String,
    quest_id: u32,
    period: char,
    season: u8
}

pub async fn download_quest(event: String) -> CustomResult<bool> {
    let payload = serde_json::from_str::<DownloadQuestPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    let result = quests::get_quest_bin(
        &db,
        payload.quest_id,
        PERIOD::from_char(payload.period),
        SEASON::from_u8(payload.season)
    ).await?;

    db.pool.close().await;

    if let Some(quest) = result {
        let mut writer = FileWriter::from_new_filename(&payload.filepath)?;
        writer.write_buffer(&quest.quest_bin)?;

        return Ok(true);
    }

    Ok(false)
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct GetQuestsPayload {
    db_config: DBConfig,
    options: QuestDBQueryOptions,
}

pub async fn get_quests(event: String) -> CustomResult<Vec<QuestDB>> {
    let payload = serde_json::from_str::<GetQuestsPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    let quests = quests::get_quests(&db, payload.options).await?;

    db.pool.close().await;
    Ok(quests)
}

pub async fn count_quests(event: String) -> CustomResult<u32> {
    let payload = serde_json::from_str::<GetQuestsPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    let count = quests::count_quests(&db, payload.options).await?;

    db.pool.close().await;
    Ok(count)
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct InsertOrUpdateQuestPayload {
    db_config: DBConfig,
    quest_id: u32,
    period: char,
    season: u8,
    quest_filepath: String
}

pub async fn insert_or_update_quest(event: String) -> CustomResult<()> {
    let payload = serde_json::from_str::<InsertOrUpdateQuestPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    quests::insert_or_update_quest(
        &db,
        payload.quest_id as i32,
        PERIOD::from_char(payload.period),
        SEASON::from_u8(payload.season),
        payload.quest_filepath
    ).await?;

    db.pool.close().await;
    Ok(())
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct GetQuestlistPayload {
    db_config: DBConfig,
    options: QuestlistDBQueryOptions,
}

pub async fn get_questlists(event: String) -> CustomResult<Vec<QuestlistDB>> {
    let payload = serde_json::from_str::<GetQuestlistPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    let questlist = questlist::get_questlists(&db, payload.options).await?;

    db.pool.close().await;
    Ok(questlist)
}

pub async fn count_questlist(event: String) -> CustomResult<u32> {
    let payload = serde_json::from_str::<GetQuestlistPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    let count = questlist::count_questlist(&db, payload.options).await?;

    db.pool.close().await;
    Ok(count)
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct InsertOrUpdateQuestlistPayload {
    pub db_config: DBConfig,
    pub quest_info: QuestInfo,
    pub options: QuestlistDBOptions
}

pub async fn insert_or_update_questlist(event: String) -> CustomResult<()> {
    let mut payload = serde_json::from_str::<InsertOrUpdateQuestlistPayload>(&event)?;

    let db = DB::new(payload.db_config).await?;

    questlist::insert_or_update_questlist(
        &db,
        &mut payload.quest_info,
        payload.options
    ).await?;

    db.pool.close().await;
    Ok(())
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct GetQuestInfoPayload {
    db_config: DBConfig,
    quest_id: u32,
    period: char,
    season: u8
}

pub async fn get_questlist_info(event: String) -> CustomResult<Option<QuestlistDBWithInfo>> {
    let payload = serde_json::from_str::<GetQuestInfoPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    let questlist_bin = questlist::get_questlist_bin(
        &db,
        payload.quest_id,
        PERIOD::from_char(payload.period),
        SEASON::from_u8(payload.season)
    ).await?;

    if let Some(questlist) = questlist_bin {
        let quest_info = QuestInfo::from_buffer(questlist.questlist_bin)?;
        db.pool.close().await;

        return Ok(Some(QuestlistDBWithInfo { 
            quest_id: questlist.quest_id,
            period: questlist.period,
            season: questlist.season,
            enable: questlist.enable,
            category: questlist.category,
            title: questlist.title,
            position: questlist.position,
            only_dev: questlist.only_dev,
            quest_info: quest_info
        }));
    }

    db.pool.close().await;
    Ok(None)
}

pub async fn get_quest_info_from_quest(event: String) -> CustomResult<Option<QuestInfo>> {
    let payload = serde_json::from_str::<GetQuestInfoPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    let quest = quests::get_quest_bin(
        &db,
        payload.quest_id,
        PERIOD::from_char(payload.period),
        SEASON::from_u8(payload.season)
    ).await?;

    if let Some(quest) = quest {
        let quest_info = QuestInfo::from_quest_buffer(quest.quest_bin)?;
        db.pool.close().await;

        return Ok(Some(quest_info));
    }

    db.pool.close().await;
    Ok(None)
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct UpdateQuestlistOptionsPayload {
    db_config: DBConfig,
    quest_id: u32,
    period: char,
    season: u8,
    options: QuestlistDBOptions
}

pub async fn update_questlist_options(event: String) -> CustomResult<()> {
    let payload = serde_json::from_str::<UpdateQuestlistOptionsPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    questlist::update_questlist_options(
        &db,
        payload.quest_id,
        PERIOD::from_char(payload.period),
        SEASON::from_u8(payload.season),
        payload.options

    ).await?;

    db.pool.close().await;
    Ok(())
}
