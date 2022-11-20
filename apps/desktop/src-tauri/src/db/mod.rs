use crate::utils::{wrap_result, CustomResult};

pub mod config;
pub mod db;
pub mod enums;

use db::DB;
use editor::questlist::quest_info::QuestInfo;
use serde::{Deserialize, Serialize};

use self::config::{Config, DBConfig};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ImportQuestlistPayload {
    db_config: DBConfig,
    filepath: String,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct UpdateQuestPayload {
    db_config: DBConfig,
    quest: QuestInfo,
}

async fn import_questlist(event: String) -> CustomResult<()> {
    let payload = serde_json::from_str::<ImportQuestlistPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    db.import_questlist(payload.filepath).await?;

    db.pool.close().await;
    Ok(())
}

async fn update_quest(event: String) -> CustomResult<()> {
    let mut payload = serde_json::from_str::<UpdateQuestPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    db.update_quest(&mut payload.quest).await?;

    db.pool.close().await;
    Ok(())
}

#[tauri::command]
pub async fn db_import_questlist(event: String) -> String {
    match import_questlist(event).await {
        Ok(_) => String::from("{ \"status\": \"Success\" }"),
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_update_quest(event: String) -> String {
    match update_quest(event).await {
        Ok(_) => String::from("{ \"status\": \"Success\" }"),
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub fn get_config() -> String {
    match Config::from_file() {
        Some(config) => match serde_json::to_string_pretty(&config) {
            Ok(result) => result,
            Err(error) => wrap_result(error.to_string(), true),
        },
        None => "".to_string(),
    }
}
