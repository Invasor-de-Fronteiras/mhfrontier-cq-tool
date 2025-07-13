use std::io::Result;

use better_cursor::{BetterRead, BetterWrite, CustomRead, CustomWrite, StructRead, StructWrite};
use serde::{Deserialize, Serialize};

#[derive(StructRead, StructWrite, Serialize, Deserialize, Debug, PartialEq)]
pub struct SupplyItem {
    pub item: u16,
    pub quantity: u16,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct SupplyItems(Vec<SupplyItem>);

impl CustomRead for SupplyItems {
    fn read<R: better_cursor::BetterRead + ?Sized>(reader: &mut R) -> std::io::Result<Self> {
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

        Ok(SupplyItems(supply_items))
    }
}

impl CustomWrite for SupplyItems {
    fn write<W: better_cursor::BetterWrite + ?Sized>(
        &self,
        writer: &mut W,
    ) -> std::io::Result<u64> {
        let position = writer.current_position()?;
        for i in 0..40 {
            writer.write_struct(&self.0[i])?;
        }

        Ok(position)
    }
}
