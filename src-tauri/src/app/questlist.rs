use crate::editor::questlist::{quest_info::QuestInfo, questlist_file::QuestlistFile};
use serde::{Deserialize, Serialize};

use super::utils::EventResponse;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct SaveQuestlistPayload {
    folder: String,
    questlists: Vec<QuestlistFile>,
}

#[tauri::command]
pub fn read_all_questlist(event: String) -> String {
    let result = QuestlistFile::read_all_questlist(&event);
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub fn read_questinfo(event: String) -> String {
    let result = QuestInfo::from_questfile(&event);
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub fn save_all_questlists(event: String) -> String {
    let event_payload = serde_json::from_str::<SaveQuestlistPayload>(&event);
    
    match event_payload {
        Ok(mut payload) => {
            let result = QuestlistFile::save_all_questlist(&payload.folder, &mut payload.questlists);
            EventResponse::from_result(result).to_string()
        },
        Err(error) => EventResponse::payload_error(error.to_string()).to_string(),
    }
}
