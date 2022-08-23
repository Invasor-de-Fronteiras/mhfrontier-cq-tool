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
pub struct QuestStrings {
    pub pointers: QuestStringsPointers,
    pub title: String,
    pub main_objective: String,
    pub sub_a_objective: String,
    pub sub_b_objective: String,
    pub clear_reqs: String,
    pub fail_reqs: String,
    pub contractor: String,
    pub description: String,
}

impl QuestStrings {

    pub fn read_string(reader: &mut FileReader, pos: u32) -> Result<String> {
        reader.seek_start(pos as u64)?;
        reader.read_string()
    }

    pub fn from_reader(reader: &mut FileReader, pos: u32, offset_strings: Option<u32>) -> Result<QuestStrings> {
        let offset = offset_strings.unwrap_or(0);
        reader.seek_start(offset as u64 + pos as u64)?;

        let string_ptr = reader.read_struct::<QuestStringsPointers>()?;

        let title = QuestStrings::read_string(reader, offset + string_ptr.title)?;
        let main_objective = QuestStrings::read_string(reader, offset + string_ptr.main_objective)?;
        let sub_a_objective = QuestStrings::read_string(reader, offset + string_ptr.sub_a_objective)?;
        let sub_b_objective = QuestStrings::read_string(reader, offset + string_ptr.sub_b_objective)?;
        let clear_reqs = QuestStrings::read_string(reader, offset + string_ptr.clear_reqs)?;
        let fail_reqs = QuestStrings::read_string(reader, offset + string_ptr.fail_reqs)?;
        let contractor = QuestStrings::read_string(reader, offset + string_ptr.contractor)?;
        let description = QuestStrings::read_string(reader, offset + string_ptr.description)?;

        Ok(QuestStrings {
            pointers: string_ptr,
            title,
            clear_reqs,
            contractor,
            description,
            fail_reqs,
            main_objective,
            sub_a_objective,
            sub_b_objective
        })
    }

    pub fn get_total_size(&self) -> u16 {
        let mut size: u16 = 0;
        
        size += self.title.len() as u16;
        size += self.main_objective.len() as u16;
        size += self.sub_a_objective.len() as u16;
        size += self.sub_b_objective.len() as u16;

        size += self.clear_reqs.len() as u16;
        size += self.fail_reqs.len() as u16;
        size += self.contractor.len() as u16;
        size += self.description.len() as u16;

        // 8 bytes for each "end string byte" (0x00)
        return size + 8;
    }

}
