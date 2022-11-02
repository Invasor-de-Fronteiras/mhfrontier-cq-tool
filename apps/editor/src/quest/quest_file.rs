use super::header::LoadedStage;
use super::offsets::{GEN_QUEST_PROP_PRT, MAIN_QUEST_PROP_PRT};
use super::quest_end_flag::QuestEndFlag;
use super::quest_string::QuestStrings;
use super::reward::Rewards;
use crate::file::reader::FileReader;
use crate::file::writer::FileWriter;
use crate::quest::header::{MapInfo, QuestFileHeader};
use crate::quest::monsters::{LargeMonsterPointers, LargeMonsterSpawn};
use crate::quest::quest_type_flags::{GenQuestProp, QuestTypeFlags};
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
    pub rewards: Rewards,
    pub loaded_stages: Vec<LoadedStage>,
    // supply items are a fixed-size array of 40 item slots
    pub supply_items: Vec<SupplyItem>,
    pub strings: QuestStrings,
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

        let mut loaded_stages: Vec<LoadedStage> = vec![];
        reader.seek_start(header.loaded_stages_ptr as u64)?;
        while reader.current_position()? != header.fixed_cords1 as u64 {
            let loaded_stage = reader.read_struct::<LoadedStage>()?;
            loaded_stages.push(loaded_stage);
        }

        // Read large_monster_ptr
        reader.seek_start(header.large_monster_ptr as u64)?;
        let large_monster_pointers = reader.read_struct::<LargeMonsterPointers>()?;

        // Read large_monster_ptr
        let mut large_monster_ids: Vec<u32> = vec![];
        let mut large_monster_spawns: Vec<LargeMonsterSpawn> = vec![];

        reader.seek_start(large_monster_pointers.large_monster_ids as u64)?;
        while reader.read_current_u16()? != 0xFFFF {
            let monster_id = reader.read_u32()?;
            large_monster_ids.push(monster_id);
        }

        reader.seek_start(large_monster_pointers.large_monster_spawns as u64)?;
        while reader.read_current_u16()? != 0xFFFF {
            let monster_spawn = reader.read_struct::<LargeMonsterSpawn>()?;
            large_monster_spawns.push(monster_spawn);
        }

        reader.seek_start(header.reward_ptr as u64)?;
        let rewards: Rewards = reader.read_custom::<Rewards>()?;

        let supply_items: Vec<SupplyItem> = QuestFile::read_supply_items(&header, &mut reader)?;

        let strings = QuestStrings::from_reader(
            &mut reader,
            quest_type_flags.main_quest_prop.quest_strings_ptr,
            None,
        )?;

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
            loaded_stages,
            strings,
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

        writer.write_struct_on(&mut quest.gen_quest_prop, GEN_QUEST_PROP_PRT as u64)?;
        writer.write_struct_on(&mut quest.quest_type_flags, MAIN_QUEST_PROP_PRT as u64)?;

        writer.seek_start(original.header.loaded_stages_ptr as u64)?;
        for loaded_stage in &mut quest.loaded_stages {
            if writer.current_position()? == original.header.fixed_cords1 as u64 {
                break;
            }

            writer.write_struct(loaded_stage)?;
        }

        // Write supply items
        writer.seek_start(quest.header.supply_box_ptr as u64)?;
        for i in 0..40 {
            writer.write_struct(&mut quest.supply_items[i])?;
        }

        QuestFile::write_extra_data(&mut writer, quest, &mut end_flag)?;

        Ok(())
    }

    pub fn write_extra_data(
        writer: &mut FileWriter,
        quest: &mut QuestFile,
        end_flag: &mut QuestEndFlag,
    ) -> Result<()> {
        let have_sign = end_flag.is_valid();
        if have_sign {
            writer.set_len(end_flag.start_ptr as u64)?;
        }

        let mut new_end_flag = QuestEndFlag::new(writer.get_len()? as u32);

        writer.seek_start(new_end_flag.start_ptr as u64)?;

        quest.header.reward_ptr = writer.write_custom(&mut quest.rewards)? as u32;
        quest.quest_type_flags.main_quest_prop.quest_strings_ptr = writer.write_custom(&mut quest.strings)? as u32;
        let (large_monster_ids_ptr, large_monster_spawn_ptr) = QuestFile::write_monster_spawn(writer, quest)?;
        quest.large_monster_pointers.large_monster_ids = large_monster_ids_ptr as u32;
        quest.large_monster_pointers.large_monster_spawns = large_monster_spawn_ptr as u32;
        
        writer.write_struct_on(&mut quest.large_monster_pointers, quest.header.large_monster_ptr as u64)?;
        writer.write_struct_on(&mut quest.header, 0)?;
        writer.write_struct_on(&mut quest.quest_type_flags, MAIN_QUEST_PROP_PRT as u64)?;
        
        writer.write_struct(&mut new_end_flag)?;
        writer.write_u8(&0)?;

        Ok(())
    }

    fn write_monster_spawn(
        writer: &mut FileWriter,
        quest: &mut QuestFile,
    ) -> Result<(u64, u64)> {
        let large_monster_ids_ptr = writer.current_position()?;
        for large_monster_id in &quest.large_monster_ids {
            writer.write_u32(&large_monster_id)?;
        }

        writer.write_u32(&0xFFFFFFFF)?;

        let large_monster_spawn_ptr = writer.current_position()?;
        for large_monster_spawn in &mut quest.large_monster_spawns {
            writer.write_struct(large_monster_spawn)?;
        }
        writer.write_u16(&0xFFFF)?;

        Ok((large_monster_ids_ptr, large_monster_spawn_ptr))
    }

}
