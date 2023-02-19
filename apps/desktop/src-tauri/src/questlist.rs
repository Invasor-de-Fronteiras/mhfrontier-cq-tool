use std::io::Result;

use editor::questlist::{quest_info::QuestInfo, questlist_file::QuestlistFile};
use serde::{Deserialize, Serialize};

use crate::utils::{wrap_json_result, wrap_result};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct SaveQuestlistPayload {
    folder: String,
    questlists: Vec<QuestlistFile>,
}

#[tauri::command]
pub fn read_all_questlist(event: String) -> String {
    let result = QuestlistFile::read_all_questlist(&event);
    wrap_json_result(result)
}

#[tauri::command]
pub fn read_questinfo(event: String) -> String {
    let result = QuestInfo::from_questfile(&event);
    wrap_json_result(result)
}

#[tauri::command]
pub fn save_all_questlists(event: String) -> String {
    let result = || -> Result<String> {
        let mut payload = serde_json::from_str::<SaveQuestlistPayload>(&event)?;
        QuestlistFile::save_all_questlist(&payload.folder, &mut payload.questlists)?;

        Ok(String::from("{ \"status\": \"Success\" }"))
    };

    match result() {
        Ok(response) => response,
        Err(error) => wrap_result(error.to_string(), true),
    }
}
