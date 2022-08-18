use serde_derive::{Serialize, Deserialize};

use crate::{quest::{quest_type_flags::QuestTypeFlags, quest_string::{QuestStringsPointers, QuestStrings, QuestString}, offsets::MAIN_QUEST_PROP_PRT}, file::reader::FileReader, save_json::{save_to_json}};
use std::io::{Read, Result};

use super::quest_info_header::QuestInfoHeader;


#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestInfo {
    pub header: QuestInfoHeader,
    pub quest_type_flags: QuestTypeFlags,
    pub unk_data: Vec<u8>, // 112 bytes
    pub string_ptr: QuestStringsPointers,
    pub strings: QuestStrings
}

impl QuestInfo {
    
    pub fn read_from_questfile(filename: &str) -> Result<QuestInfo> {
        let mut reader = FileReader::from_filename(filename)?;
        reader.seek_start(MAIN_QUEST_PROP_PRT as u64)?;
        
        
        let quest_type_flags = reader.read_struct::<QuestTypeFlags>()?;
        let mut unk_data: Vec<u8> = vec![0; 112];
        
        reader.reader.read_exact(&mut unk_data)?;
        reader.seek_start(quest_type_flags.main_quest_prop.quest_strings_ptr as u64)?;

        let string_ptr = reader.read_struct::<QuestStringsPointers>()?;

        let title = QuestString::from_reader(&mut reader, string_ptr.title)?;
        let main_objective = QuestString::from_reader(&mut reader, string_ptr.main_objective)?;
        let sub_a_objective = QuestString::from_reader(&mut reader, string_ptr.sub_a_objective)?;
        let sub_b_objective = QuestString::from_reader(&mut reader, string_ptr.sub_b_objective)?;
        let clear_reqs = QuestString::from_reader(&mut reader, string_ptr.clear_reqs)?;
        let fail_reqs = QuestString::from_reader(&mut reader, string_ptr.fail_reqs)?;
        let contractor = QuestString::from_reader(&mut reader, string_ptr.contractor)?;
        let description = QuestString::from_reader(&mut reader, string_ptr.description)?;
        

        let strings = QuestStrings {
            title,
            clear_reqs,
            contractor,
            description,
            fail_reqs,
            main_objective,
            sub_a_objective,
            sub_b_objective
        };

        Ok(QuestInfo {
            header: QuestInfoHeader::new(),
            quest_type_flags,
            unk_data,
            string_ptr,
            strings
        })
    }
}