use serde_derive::{Deserialize, Serialize};

use crate::file::reader::FileReader;
use crate::file::writer::FileWriter;
use crate::quest::{
    offsets::MAIN_QUEST_PROP_PRT, quest_string::QuestStrings, quest_type_flags::QuestTypeFlags,
};
use std::io::{Read, Result};

use super::quest_info_header::QuestInfoHeader;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestInfo {
    pub header: QuestInfoHeader,
    pub quest_type_flags: QuestTypeFlags,
    pub unk_data: Vec<u8>, // 112 bytes
    pub strings: QuestStrings,
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
            None,
        )?;

        Ok(QuestInfo {
            header: QuestInfoHeader::new(),
            quest_type_flags,
            unk_data,
            strings,
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
            Some(data_ptr),
        )?;

        reader.seek_start(data_ptr as u64 + header.get_length() as u64)?;

        Ok(QuestInfo {
            header,
            quest_type_flags,
            unk_data,
            strings,
        })
    }

    pub fn write_on_questlist(writer: &mut FileWriter, quest_info: &mut QuestInfo) -> Result<()> {
        quest_info
            .quest_type_flags
            .main_quest_prop
            .quest_strings_ptr = 0x140;

        let header_ptr = writer.current_position()?;
        writer.write_struct(&mut quest_info.header)?;
        let start_ptr = writer.current_position()?;
        writer.write_struct(&mut quest_info.quest_type_flags)?;
        writer.write_buffer(&quest_info.unk_data)?;
        let strings_ptr = writer.current_position()?;
        writer.write_struct(&mut quest_info.strings.pointers)?;

        // write strings
        quest_info.strings.pointers.title = (writer.current_position()? - start_ptr) as u32;
        writer.write_string(&quest_info.strings.title)?;
        quest_info.strings.pointers.main_objective =
            (writer.current_position()? - start_ptr) as u32;
        writer.write_string(&quest_info.strings.main_objective)?;
        quest_info.strings.pointers.sub_a_objective =
            (writer.current_position()? - start_ptr) as u32;
        writer.write_string(&quest_info.strings.sub_a_objective)?;
        quest_info.strings.pointers.sub_b_objective =
            (writer.current_position()? - start_ptr) as u32;
        writer.write_string(&quest_info.strings.sub_b_objective)?;
        quest_info.strings.pointers.clear_reqs = (writer.current_position()? - start_ptr) as u32;
        writer.write_string(&quest_info.strings.clear_reqs)?;
        quest_info.strings.pointers.fail_reqs = (writer.current_position()? - start_ptr) as u32;
        writer.write_string(&quest_info.strings.fail_reqs)?;
        quest_info.strings.pointers.contractor = (writer.current_position()? - start_ptr) as u32;
        writer.write_string(&quest_info.strings.contractor)?;
        quest_info.strings.pointers.description = (writer.current_position()? - start_ptr) as u32;
        writer.write_string(&quest_info.strings.description)?;

        let end_ptr = writer.current_position()?;

        quest_info.header.set_length((end_ptr - start_ptr) as u16);
        writer.seek_start(header_ptr)?;
        writer.write_struct(&mut quest_info.header)?;

        writer.seek_start(strings_ptr)?;
        writer.write_struct(&mut quest_info.strings.pointers)?;
        writer.seek_start(end_ptr)?;

        Ok(())
    }
}
