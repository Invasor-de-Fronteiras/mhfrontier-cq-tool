#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod app;
pub mod editor;

use app::*;
use tauri;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            read_quest_file,
            save_quest_file,
            export_quest_info,
            read_all_questlist,
            read_questinfo,
            save_all_questlists,
            re_frontier,
            get_config,
            db_import_questlist,
            db_import_quests,
            db_download_quest,
            db_get_quests,
            db_count_quests,
            db_insert_or_update_quest,
            db_get_questlists,
            db_count_questlist,
            db_insert_or_update_questlist,
            db_get_questlist_info,
            db_get_quest_info_from_quest,
            db_update_questlist_options
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
