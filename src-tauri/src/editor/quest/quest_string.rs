use std::io::{Cursor, Result};

use serde::{Deserialize, Serialize};

use crate::editor::file::{
    reader::FileReader,
    writer::{CustomWriter, FileWriter},
};

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

    pub fn from_reader(
        reader: &mut FileReader,
        pos: u32,
        offset_strings: Option<u32>,
    ) -> Result<QuestStrings> {
        let offset = offset_strings.unwrap_or(0);
        reader.seek_start(offset as u64 + pos as u64)?;

        let string_ptr = reader.read_struct::<QuestStringsPointers>()?;

        let title = QuestStrings::read_string(reader, offset + string_ptr.title)?;
        let main_objective = QuestStrings::read_string(reader, offset + string_ptr.main_objective)?;
        let sub_a_objective =
            QuestStrings::read_string(reader, offset + string_ptr.sub_a_objective)?;
        let sub_b_objective =
            QuestStrings::read_string(reader, offset + string_ptr.sub_b_objective)?;
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
            sub_b_objective,
        })
    }

    pub fn read_string_from_cursor(reader: &mut Cursor<Vec<u8>>, pos: u32) -> Result<String> {
        use crate::editor::file::read_cursor::ReadCursor;

        reader.seek_start(pos as u64)?;
        reader.read_string()
    }

    pub fn from_cursor(
        reader: &mut Cursor<Vec<u8>>,
        pos: u32,
        offset_strings: Option<u32>,
    ) -> Result<QuestStrings> {
        use crate::editor::file::read_cursor::ReadCursor;
        let offset = offset_strings.unwrap_or(0);
        reader.seek_start(offset as u64 + pos as u64)?;

        let string_ptr = reader.read_struct::<QuestStringsPointers>()?;

        let title = QuestStrings::read_string_from_cursor(reader, offset + string_ptr.title)?;
        let main_objective =
            QuestStrings::read_string_from_cursor(reader, offset + string_ptr.main_objective)?;
        let sub_a_objective =
            QuestStrings::read_string_from_cursor(reader, offset + string_ptr.sub_a_objective)?;
        let sub_b_objective =
            QuestStrings::read_string_from_cursor(reader, offset + string_ptr.sub_b_objective)?;
        let clear_reqs =
            QuestStrings::read_string_from_cursor(reader, offset + string_ptr.clear_reqs)?;
        let fail_reqs =
            QuestStrings::read_string_from_cursor(reader, offset + string_ptr.fail_reqs)?;
        let contractor =
            QuestStrings::read_string_from_cursor(reader, offset + string_ptr.contractor)?;
        let description =
            QuestStrings::read_string_from_cursor(reader, offset + string_ptr.description)?;

        Ok(QuestStrings {
            pointers: string_ptr,
            title,
            clear_reqs,
            contractor,
            description,
            fail_reqs,
            main_objective,
            sub_a_objective,
            sub_b_objective,
        })
    }
}

impl CustomWriter for QuestStrings {
    fn write(&mut self, writer: &mut FileWriter) -> Result<u64> {
        let strings_ptr = writer.current_position()?;
        writer.write_struct(&mut self.pointers)?;

        // write strings
        self.pointers.title = writer.current_position()? as u32;
        writer.write_string(&self.title)?;
        self.pointers.main_objective = writer.current_position()? as u32;
        writer.write_string(&self.main_objective)?;
        self.pointers.sub_a_objective = writer.current_position()? as u32;
        writer.write_string(&self.sub_a_objective)?;
        self.pointers.sub_b_objective = writer.current_position()? as u32;
        writer.write_string(&self.sub_b_objective)?;
        self.pointers.clear_reqs = writer.current_position()? as u32;
        writer.write_string(&self.clear_reqs)?;
        self.pointers.fail_reqs = writer.current_position()? as u32;
        writer.write_string(&self.fail_reqs)?;
        self.pointers.contractor = writer.current_position()? as u32;
        writer.write_string(&self.contractor)?;
        self.pointers.description = writer.current_position()? as u32;
        writer.write_string(&self.description)?;

        let end_ptr = writer.current_position()?;

        writer.seek_start(strings_ptr)?;
        writer.write_struct(&mut self.pointers)?;
        writer.seek_start(end_ptr)?;

        Ok(strings_ptr)
    }
}
