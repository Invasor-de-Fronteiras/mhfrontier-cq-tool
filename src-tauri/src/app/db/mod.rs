use super::utils::EventResponse;

pub mod commands;
pub mod config;
pub mod db;
pub mod questlist;
pub mod quests;
pub mod types;

use self::commands::{
    count_questlist, count_quests, download_quest, get_quest_info_from_quest, get_questlist_info,
    get_questlists, get_quests, import_questlist, import_quests, insert_or_update_quest,
    insert_or_update_questlist, update_questlist_options,
};
use self::config::Config;

#[tauri::command]
pub fn get_config() -> String {
    match Config::from_file() {
        Some(config) => {
            let result = serde_json::to_string_pretty(&config);
            EventResponse::from_result_data(result).to_string()
        },
        None => EventResponse::success().to_string(),
    }
}

#[tauri::command]
pub async fn db_import_questlist(event: String) -> String {
    let result = import_questlist(event).await;
    EventResponse::from_result(result).to_string()
}

#[tauri::command]
pub async fn db_import_quests(event: String) -> String {
    let result = import_quests(event).await;
    EventResponse::from_result(result).to_string()
}

#[tauri::command]
pub async fn db_download_quest(event: String) -> String {
    match download_quest(event).await {
        Ok(result) => {
            if result {
                EventResponse::success().to_string()
            } else {
                EventResponse::error(String::from("Quest not found")).to_string()
            }
        }
        Err(error) => EventResponse::error(error.to_string()).to_string(),
    }
}

#[tauri::command]
pub async fn db_get_quests(event: String) -> String {
    let result = get_quests(event).await;
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub async fn db_count_quests(event: String) -> String {
    let result = count_quests(event).await;
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub async fn db_insert_or_update_quest(event: String) -> String {
    let result = insert_or_update_quest(event).await;
    EventResponse::from_result(result).to_string()
}

#[tauri::command]
pub async fn db_get_questlists(event: String) -> String {
    let result = get_questlists(event).await;
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub async fn db_count_questlist(event: String) -> String {
    let result = count_questlist(event).await;
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub async fn db_insert_or_update_questlist(event: String) -> String {
    let result = insert_or_update_questlist(event).await;
    EventResponse::from_result(result).to_string()
}

#[tauri::command]
pub async fn db_get_questlist_info(event: String) -> String {
    let result = get_questlist_info(event).await;
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub async fn db_get_quest_info_from_quest(event: String) -> String {
    let result = get_quest_info_from_quest(event).await;
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub async fn db_update_questlist_options(event: String) -> String {
    let result = update_questlist_options(event).await;
    EventResponse::from_result(result).to_string()
}
