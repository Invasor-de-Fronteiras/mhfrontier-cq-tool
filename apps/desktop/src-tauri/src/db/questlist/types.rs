use editor::questlist::quest_info::QuestInfo;
use serde::{Deserialize, Serialize};

use crate::db::types::{PERIOD, SEASON};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestlistDB {
    pub enable: bool,
    pub quest_id: i32,
    pub period: PERIOD,
    pub season: SEASON,
    pub category: i32,
    pub title: String,
    pub position: i32,
    pub only_dev: bool,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestlistBinDB {
    pub quest_id: i32,
    pub period: PERIOD,
    pub season: SEASON,
    pub enable: bool,
    pub category: i32,
    pub title: String,
    pub position: i32,
    pub only_dev: bool,
    pub questlist_bin: Vec<u8>,
}

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestlistDBWithInfo {
    pub quest_id: i32,
    pub period: PERIOD,
    pub season: SEASON,
    pub enable: bool,
    pub category: i32,
    pub title: String,
    pub position: i32,
    pub only_dev: bool,
    pub quest_info: QuestInfo,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestlistDBOptions {
    pub position: i32,
    pub enable: bool,
    pub only_dev: bool,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestlistDBQueryOptions {
    pub page: Option<u32>,
    pub per_page: Option<u32>,
    pub quest_id: Option<i32>,
    pub period: Option<PERIOD>,
    pub season: Option<SEASON>,
    pub title: Option<String>,
    pub category: Option<i32>,
    pub enable: Option<bool>,
    pub only_dev: Option<bool>,
    pub position: Option<i32>,
}
