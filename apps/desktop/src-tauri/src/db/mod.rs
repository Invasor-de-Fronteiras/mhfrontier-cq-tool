use crate::utils::wrap_result;

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
        Some(config) => match serde_json::to_string_pretty(&config) {
            Ok(result) => result,
            Err(error) => wrap_result(error.to_string(), true),
        },
        None => "".to_string(),
    }
}

#[tauri::command]
pub async fn db_import_questlist(event: String) -> String {
    match import_questlist(event).await {
        Ok(_) => String::from("{ \"status\": \"Success\" }"),
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_import_quests(event: String) -> String {
    match import_quests(event).await {
        Ok(_) => String::from("{ \"status\": \"Success\" }"),
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_download_quest(event: String) -> String {
    match download_quest(event).await {
        Ok(result) => {
            if result {
                String::from("{ \"status\": \"Success\" }")
            } else {
                String::from("{ \"status\": \"Quest not found\" }")
            }
        }
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_get_quests(event: String) -> String {
    match get_quests(event).await {
        Ok(quests) => match serde_json::to_string_pretty(&quests) {
            Ok(result) => result,
            Err(error) => wrap_result(error.to_string(), true),
        },
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_count_quests(event: String) -> String {
    match count_quests(event).await {
        Ok(count) => count.to_string(),
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_insert_or_update_quest(event: String) -> String {
    match insert_or_update_quest(event).await {
        Ok(_) => String::from("{ \"status\": \"Success\" }"),
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_get_questlists(event: String) -> String {
    match get_questlists(event).await {
        Ok(quests) => match serde_json::to_string_pretty(&quests) {
            Ok(result) => result,
            Err(error) => wrap_result(error.to_string(), true),
        },
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_count_questlist(event: String) -> String {
    match count_questlist(event).await {
        Ok(count) => count.to_string(),
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_insert_or_update_questlist(event: String) -> String {
    match insert_or_update_questlist(event).await {
        Ok(_) => String::from("{ \"status\": \"Success\" }"),
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_get_questlist_info(event: String) -> String {
    match get_questlist_info(event).await {
        Ok(quests) => match serde_json::to_string_pretty(&quests) {
            Ok(result) => result,
            Err(error) => wrap_result(error.to_string(), true),
        },
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_get_quest_info_from_quest(event: String) -> String {
    match get_quest_info_from_quest(event).await {
        Ok(quest_info) => match serde_json::to_string_pretty(&quest_info) {
            Ok(result) => result,
            Err(error) => wrap_result(error.to_string(), true),
        },
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub async fn db_update_questlist_options(event: String) -> String {
    match update_questlist_options(event).await {
        Ok(_) => String::from("{ \"status\": \"Success\" }"),
        Err(error) => wrap_result(error.to_string(), true),
    }
}
