use crate::reader::FileReader;
use crate::structs::header::{MapInfo, QuestFileHeader};
use crate::structs::monsters::{LargeMonsterPointers, LargeMonsterSpawn};
use crate::writer::FileWriter;
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
    pub map_info: MapInfo,
    pub large_monster_pointers: LargeMonsterPointers,
    pub large_monster_ids: Vec<u32>,
    pub large_monster_spawns: Vec<LargeMonsterSpawn>, // pub monster_spawn: LargeMonsterSpawn,
}

impl QuestFile {
    pub fn from_path(filename: &str) -> Result<QuestFile> {
        let mut reader = FileReader::from_filename(filename)?;

        let header = reader.read_struct::<QuestFileHeader>()?;

        // Read mapinfo
        reader.seek_start(header.map_info as u64)?;
        let map_info = reader.read_struct::<MapInfo>()?;

        // Read large_monster_ptr
        reader.seek_start(header.large_monster_ptr as u64)?;
        let large_monster_pointers = reader.read_struct::<LargeMonsterPointers>()?;

        // Read large_monster_ptr
        let mut large_monster_ids: Vec<u32> = vec![];
        let mut large_monster_spawns: Vec<LargeMonsterSpawn> = vec![];

        reader.seek_start(large_monster_pointers.large_monster_ids as u64)?;
        for _ in 0..5 {
            let monster_id = reader.read_u32()?;
            large_monster_ids.push(monster_id);
        }

        reader.seek_start(large_monster_pointers.large_monster_spawns as u64)?;
        for _ in 0..5 {
            let monster_spawn = reader.read_struct::<LargeMonsterSpawn>()?;
            large_monster_spawns.push(monster_spawn);
        }

        // reader.seek_start(header.quest_type_ptr as u64).unwrap();
        // let quest_type = reader.read_struct::<QuestFileQuestType>().unwrap();

        Ok(QuestFile {
            header,
            map_info,
            large_monster_pointers,
            large_monster_ids,
            large_monster_spawns, // monster_spawn,
        })
    }

    pub fn save_to(filename: &str, quest: &mut QuestFile) -> Result<()> {
        let original = QuestFile::from_path(filename)?;
        let mut writer = FileWriter::from_filename(filename)?;

        // Write large_monster_ptr
        // writer.seek_start(original.header.large_monster_ptr as u64)?;
        // writer.write_struct::<LargeMonsterPointers>(&mut quest.large_monster_pointers)?;

        println!(
            "seek = {}",
            original.large_monster_pointers.large_monster_ids
        );
        writer.seek_start(original.large_monster_pointers.large_monster_ids as u64)?;

        for i in 0..5 {
            println!("write monster id = {}", &quest.large_monster_ids[i]);
            let result = writer.write_u32(&quest.large_monster_ids[i])?;
            println!("result = {}", result);
        }

        writer.seek_start(original.large_monster_pointers.large_monster_spawns as u64)?;
        for i in 0..5 {
            writer.write_struct(&mut quest.large_monster_spawns[i])?;
        }

        Ok(())
    }
}
