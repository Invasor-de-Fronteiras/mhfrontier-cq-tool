use crate::file::reader::FileReader;
use crate::file::writer::FileWriter;
use super::{quest_info::QuestInfo, file_end::QUESTLIST_END};
use super::questlist_header::QuestlistHeader;
use serde_derive::{ Deserialize, Serialize };
use std::io::Result;
use std::path::Path;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestlistFile {
    pub filename: String,
    pub header: QuestlistHeader,
    pub quests: Vec<QuestInfo>
}

impl QuestlistFile {
    
    pub fn from_path(filename: &str) -> Result<QuestlistFile> {
        let mut reader = FileReader::from_filename(filename)?;
        let header = reader.read_struct::<QuestlistHeader>()?;
        let mut quests: Vec<QuestInfo> = vec![];

        for _ in 0..header.quest_count {
            let quest = QuestInfo::from_questlist(&mut reader)?;            
            quests.push(quest);
        }

        Ok(QuestlistFile {
            filename: filename.to_string(),
            header,
            quests
        })
    }

    pub fn save_to(filename: &str, questlist: &mut QuestlistFile) -> Result<()> {
        let mut writer = FileWriter::from_filename(filename)?;

        questlist.header.quest_count = if questlist.quests.len() <= 42 {
            questlist.quests.len() as u8
        } else {
            42
        };

        writer.write_struct(&mut questlist.header)?;

        for i in 0..questlist.header.quest_count {
            let quest = &mut questlist.quests[i as usize];            
            writer.write_struct(quest)?;
        }

        writer.write_buffer(&QUESTLIST_END)?;
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
        
        for questlist in questlists {
            let complete_path = format!("{}/{}.bin", path, &questlist.filename);
            QuestlistFile::save_to(&complete_path, questlist)?;
        } 

        Ok(())
    }
}
