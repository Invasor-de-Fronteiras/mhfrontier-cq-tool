use crate::utils::{ wrap_result, CustomResult, wrap_json_result };

pub mod config;
pub mod db;

use db::DB;
use serde::{Serialize, Deserialize};

use self::config::{DBConfig, Config};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ImportQuestlistPayload {
    db_config: DBConfig,
    filepath: String
}

async fn import_questlist(event: String) -> CustomResult<()> {
    let payload = serde_json::from_str::<ImportQuestlistPayload>(&event)?;
    let db = DB::new(payload.db_config).await?;

    db.import_questlist(payload.filepath).await?;

    db.pool.close().await;
    Ok(())
}

#[tauri::command]
pub async fn db_import_questlist(event: String) -> String {
  match import_questlist(event).await {
    Ok(_) => String::from("{ \"status\": \"Success\" }"),
    Err(error) => wrap_result(error.to_string(), true)
  }
}

#[tauri::command]
pub fn get_config() -> String {
  match Config::from_file() {
    Some(config) => match serde_json::to_string_pretty(&config) {
        Ok(result) => result,
        Err(error) => wrap_result(error.to_string(), true)
    },
    None => "".to_string()
  }
}