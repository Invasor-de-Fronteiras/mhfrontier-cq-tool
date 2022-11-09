use crate::utils::{wrap_json_result, wrap_result};

pub mod config;
pub mod api;
pub mod result;

use api::Api;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct GetQuestPayload {
    quest: String
}

#[tauri::command]
pub async fn db_save_quest() -> String {
    "No implemented".to_string()
}

#[tauri::command]
pub async fn db_quest_list() -> String {
    "No implemented".to_string()
}

#[tauri::command]
pub async fn db_quest_download() -> String {
    "No implemented".to_string()
}