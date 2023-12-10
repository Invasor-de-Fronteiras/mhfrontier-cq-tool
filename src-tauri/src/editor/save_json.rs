extern crate serde_json;
use std::io::Result;

use serde::Serialize;

use crate::editor::quest::quest_file::QuestFile;

pub fn save_quest_to_json(filename: &str, quest: &QuestFile) -> Result<()> {
    // Save the JSON structure into the other file.
    std::fs::write(filename, serde_json::to_string_pretty(&quest).unwrap())?;

    Ok(())
}

pub fn save_to_json<T: ?Sized + Serialize>(filename: &str, data: &T) -> Result<()> {
    // Save the JSON structure into the other file.
    std::fs::write(filename, serde_json::to_string_pretty(&data).unwrap())?;

    Ok(())
}
