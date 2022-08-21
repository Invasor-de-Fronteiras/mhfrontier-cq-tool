use serde_derive::{Serialize, Deserialize};

use crate::file::reader::FileReader;
use crate::file::writer::FileWriter;
use crate::quest::{ quest_type_flags::QuestTypeFlags, quest_string::QuestStrings, offsets::MAIN_QUEST_PROP_PRT };
use std::io::{Read, Result};

use super::quest_info_header::QuestInfoHeader;

// quest_type_flags + unk_data + strings_pointers
const QUEST_INFO_BASE_SIZE: u16 = 0x160;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestInfo {
    pub header: QuestInfoHeader,
    pub quest_type_flags: QuestTypeFlags,
    pub unk_data: Vec<u8>, // 112 bytes
    pub strings: QuestStrings
}

impl QuestInfo {
    
    pub fn from_questfile(filename: &str) -> Result<QuestInfo> {
        let mut reader = FileReader::from_filename(filename)?;
        reader.seek_start(MAIN_QUEST_PROP_PRT as u64)?;
        
        let quest_type_flags = reader.read_struct::<QuestTypeFlags>()?;
        let mut unk_data: Vec<u8> = vec![0; 112];
        reader.reader.read_exact(&mut unk_data)?;

        let strings = QuestStrings::from_reader(
            &mut reader, 
            quest_type_flags.main_quest_prop.quest_strings_ptr,
            None
        )?;

        Ok(QuestInfo {
            header: QuestInfoHeader::new(),
            quest_type_flags,
            unk_data,
            strings
        })
    }

    pub fn from_questlist(reader: &mut FileReader) -> Result<QuestInfo> {
        let header = reader.read_struct::<QuestInfoHeader>()?;
        
        let data_ptr = reader.current_position()? as u32;
        
        let quest_type_flags = reader.read_struct::<QuestTypeFlags>()?;
        
        let mut unk_data: Vec<u8> = vec![0; 112];
        reader.reader.read_exact(&mut unk_data)?;
        
        let strings = QuestStrings::from_reader(
            reader, 
            quest_type_flags.main_quest_prop.quest_strings_ptr,
            Some(data_ptr)
        )?;

        reader.seek_start(data_ptr as u64 + header.get_length() as u64)?;

        Ok(QuestInfo {
            header,
            quest_type_flags,
            unk_data,
            strings
        })
    }

    pub fn write_on_questlist(writer: &mut FileWriter, quest_info: &mut QuestInfo) -> Result<()> {
        quest_info.header.set_length(QUEST_INFO_BASE_SIZE + quest_info.strings.get_total_size());
        quest_info.quest_type_flags.main_quest_prop.quest_strings_ptr = 0x140;
        
        writer.write_struct(&mut quest_info.header)?;
        writer.write_struct(&mut quest_info.quest_type_flags)?;
        writer.write_buffer(&quest_info.unk_data)?;
        writer.write_struct(&mut quest_info.strings.pointers)?;

        writer.write_string(&quest_info.strings.title)?;
        writer.write_string(&quest_info.strings.clear_reqs)?;
        writer.write_string(&quest_info.strings.contractor)?;
        writer.write_string(&quest_info.strings.description)?;
        writer.write_string(&quest_info.strings.fail_reqs)?;
        writer.write_string(&quest_info.strings.main_objective)?;
        writer.write_string(&quest_info.strings.sub_a_objective)?;
        writer.write_string(&quest_info.strings.sub_b_objective)?;

        Ok(())
    }
}