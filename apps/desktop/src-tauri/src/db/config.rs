use std::fs::File;

use serde::{Deserialize, Serialize};
use sqlx::postgres::PgConnectOptions;

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct DBConfig {
    pub name: String,
    pub host: String,
    pub port: u16,
    pub user: String,
    pub password: String,
    pub database: String,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct Config {
    pub dbs: Vec<DBConfig>,
    pub bin_path: String,
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

impl DBConfig {
    pub fn get_string_connection(&self) -> String {
        format!(
            "postgres://{}:{}@{}:{}/{}",
            self.user, self.password, self.host, self.port, self.database
        )
    }

    pub fn get_connection_options(&self) -> PgConnectOptions {
        PgConnectOptions::new()
            .host(&self.host)
            .port(self.port)
            .username(&self.user)
            .password(&self.password)
            .database(&self.database)
    }
}
