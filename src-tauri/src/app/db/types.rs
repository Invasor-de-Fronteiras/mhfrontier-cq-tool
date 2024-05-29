use serde::{Deserialize, Serialize};

#[derive(sqlx::Type, Serialize, Deserialize, Debug, PartialEq)]
#[sqlx(type_name = "QuestPeriod")]
pub enum PERIOD {
    DAY,
    NIGHT,
}

impl PERIOD {
    pub fn from_char(value: char) -> PERIOD {
        match value {
            'd' => PERIOD::DAY,
            'n' => PERIOD::NIGHT,
            _ => PERIOD::DAY,
        }
    }

    pub fn as_str(&self) -> &'static str {
        match self {
            PERIOD::DAY => "DAY",
            PERIOD::NIGHT => "NIGHT",
        }
    }
}

#[derive(sqlx::Type, Serialize, Deserialize, Debug, PartialEq)]
#[sqlx(type_name = "QuestSeason")]
pub enum SEASON {
    WARM,
    COLD,
    BREED,
}

impl SEASON {
    pub fn from_u8(value: u8) -> SEASON {
        match value {
            0 => SEASON::WARM,
            1 => SEASON::COLD,
            2 => SEASON::BREED,
            _ => SEASON::WARM,
        }
    }

    pub fn as_str(&self) -> &'static str {
        match self {
            SEASON::WARM => "WARM",
            SEASON::COLD => "COLD",
            SEASON::BREED => "BREED",
        }
    }
}

#[derive(sqlx::FromRow)]
pub struct CountResult {
    pub count: i64,
}
