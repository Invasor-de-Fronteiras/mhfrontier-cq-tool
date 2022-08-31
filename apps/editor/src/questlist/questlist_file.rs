use super::file_end::{FILE_END_P1, FILE_END_P2, FILE_END_P3};
use super::quest_info::QuestInfo;
use super::questlist_header::{QuestlistHeader, QUEST_END};
use crate::file::reader::FileReader;
use crate::file::writer::FileWriter;
use serde_derive::{Deserialize, Serialize};
use std::io::Result;
use std::path::Path;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestlistFile {
    pub filename: String,
    pub header: QuestlistHeader,
    pub quests: Vec<QuestInfo>,
}

impl QuestlistFile {
    pub fn from_path(filename: &str) -> Result<QuestlistFile> {
        let mut reader = FileReader::from_filename(filename)?;
        let header = reader.read_struct::<QuestlistHeader>()?;
        let mut quests: Vec<QuestInfo> = vec![];

        let quest_count = header.quest_count;

        for i in 0..quest_count {
            let quest = QuestInfo::from_questlist(&mut reader)?;
            quests.push(quest);

            let current_ptr = reader.current_position()?;

            if i != quest_count - 1 {
                for t in 0..250 {
                    let offset = current_ptr + t;
                    reader.seek_start(offset)?;
                    let back_byte = reader.read_u8()?;
                    let strings_ptr = reader.read_u16()?;
                    if back_byte == 0 && strings_ptr == 0x140 {
                        reader.seek_start(offset - 55)?;
                        break;
                    }
                }
            }
        }

        Ok(QuestlistFile {
            filename: filename.to_string(),
            header,
            quests,
        })
    }

    pub fn save_to(filename: &str, questlist: &mut QuestlistFile, is_last: bool) -> Result<()> {
        let mut writer = FileWriter::from_new_filename(filename)?;

        let quest_count = if questlist.quests.len() <= 42 {
            questlist.quests.len() as u8
        } else {
            42
        };

        questlist.header.quest_count = quest_count;

        writer.write_struct(&mut questlist.header)?;

        for i in 0..quest_count {
            let mut quest = &mut questlist.quests[i as usize];
            QuestInfo::write_on_questlist(&mut writer, &mut quest)?;
            if i != quest_count - 1 {
                writer.write_buffer(&QUEST_END)?;
            }
        }

        writer.write_buffer(&FILE_END_P1)?;
        if !is_last {
            writer.write_buffer(&FILE_END_P2)?;
            writer.write_buffer(&FILE_END_P3)?;
        }

        Ok(())
    }

    pub fn read_all_questlist(path: &str) -> Result<Vec<QuestlistFile>> {
        let mut questlists: Vec<QuestlistFile> = vec![];
        let mut current: u32 = 0;
        let mut have_next_questlist: bool = true;

        while have_next_questlist {
            let complete_path = format!("{}/list_{}.bin", path, &current);
            let file_exists = Path::new(&complete_path).exists();

            if !file_exists {
                have_next_questlist = false;
                continue;
            }

            let mut questlist = QuestlistFile::from_path(&complete_path)?;
            questlist.filename = format!("list_{}", current);
            current += 42;
            if questlist.header.quest_count < 42 {
                have_next_questlist = false;
            }

            questlists.push(questlist);
        }

        Ok(questlists)
    }

    pub fn save_all_questlist(path: &str, questlists: &mut Vec<QuestlistFile>) -> Result<()> {
        let last_index = questlists.len() - 1;
        for (i, questlist) in questlists.iter_mut().enumerate() {
            let complete_path = format!("{}/{}.bin", path, &questlist.filename);
            QuestlistFile::save_to(&complete_path, questlist, i == last_index)?;
        }

        Ok(())
    }
}
