use std::io::Result;

use serde_derive::{Deserialize, Serialize};

use crate::file::reader::FileReader;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestStringsPointers {
    pub title: u32,
    pub main_objective: u32,
    pub sub_a_objective: u32,
    pub sub_b_objective: u32,
    pub clear_reqs: u32,
    pub fail_reqs: u32,
    pub contractor: u32,
    pub description: u32,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestString {
    pub pointer: u32,
    pub hex: Vec<u8>,
    pub string: String,
}

impl QuestString {

    pub fn from_reader(reader: &mut FileReader, pos: u32) -> Result<QuestString> {
        reader.seek_start(pos as u64)?;
        let text = reader.read_string()?;
        Ok(QuestString {
            pointer: pos,
            string: text,
            hex: vec![]
        })
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestStrings {
    pub title: QuestString,
    pub main_objective: QuestString,
    pub sub_a_objective: QuestString,
    pub sub_b_objective: QuestString,
    pub clear_reqs: QuestString,
    pub fail_reqs: QuestString,
    pub contractor: QuestString,
    pub description: QuestString,
}
