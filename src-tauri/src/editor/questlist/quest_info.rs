use serde::{Deserialize, Serialize};

use crate::editor::file::reader::FileReader;
use crate::editor::file::writer::FileWriter;
use crate::editor::quest::{
    offsets::MAIN_QUEST_PROP_PRT, quest_string::QuestStrings, quest_type_flags::QuestTypeFlags,
};
use std::io::{Cursor, Read, Result};

use super::quest_info_header::QuestInfoHeader;
use super::questlist_header::QUEST_UNK_END;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestInfo {
    pub header: QuestInfoHeader,
    pub quest_type_flags: QuestTypeFlags,
    pub unk_data: Vec<u8>, // 112 bytes
    pub strings: QuestStrings,
    pub unk0_len: u8,
    pub unk0: Vec<u8>,
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
            unk0_len: 0x12,
            unk0: QUEST_UNK_END.to_vec(),
        })
    }

    pub fn from_buffer(buffer: Vec<u8>) -> Result<QuestInfo> {
        use crate::editor::file::read_cursor::ReadCursor;

        let mut reader: Cursor<Vec<u8>> = Cursor::new(buffer);
        let current = reader.current_position()?;
        reader.seek_start(current + 6)?;
        let header = reader.read_struct::<QuestInfoHeader>()?;
        let data_ptr = reader.current_position()? as u32;

        let quest_type_flags = reader.read_struct::<QuestTypeFlags>()?;
        let mut unk_data: Vec<u8> = vec![0; 112];
        reader.read_exact(&mut unk_data)?;

        let strings = QuestStrings::from_cursor(
            &mut reader,
            quest_type_flags.main_quest_prop.quest_strings_ptr,
            Some(data_ptr),
        )?;

        reader.seek_start(data_ptr as u64 + header.get_length() as u64)?;
        let unk0_len = reader.read_u8()?;
        let unk0 = reader.read_custom_buffer(unk0_len as u64)?;

        Ok(QuestInfo {
            header,
            quest_type_flags,
            unk_data,
            strings,
            unk0_len,
            unk0,
        })
    }

    pub fn from_quest_buffer(buffer: Vec<u8>) -> Result<QuestInfo> {
        use crate::editor::file::read_cursor::ReadCursor;

        let mut reader: Cursor<Vec<u8>> = Cursor::new(buffer);
        reader.seek_start(MAIN_QUEST_PROP_PRT as u64)?;

        let quest_type_flags = reader.read_struct::<QuestTypeFlags>()?;
        let mut unk_data: Vec<u8> = vec![0; 112];
        reader.read_exact(&mut unk_data)?;

        let strings = QuestStrings::from_cursor(
            &mut reader,
            quest_type_flags.main_quest_prop.quest_strings_ptr,
            None,
        )?;

        Ok(QuestInfo {
            header: QuestInfoHeader::new(),
            quest_type_flags,
            unk_data,
            strings,
            unk0_len: 0x12,
            unk0: QUEST_UNK_END.to_vec(),
        })
    }

    pub fn from_questlist(reader: &mut FileReader) -> Result<QuestInfo> {
        let current = reader.current_position()?;
        reader.seek_start(current + 6)?;
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
        let unk0_len = reader.read_u8()?;
        let unk0 = reader.read_custom_buffer(unk0_len as u64)?;

        Ok(QuestInfo {
            header,
            quest_type_flags,
            unk_data,
            strings,
            unk0_len,
            unk0,
        })
    }

    pub fn get_buffer(&mut self) -> Result<Vec<u8>> {
        use crate::editor::file::write_cursor::WriteCursor;

        let mut buffer: Cursor<Vec<u8>> = Cursor::new(vec![]);

        self.quest_type_flags.main_quest_prop.quest_strings_ptr = 0x140;

        buffer.write_u32(&(self.quest_type_flags.main_quest_prop.quest_id as u32))?;
        buffer.write_buffer(&[0x00, 0x00])?;
        let header_ptr = buffer.current_position()?;
        buffer.write_struct(&mut self.header)?;
        let start_ptr = buffer.current_position()?;
        buffer.write_struct(&mut self.quest_type_flags)?;
        buffer.write_buffer(&self.unk_data)?;
        let strings_ptr = buffer.current_position()?;
        buffer.write_struct(&mut self.strings.pointers)?;

        // write strings
        self.strings.pointers.title = (buffer.current_position()? - start_ptr) as u32;
        buffer.write_string(&self.strings.title)?;
        self.strings.pointers.main_objective = (buffer.current_position()? - start_ptr) as u32;
        buffer.write_string(&self.strings.main_objective)?;
        self.strings.pointers.sub_a_objective = (buffer.current_position()? - start_ptr) as u32;
        buffer.write_string(&self.strings.sub_a_objective)?;
        self.strings.pointers.sub_b_objective = (buffer.current_position()? - start_ptr) as u32;
        buffer.write_string(&self.strings.sub_b_objective)?;
        self.strings.pointers.clear_reqs = (buffer.current_position()? - start_ptr) as u32;
        buffer.write_string(&self.strings.clear_reqs)?;
        self.strings.pointers.fail_reqs = (buffer.current_position()? - start_ptr) as u32;
        buffer.write_string(&self.strings.fail_reqs)?;
        self.strings.pointers.contractor = (buffer.current_position()? - start_ptr) as u32;
        buffer.write_string(&self.strings.contractor)?;
        self.strings.pointers.description = (buffer.current_position()? - start_ptr) as u32;
        buffer.write_string(&self.strings.description)?;

        let end_ptr = buffer.current_position()?;

        self.header.set_length((end_ptr - start_ptr) as u16);
        buffer.seek_start(header_ptr)?;
        buffer.write_struct(&mut self.header)?;

        buffer.seek_start(strings_ptr)?;
        buffer.write_struct(&mut self.strings.pointers)?;
        buffer.seek_start(end_ptr)?;

        buffer.write_u8(&self.unk0_len)?;
        buffer.write_buffer(&self.unk0)?;

        Ok(buffer.into_inner())
    }

    pub fn write_on_questlist(writer: &mut FileWriter, quest_info: &mut QuestInfo) -> Result<()> {
        let buffer = quest_info.get_buffer()?;
        writer.write_buffer(&buffer)?;

        Ok(())
    }

    pub fn save_to(&mut self, filename: &str) -> Result<()> {
        let mut writer = FileWriter::from_new_filename(filename)?;

        let buffer = self.get_buffer()?;
        writer.write_buffer(&buffer)?;

        Ok(())
    }
}
