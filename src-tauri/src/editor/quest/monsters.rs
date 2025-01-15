use serde::{Deserialize, Serialize};

use crate::editor::file::{
    reader::CustomReader, reader::FileReader, writer::CustomWriter, writer::FileWriter,
};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct LargeMonsterPointers {
    // skip 8 bytes
    pub unk_0: u32,
    pub unk_1: u32,
    pub large_monster_ids: u32,
    pub large_monster_spawns: u32,
    pub unk_2: u32,
    pub unk_3: u32,
    pub unk_4: u32,
    pub unk_5: u32,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct LargeMonsterSpawn {
    pub monster_id: u8,
    pub unk0: u8,
    pub unk1: u8,
    pub unk2: u8,
    pub spawn_amount: u32,
    pub spawn_stage: u32,

    // skip 16 bytes
    pub unk4: u32,
    pub unk5: u32,
    pub unk6: u32,
    pub unk7: u32,

    pub unk8: u32,
    pub x_position: f32,
    pub y_position: f32,
    pub z_position: f32,
    pub unk9: u32,
    pub unk10: u32,
    pub unk11: u32,
    pub unk12: u32,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct LargeMonsters {
    pub large_monster_pointers: LargeMonsterPointers,
    pub large_monster_ids: Vec<u32>,
    pub large_monster_spawns: Vec<LargeMonsterSpawn>,
}

impl CustomReader for LargeMonsters {
    fn read(reader: &mut FileReader) -> std::io::Result<Self> {
        // Read large_monster_ptr
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

        Ok(LargeMonsters {
            large_monster_pointers,
            large_monster_ids,
            large_monster_spawns,
        })
    }
}

impl CustomWriter for LargeMonsters {
    fn write(&mut self, writer: &mut FileWriter) -> std::io::Result<u64> {
        let large_monster_ids_ptr = writer.current_position()?;
        for large_monster_id in &self.large_monster_ids {
            writer.write_u32(&large_monster_id)?;
        }

        writer.write_u32(&0xFFFFFFFF)?;

        let large_monster_spawn_ptr = writer.current_position()?;
        for large_monster_spawn in &mut self.large_monster_spawns {
            writer.write_struct(large_monster_spawn)?;
        }
        writer.write_u16(&0xFFFF)?;

        self.large_monster_pointers.large_monster_ids = large_monster_ids_ptr as u32;
        self.large_monster_pointers.large_monster_spawns = large_monster_spawn_ptr as u32;

        Ok(large_monster_ids_ptr)
    }
}
