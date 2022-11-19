#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db;
mod quest;
mod questlist;
mod re_frontier;
mod utils;

use db::{db_import_questlist, db_update_quest, get_config};
use quest::{export_quest_info, read_quest_file, save_quest_file};
use questlist::{read_all_questlist, read_all_questlist_old, read_questinfo, save_all_questlists};
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
            read_all_questlist_old,
            read_questinfo,
            save_all_questlists,
            re_frontier,
            db_import_questlist,
            db_update_quest,
            get_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
