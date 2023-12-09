use serde::{Deserialize, Serialize};

use crate::editor::file::reader::{CustomReader, FileReader};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct SmallMonsterSpawn {
    pub monster_id: u8,
    pub unk0: u8,
    pub spawn_toggle: u16,
    pub spawn_amount: u32,
    pub unk1: u32,
    pub size: u16,
    pub skip0: [u8; 14], // null in working example
    pub unk2: u32,
    pub x_position: f32,
    pub y_position: f32,
    pub z_position: f32,
    pub skip1: [u8; 16],
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct MapSectionHeader {
    pub loaded_stage: u32,
    pub unk0: u32,
    pub spawn_types_ptr: u32,
    pub spawn_stats_ptr: u32,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct MapSection {
    pub header: MapSectionHeader,
    pub monster_ids: Vec<u32>,
    pub small_monster_spawns: Vec<SmallMonsterSpawn>,
}

impl CustomReader for MapSection {
    fn read(reader: &mut FileReader) -> std::io::Result<Self> {
        let header = reader.read_struct::<MapSectionHeader>()?;
        let mut monster_ids: Vec<u32> = vec![];
        let mut small_monster_spawns: Vec<SmallMonsterSpawn> = vec![];
        let section_end_ptr = reader.current_position()?;

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

        reader.seek_start(section_end_ptr)?;
        Ok(MapSection {
            header,
            monster_ids,
            small_monster_spawns,
        })
    }
}
