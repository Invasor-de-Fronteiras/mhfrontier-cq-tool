use serde::{Deserialize, Serialize};

use crate::editor::file::{
    reader::{CustomReader, FileReader},
    writer::{CustomWriter, FileWriter},
};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct SupplyItem {
    pub item: u16,
    pub quantity: u16,
}

pub type SupplyItems = Vec<SupplyItem>;

impl CustomReader for SupplyItems {
    fn read(reader: &mut FileReader) -> std::io::Result<Self> {
        let max_supply_items = 40;
        let mut supply_items: Vec<SupplyItem> = Vec::with_capacity(max_supply_items);

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
}

impl CustomWriter for SupplyItems {
    fn write(&mut self, writer: &mut FileWriter) -> std::io::Result<u64> {
        let position = writer.current_position()?;
        for i in 0..40 {
            writer.write_struct(&mut self[i])?;
        }

        Ok(position)
    }
}
