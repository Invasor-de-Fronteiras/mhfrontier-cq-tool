use std::io::Result;

use better_cursor::{BetterRead, BetterWrite, CustomRead, CustomWrite, StructRead, StructWrite};
use serde::{Deserialize, Serialize};

#[derive(StructRead, StructWrite, Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct RewardItem {
    pub rate: u16,
    pub item: u16,
    pub quantity: u16,
}

#[derive(StructRead, StructWrite, Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct RewardTableHeader {
    pub table_id: u8,
    pub unk_0: u8,
    pub unk_1: u16,
    pub table_offset: u32,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct RewardTable {
    pub table_header: RewardTableHeader,
    pub items: Vec<RewardItem>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Rewards(pub Vec<RewardTable>);

impl CustomRead for Rewards {
    fn read<R: better_cursor::BetterRead + ?Sized>(reader: &mut R) -> Result<Self> {
        let mut rewards: Vec<RewardTable> = vec![];

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

        Ok(Rewards(rewards))
    }
}

impl CustomWrite for Rewards {
    fn write<W: better_cursor::BetterWrite + ?Sized>(&self, writer: &mut W) -> Result<u64> {
        let reward_ptr = writer.current_position()?;
        let mut reward_table_headers: Vec<RewardTableHeader> = vec![];

        for reward_table in &self.0 {
            writer.write_struct(&reward_table.table_header)?;
        }
        writer.write_u16(&0xFFFF)?;

        for reward_table in &self.0 {
            let mut table_header = reward_table.table_header.clone();
            table_header.table_offset = writer.current_position()? as u32;
            for item in &reward_table.items {
                writer.write_struct(item)?;
            }
            writer.write_u16(&0xFFFF)?;
            reward_table_headers.push(table_header);
        }

        let rewards_end = writer.current_position()?;
        writer.seek_start(reward_ptr)?;
        for reward_table in reward_table_headers.into_iter() {
            writer.write_struct(&reward_table)?;
        }

        writer.seek_start(rewards_end)?;

        Ok(reward_ptr)
    }
}
