use crate::file::reader::FileReader;
use crate::file::writer::FileWriter;
use super::quest_info::QuestInfo;
use super::questlist_header::QuestlistHeader;
use serde_derive::{ Deserialize, Serialize };
use std::io::Result;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestlistFile {
    pub header: QuestlistHeader,
    pub quests: Vec<QuestInfo>
}

impl QuestlistFile {
    
}
