use super::offsets::{GEN_QUEST_PROP_PRT, MAIN_QUEST_PROP_PRT};
use super::quest_end_flag::QuestEndFlag;
use crate::file::reader::FileReader;
use crate::file::writer::FileWriter;
use crate::quest::header::{MapInfo, QuestFileHeader};
use crate::quest::monsters::{LargeMonsterPointers, LargeMonsterSpawn};
use crate::quest::quest_type_flags::{GenQuestProp, QuestTypeFlags};
use crate::quest::reward::{RewardItem, RewardTable, RewardTableHeader};
use crate::quest::supply_items::SupplyItem;
use serde_derive::{Deserialize, Serialize};
use std::io::Result;

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
    pub rewards: Vec<RewardTable>,
    // supply items are a fixed-size array of 40 item slots
    pub supply_items: Vec<SupplyItem>,
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

        let rewards: Vec<RewardTable> =
            QuestFile::read_rewards(&mut reader, header.reward_ptr as u64)?;

        let supply_items: Vec<SupplyItem> = QuestFile::read_supply_items(&header, &mut reader)?;

        Ok(QuestFile {
            header,
            gen_quest_prop,
            quest_type_flags,
            map_info,
            large_monster_pointers,
            large_monster_ids,
            large_monster_spawns,
            rewards,
            supply_items,
        })
    }

    fn read_supply_items(
        header: &QuestFileHeader,
        reader: &mut FileReader,
    ) -> Result<Vec<SupplyItem>> {
        let max_supply_items = 40;
        let mut supply_items: Vec<SupplyItem> = Vec::with_capacity(max_supply_items);

        reader.seek_start(header.supply_box_ptr as u64)?;

        let supply_item = reader.read_struct::<SupplyItem>()?;
        supply_items.push(supply_item);

        let mut count = 1;
        while reader.read_current_u16()? != 0xFFFF {
            if count == max_supply_items {
                break;
            }

            let supply_item = reader.read_struct::<SupplyItem>()?;
            supply_items.push(supply_item);
            count += 1;
        }

        Ok(supply_items)
    }

    pub fn save_to(filename: &str, quest: &mut QuestFile) -> Result<()> {
        let original = QuestFile::from_path(filename)?;
        let mut end_flag = QuestEndFlag::from_path(filename)?;
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

        // Write supply items
        writer.seek_start(quest.header.supply_box_ptr as u64)?;
        for i in 0..40 {
            writer.write_struct(&mut quest.supply_items[i])?;
        }


        QuestFile::write_extra_data(&mut writer, quest, &mut end_flag)?;
        // QuestFile::write_rewards(&mut writer, quest)?;

        // writer.seek_start(GEN_QUEST_PROP_PRT as u64)?;
        // writer.write_struct(&mut quest.gen_quest_prop)?;
        Ok(())
    }

    pub fn write_extra_data(writer: &mut FileWriter, quest: &mut QuestFile, end_flag: &mut QuestEndFlag) -> Result<()> {
        let have_sign = end_flag.is_valid();
        
        if have_sign {
            writer.set_len(end_flag.start_ptr)?;
        }

        let mut new_end_flag = QuestEndFlag::new(writer.get_len()?);
        writer.seek_start(new_end_flag.start_ptr)?;
        QuestFile::write_rewards(writer, quest)?;

        writer.write_struct(&mut new_end_flag)?;
        
        Ok(())
    }

    pub fn read_rewards(reader: &mut FileReader, reward_ptr: u64) -> Result<Vec<RewardTable>> {
        let mut rewards: Vec<RewardTable> = vec![];

        reader.seek_start(reward_ptr)?;
        while reader.read_current_u16()? != 0xFFFF {
            let table_header = reader.read_struct::<RewardTableHeader>()?;
            let next_table = reader.current_position()?;
            let mut reward_table = RewardTable {
                table_header,
                items: vec![],
            };

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
        // writer.seek_start(data.header.reward_ptr as u64)?;
        data.header.reward_ptr = writer.current_position()? as u32;
        writer.seek_start(0)?;
        writer.write_struct(&mut data.header)?;
        writer.seek_start(data.header.reward_ptr as u64)?;
        
        for reward_table in &mut data.rewards {
            writer.write_struct(reward_table)?;
        }
        writer.write_u16(&0xFFFF)?;

        for reward_table in &mut data.rewards {
            reward_table.table_header.table_offset = writer.current_position()? as u32;
            for item in &mut reward_table.items {
                writer.write_struct(item)?;
            }
            writer.write_u16(&0xFFFF)?;
        }
        
        let rewards_end = writer.current_position()?;
        writer.seek_start(data.header.reward_ptr as u64)?;
        for reward_table in &mut data.rewards {
            writer.write_struct(reward_table)?;
        }

        writer.seek_start(rewards_end)?;

        Ok(())
    }

    
}
