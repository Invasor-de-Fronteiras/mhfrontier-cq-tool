use crate::reader::FileReader;
use crate::structs::header::QuestFileHeader;
use crate::structs::monsters::{LargeMonsterPointers, LargeMonsterSpawn};
use std::io::Result;

// use serde::{Serialize, Deserialize};
use serde_derive::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[repr(C)]
struct QuestFileQuestType {
    big_monster_size_multi: u16,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestFile {
    pub header: QuestFileHeader,
    pub large_monster_pointers: LargeMonsterPointers,
    pub large_monster_ids: Vec<u32>,
    pub large_monster_spawns: Vec<LargeMonsterSpawn>, // pub monster_spawn: LargeMonsterSpawn,
}

impl QuestFile {
    pub fn from_path(filename: &str) -> Result<QuestFile> {
        let mut reader = FileReader::from_filename(filename)?;

        let header = reader.read_struct::<QuestFileHeader>()?;

        // Read large_monster_ptr
        reader.seek_start(header.large_monster_ptr as u64)?;
        let large_monster_pointers = reader.read_struct::<LargeMonsterPointers>()?;

        // Read large_monster_ptr
        let mut large_monster_ids: Vec<u32> = vec![];
        let mut large_monster_spawns: Vec<LargeMonsterSpawn> = vec![];

        reader
            .seek_start(large_monster_pointers.large_monster_ids as u64)?;
        for _ in 0..5 {
            let monster_id = reader.read_u32()?;
            large_monster_ids.push(monster_id);
        }

        reader
            .seek_start(large_monster_pointers.large_monster_spawns as u64)?;
        for _ in 0..5 {
            let monster_spawn = reader.read_struct::<LargeMonsterSpawn>()?;
            large_monster_spawns.push(monster_spawn);
        }

        // reader.seek_start(header.quest_type_ptr as u64).unwrap();
        // let quest_type = reader.read_struct::<QuestFileQuestType>().unwrap();

        Ok(QuestFile {
            header: header,
            large_monster_pointers,
            large_monster_ids,
            large_monster_spawns, // monster_spawn,
        })
    }
}
