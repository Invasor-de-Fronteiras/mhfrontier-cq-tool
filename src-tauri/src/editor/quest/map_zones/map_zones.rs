use std::collections::HashMap;
use std::mem::size_of;

use better_cursor::{BetterRead, BetterWrite, CustomRead, CustomWrite};
use serde::{Deserialize, Serialize};

use super::map_section::{MapSection, MapSectionHeader};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct MapZone {
    pub map_zone_ptr: u32,
    pub map_sections: Vec<MapSection>,
    pub unk0: u32,
    pub unk1: u32,
    pub unk2: u32,
    pub unk3: u32,
}

impl CustomRead for MapZone {
    fn read<R: BetterRead + ?Sized>(reader: &mut R) -> std::io::Result<Self> {
        let map_zone_ptr = reader.current_position()?;
        let mut map_sections: Vec<MapSection> = vec![];

        while reader.read_current_u32()? != 0 {
            let map_section = reader.read_custom::<MapSection>()?;
            map_sections.push(map_section);
        }

        let unk0 = reader.read_current_u32()?;
        let unk1 = reader.read_current_u32()?;
        let unk2 = reader.read_current_u32()?;
        let unk3 = reader.read_current_u32()?;

        Ok(MapZone {
            map_zone_ptr: map_zone_ptr as u32,
            map_sections,
            unk0,
            unk1,
            unk2,
            unk3,
        })
    }
}

impl CustomWrite for MapZone {
    fn write<W: BetterWrite + ?Sized>(&self, writer: &mut W) -> std::io::Result<u64> {
        let map_zone_ptr = writer.current_position()?;
        let section_header_size = size_of::<MapSectionHeader>();

        for map_section in &self.map_sections {
            writer.write_struct(&map_section.header)?;
        }

        writer.write_u32(&0)?;
        writer.write_u32(&self.unk1)?;
        writer.write_u32(&self.unk2)?;
        writer.write_u32(&self.unk3)?;

        for (i, map_section) in self.map_sections.iter().enumerate() {
            let monster_ids_ptr = writer.current_position()?;

            for monster_id in &map_section.monster_ids {
                writer.write_u32(monster_id)?;
            }
            writer.write_u32(&0xFFFFFFFF)?;

            let small_monster_spawns_ptr = writer.current_position()?;

            for small_monster_spawn in &map_section.small_monster_spawns {
                writer.write_struct(small_monster_spawn)?;
            }
            writer.write_u16(&0xFFFF)?;

            let end_section = writer.current_position()?;
            writer.seek_start(map_zone_ptr + (i * section_header_size) as u64)?;
            let mut header = map_section.header.clone();
            header.spawn_types_ptr = monster_ids_ptr as u32;
            header.spawn_stats_ptr = small_monster_spawns_ptr as u32;
            writer.write_struct(&header)?;
            writer.seek_start(end_section)?;
        }

        Ok(map_zone_ptr)
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct MapZones {
    pub map_zone_ptrs: Vec<u32>,
    pub map_zones: Vec<MapZone>,
}

impl CustomRead for MapZones {
    fn read<R: BetterRead + ?Sized>(reader: &mut R) -> std::io::Result<Self> {
        let mut map_zone_ptrs: Vec<u32> = vec![];
        let mut map_zones: HashMap<u32, MapZone> = HashMap::new();

        while reader.read_current_u32()? != 0 {
            let map_zone_ptr = reader.read_u32()?;
            map_zone_ptrs.push(map_zone_ptr);
        }

        for map_zone_ptr in &map_zone_ptrs {
            if !map_zones.contains_key(map_zone_ptr) {
                let map_zone_ptr = map_zone_ptr.clone();
                reader.seek_start(map_zone_ptr as u64)?;
                let map_zone = reader.read_custom::<MapZone>()?;
                map_zones.insert(map_zone_ptr, map_zone);
            }
        }

        Ok(MapZones {
            map_zone_ptrs,
            map_zones: map_zones.into_values().collect(),
        })
    }
}

impl CustomWrite for MapZones {
    fn write<W: BetterWrite + ?Sized>(&self, writer: &mut W) -> std::io::Result<u64> {
        let map_zones_ptr = writer.current_position()?;

        for map_zone_ptr in &self.map_zone_ptrs {
            writer.write_u32(map_zone_ptr)?;
        }
        writer.write_u32(&0)?;

        for map_zone in &self.map_zones {
            let new_map_zone_ptr = writer.write_custom(map_zone)?;
            let end_section = writer.current_position()?;
            writer.seek_start(map_zones_ptr)?;

            for map_zone_ptr in &self.map_zone_ptrs {
                if map_zone_ptr == &map_zone.map_zone_ptr {
                    writer.write_u32(&(new_map_zone_ptr as u32))?;
                } else {
                    let next_ptr = writer.current_position()? + 4;
                    writer.seek_start(next_ptr)?;
                }
            }
            writer.seek_start(end_section)?;
        }
        Ok(map_zones_ptr)
    }
}
