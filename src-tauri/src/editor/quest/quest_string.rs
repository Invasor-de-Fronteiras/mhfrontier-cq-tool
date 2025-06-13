use std::io::Result;

use better_cursor::{BetterCursor, BetterRead, BetterWrite, CustomWrite, StructRead, StructWrite};
use serde::{Deserialize, Serialize};

#[derive(StructRead, StructWrite, Serialize, Deserialize, Debug, PartialEq, Clone)]
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
    pub fn read_string_from_offset<T: BetterCursor>(reader: &mut T, pos: u32) -> Result<String> {
        reader.seek_start(pos as u64)?;
        reader.read_string_shift_jis()
    }

    pub fn from_reader<T: BetterCursor>(
        reader: &mut T,
        pos: u32,
        offset_strings: Option<u32>,
    ) -> Result<QuestStrings> {
        let offset = offset_strings.unwrap_or(0);
        reader.seek_start(offset as u64 + pos as u64)?;

        let string_ptr = reader.read_struct::<QuestStringsPointers>()?;

        let title = QuestStrings::read_string_from_offset(reader, offset + string_ptr.title)?;
        let main_objective = QuestStrings::read_string_from_offset(reader, offset + string_ptr.main_objective)?;
        let sub_a_objective = QuestStrings::read_string_from_offset(reader, offset + string_ptr.sub_a_objective)?;
        let sub_b_objective = QuestStrings::read_string_from_offset(reader, offset + string_ptr.sub_b_objective)?;
        let clear_reqs = QuestStrings::read_string_from_offset(reader, offset + string_ptr.clear_reqs)?;
        let fail_reqs = QuestStrings::read_string_from_offset(reader, offset + string_ptr.fail_reqs)?;
        let contractor = QuestStrings::read_string_from_offset(reader, offset + string_ptr.contractor)?;
        let description = QuestStrings::read_string_from_offset(reader, offset + string_ptr.description)?;

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

impl CustomWrite for QuestStrings {
    fn write<W: better_cursor::BetterWrite + ?Sized>(&self, writer: &mut W) -> Result<u64> {
        let strings_ptr = writer.current_position()?;
        writer.write_struct(&self.pointers)?;

        let mut pointers = self.pointers.clone();
        // write strings
        pointers.title = writer.current_position()? as u32;
        writer.write_string_shift_jis(&self.title)?;
        pointers.main_objective = writer.current_position()? as u32;
        writer.write_string_shift_jis(&self.main_objective)?;
        pointers.sub_a_objective = writer.current_position()? as u32;
        writer.write_string_shift_jis(&self.sub_a_objective)?;
        pointers.sub_b_objective = writer.current_position()? as u32;
        writer.write_string_shift_jis(&self.sub_b_objective)?;
        pointers.clear_reqs = writer.current_position()? as u32;
        writer.write_string_shift_jis(&self.clear_reqs)?;
        pointers.fail_reqs = writer.current_position()? as u32;
        writer.write_string_shift_jis(&self.fail_reqs)?;
        pointers.contractor = writer.current_position()? as u32;
        writer.write_string_shift_jis(&self.contractor)?;
        pointers.description = writer.current_position()? as u32;
        writer.write_string_shift_jis(&self.description)?;

        let end_ptr = writer.current_position()?;

        writer.seek_start(strings_ptr)?;
        writer.write_struct(&pointers)?;
        writer.seek_start(end_ptr)?;

        Ok(strings_ptr)
    }
}
