use std::io::Result;

use serde::{Deserialize, Serialize};

use crate::editor::file::{
    reader::{CustomReader, FileReader},
    writer::{CustomWriter, FileWriter},
};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct RewardItem {
    pub rate: u16,
    pub item: u16,
    pub quantity: u16,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct RewardTableHeader {
    pub table_id: u8,
    pub unk_0: u8,
    pub unk_1: u16,
    pub table_offset: u32,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct RewardTable {
    pub table_header: RewardTableHeader,
    pub items: Vec<RewardItem>,
}

pub type Rewards = Vec<RewardTable>;

impl CustomReader for Rewards {
    fn read(reader: &mut FileReader) -> Result<Vec<RewardTable>> {
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

        Ok(rewards)
    }
}

impl CustomWriter for Rewards {
    fn write(&mut self, writer: &mut FileWriter) -> Result<u64> {
        let reward_ptr = writer.current_position()?;

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
