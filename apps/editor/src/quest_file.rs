use crate::offsets::{GEN_QUEST_PROP_PRT, MAIN_QUEST_PROP_PRT};
use crate::reader::FileReader;
use crate::structs::header::{MapInfo, QuestFileHeader};
use crate::structs::monsters::{LargeMonsterPointers, LargeMonsterSpawn};
use crate::structs::quest_type_flags::{GenQuestProp, QuestTypeFlags};
use crate::structs::supply_items::SupplyItem;
use crate::writer::FileWriter;
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

        let supply_items: Vec<SupplyItem> = QuestFile::read_supply_items(&header, &mut reader)?;

        Ok(QuestFile {
            header,
            gen_quest_prop,
            quest_type_flags,
            map_info,
            large_monster_pointers,
            large_monster_ids,
            large_monster_spawns,
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
        let mut writer = FileWriter::from_filename(filename)?;

        writer.seek_start(GEN_QUEST_PROP_PRT as u64)?;
        writer.write_struct(&mut quest.gen_quest_prop)?;

        writer.seek_start(MAIN_QUEST_PROP_PRT as u64)?;
        writer.write_struct(&mut quest.quest_type_flags)?;

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

        // Write supply items
        writer.seek_start(quest.header.supply_box_ptr as u64)?;
        for i in 0..40 {
            writer.write_struct(&mut quest.supply_items[i])?;
        }

        Ok(())
    }
}
