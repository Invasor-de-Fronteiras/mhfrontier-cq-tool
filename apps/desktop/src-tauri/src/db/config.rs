use std::{fs::File};

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct Config {
    pub host: String,
    pub auth: String
}

impl Config {

    pub fn from_file() -> Option<Config> {
        let file = File::open("config.json");
        if let Ok(data) = file {
            if let Ok(result) = serde_json::from_reader::<File, Config>(data) {
                return Some(result);
            }
        }
        None
    }
}
