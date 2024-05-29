use serde::{Deserialize, Serialize};

use crate::app::db::types::{PERIOD, SEASON};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestDB {
    pub quest_id: i32,
    pub period: PERIOD,
    pub season: SEASON,
    pub title: String,
    pub main_objective: String,
    pub sub_a_objective: String,
    pub sub_b_objective: String,
    pub reward_item1: i32,
    pub reward_item2: i32,
    pub reward_item3: i32,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestBinDB {
    pub quest_id: i32,
    pub period: PERIOD,
    pub season: SEASON,
    pub quest_bin: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestDBQueryOptions {
    pub page: Option<u32>,
    pub per_page: Option<u32>,
    pub quest_id: Option<i32>,
    pub period: Option<PERIOD>,
    pub season: Option<SEASON>,
    pub title: Option<String>,
    pub main_objective: Option<String>,
    pub sub_a_objective: Option<String>,
    pub sub_b_objective: Option<String>,
    pub reward_item1: Option<i32>,
    pub reward_item2: Option<i32>,
    pub reward_item3: Option<i32>,
}
