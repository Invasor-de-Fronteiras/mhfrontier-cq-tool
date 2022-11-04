use serde_derive::{ Serialize, Deserialize };

use crate::file::reader::{ CustomReader, FileReader };
use crate::file::writer::{ CustomWriter, FileWriter };

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct SmallMonsterSpawn {
    pub monster_id: u8,
    pub unk0: u8,
    pub spawn_toggle: u16,
    pub spawn_amount: u32,
    pub unk1: u32,
    pub skip0: [u8;16], // null in working example
    pub unk2: u32,
    pub x_position: f32,
    pub y_position: f32,
    pub z_position: f32,
    pub skip1: [u8;16]
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct MapSectionHeader {
    loaded_stage: u32, 
    unk0: u32,
    spawn_types_ptr: u32,
    spawn_stats_ptr: u32
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct MapSection {
    header: MapSectionHeader,
    monster_ids: Vec<u32>,
    small_monster_spawns: Vec<SmallMonsterSpawn>
}

impl CustomReader for MapSection {
    fn read(reader: &mut FileReader) -> std::io::Result<Self> {
        let header = reader.read_struct::<MapSectionHeader>()?;
        let mut monster_ids: Vec<u32> = vec![];
        let mut small_monster_spawns: Vec<SmallMonsterSpawn> = vec![];

        reader.seek_start(header.spawn_types_ptr as u64)?;
        while reader.read_current_u32()? != 0xFFFFFFFF {
            let monster_id = reader.read_u32()?;
            monster_ids.push(monster_id);
        }

        reader.seek_start(header.spawn_stats_ptr as u64)?;
        while reader.read_current_u16()? != 0xFFFF {
            let small_monster = reader.read_struct::<SmallMonsterSpawn>()?;
            small_monster_spawns.push(small_monster);
        }

        Ok(MapSection {
            header,
            monster_ids,
            small_monster_spawns
        })
    }
}

impl CustomWriter for MapSection {

    fn write(&mut self, writer: &mut FileWriter) -> Result<u64> {
        let section_ptr = writer.current_position()?;

        for reward_table in self.into_iter() {
            writer.write_struct(&mut reward_table.table_header)?;
        }
        writer.write_u16(&0xFFFF)?;

        for reward_table in self.into_iter() {
            reward_table.table_header.table_offset = writer.current_position()? as u32;
            for item in &mut reward_table.items {
                writer.write_struct(item)?;
            }
            writer.write_u16(&0xFFFF)?;
        }

        let rewards_end = writer.current_position()?;
        writer.seek_start(reward_ptr)?;
        for reward_table in self.into_iter() {
            writer.write_struct(&mut reward_table.table_header)?;
        }

        writer.seek_start(rewards_end)?;

        Ok(reward_ptr)
    }
}