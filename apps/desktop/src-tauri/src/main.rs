#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db;
mod quest;
mod questlist;
mod re_frontier;
mod utils;

use db::{
    get_config,
    db_import_questlist,
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
};
use quest::{export_quest_info, read_quest_file, save_quest_file};
use questlist::{read_all_questlist, read_questinfo, save_all_questlists};
use re_frontier::re_frontier;
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
            db_download_quest,
            db_get_quests,
            db_count_quests,
            db_insert_or_update_quest,
            db_get_questlists,
            db_count_questlist,
            db_insert_or_update_questlist,
            db_get_questlist_info ,
            db_get_quest_info_from_quest,
            db_update_questlist_options
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
