use crate::offsets::{GEN_QUEST_PROP_PRT, MAIN_QUEST_PROP_PRT};
use crate::reader::FileReader;
use crate::structs::header::{MapInfo, QuestFileHeader};
use crate::structs::monsters::{LargeMonsterPointers, LargeMonsterSpawn};
use crate::structs::quest_type_flags::{GenQuestProp, QuestTypeFlags};
use crate::structs::reward::{RewardTableHeader, RewardTable, RewardItem};
use crate::writer::FileWriter;
use std::io::Result;

// use serde::{Serialize, Deserialize};
use serde_derive::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestFile {
    pub header: QuestFileHeader,
    pub gen_quest_prop: GenQuestProp,
    pub quest_type_flags: QuestTypeFlags,
    pub map_info: MapInfo,
    pub large_monster_pointers: LargeMonsterPointers,
    pub large_monster_ids: Vec<u32>,
    pub large_monster_spawns: Vec<LargeMonsterSpawn>,
    pub rewards: Vec<RewardTable>
}

impl QuestFile {
    pub fn from_path(filename: &str) -> Result<QuestFile> {
        let mut reader = FileReader::from_filename(filename)?;

        let header = reader.read_struct::<QuestFileHeader>()?;

        reader.seek_start(GEN_QUEST_PROP_PRT as u64)?;
        let gen_quest_prop = reader.read_struct::<GenQuestProp>()?;

        reader.seek_start(MAIN_QUEST_PROP_PRT as u64)?;
        let quest_type_flags = reader.read_struct::<QuestTypeFlags>()?;

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

        let rewards: Vec<RewardTable> = QuestFile::read_rewards(&mut reader, header.reward_ptr as u64)?;

        Ok(QuestFile {
            header,
            gen_quest_prop,
            quest_type_flags,
            map_info,
            large_monster_pointers,
            large_monster_ids,
            large_monster_spawns,
            rewards
        })
    }

    pub fn save_to(filename: &str, quest: &mut QuestFile) -> Result<()> {
        let original = QuestFile::from_path(filename)?;
        let mut writer = FileWriter::from_filename(filename)?;

        writer.seek_start(GEN_QUEST_PROP_PRT as u64)?;
        writer.write_struct(&mut quest.gen_quest_prop)?;

        writer.seek_start(MAIN_QUEST_PROP_PRT as u64)?;
        writer.write_struct(&mut quest.quest_type_flags)?;

        writer.seek_start(original.large_monster_pointers.large_monster_ids as u64)?;

        for i in 0..5 {
            writer.write_u32(&quest.large_monster_ids[i])?;
        }

        writer.seek_start(original.large_monster_pointers.large_monster_spawns as u64)?;
        for i in 0..5 {
            writer.write_struct(&mut quest.large_monster_spawns[i])?;
        }

        QuestFile::write_rewards(&mut writer, quest)?;

        Ok(())
    }

    pub fn read_rewards(reader: &mut FileReader, reward_ptr: u64) -> Result<Vec<RewardTable>> {
        let mut rewards: Vec<RewardTable> = vec![];

        reader.seek_start(reward_ptr)?;
        while reader.read_current_u16()? != 0xFFFF {
            let table_header = reader.read_struct::<RewardTableHeader>()?;
            let next_table = reader.current_position()?;
            let mut reward_table = RewardTable { table_header, items: vec![] };

            reader.seek_start(reward_table.table_header.table_offset as u64)?;
            while reader.read_current_u16()? != 0xFFFF {
                let item = reader.read_struct::<RewardItem>()?;
                reward_table.items.push(item);
            }

            rewards.push(reward_table);
            reader.seek_start(next_table)?;
        }
        
        Ok(rewards)
    }

    pub fn write_rewards(writer: &mut FileWriter, data: &mut QuestFile) -> Result<()> {        
        writer.seek_start(data.header.reward_ptr as u64)?;
        for reward_table in &mut data.rewards {
            writer.seek_start(reward_table.table_header.table_offset as u64)?;
            for item in &mut reward_table.items {
                writer.write_struct(item)?;
            }
        }
        
        Ok(())
    }
}
