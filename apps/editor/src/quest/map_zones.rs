use std::collections::HashMap;

use serde_derive::{ Serialize, Deserialize };

use crate::file::reader::{ CustomReader, FileReader };
use crate::file::writer::{ CustomWriter, FileWriter };

use super::map_section::MapSection;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct MapZone {
    pub map_zone_ptr: u32,
    pub map_sections: Vec<MapSection>,
    pub unk0: u32,
    pub unk1: u32,
    pub unk2: u32,
    pub unk3: u32,
}

impl CustomReader for MapZone {
    fn read(reader: &mut FileReader) -> std::io::Result<Self> {
        let map_zone_ptr = reader.read_current_u32()?;
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
            map_zone_ptr,
            map_sections,
            unk0,
            unk1,
            unk2,
            unk3
        })
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct MapZones {
    map_zone_ptrs: Vec<u32>,
    map_zones: Vec<MapZone>
}

impl CustomReader for MapZones {
    fn read(reader: &mut FileReader) -> std::io::Result<Self> {
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
            map_zones:  map_zones.into_values().collect()
        })
    }
}
