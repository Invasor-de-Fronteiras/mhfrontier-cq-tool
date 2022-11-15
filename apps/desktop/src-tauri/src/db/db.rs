use editor::file::reader::FileReader;
use editor::quest::quest_file::QuestFile;
use editor::questlist::quest_info::QuestInfo;
use editor::questlist::questlist_file::QuestlistFile;
use sqlx::Pool;
use sqlx::Postgres;
use sqlx::Result;
use sqlx::postgres::PgPoolOptions;

use super::config::Config;
use super::config::DBConfig;

pub struct DB {
    pub db_config: DBConfig,
    pub pool: Pool<Postgres>,
    pub config: Option<Config>
}

impl DB {

    pub async fn new(db_config: DBConfig) -> Result<DB> {       
        let pool = PgPoolOptions::new()
            .max_connections(5)
            .connect_with(db_config.get_connection_options()).await?;

        let config = Config::from_file();

        Ok(DB {
            config,
            db_config,
            pool
        })
    }
    
    pub async fn import_questlist(&self, filepath: String) -> Result<()> {     
        let mut questlists = QuestlistFile::read_all_questlist(&filepath)?;

        for questlist in questlists.iter_mut() {
            for quest in questlist.quests.iter_mut() {
                self.insert_quest(quest).await?;
            }
        }

        Ok(())
    }

    fn get_quest_buffer(&self, filename: String) -> Option<Vec<u8>> {
        if let Some(config) = &self.config {
            let filepath = format!("{}/quests/{}.bin", config.bin_path, filename);
            if let Ok(reader) = &mut FileReader::from_filename(&filepath) {
                let result = reader.get_buffer();
                return match result {
                    Ok(buffer) => Some(Vec::from(buffer)),
                    Err(_) => None
                }
            }
        }

        None
    }

    pub async fn insert_quest(&self, quest_info: &mut QuestInfo) -> Result<()> {     
        let quest_list_bin = quest_info.get_buffer()?;
        let quest_list_bin_len = quest_list_bin.len() as i32;
        let name = quest_info.strings.title.clone();
        let objective = quest_info.strings.main_objective.clone();
        let category = quest_info.header.quest_category as i32;
        let period = quest_info.quest_type_flags.get_periot().to_string();
        let season = quest_info.quest_type_flags.get_season() as i16;
        let quest_id = quest_info.quest_type_flags.main_quest_prop.quest_id as i32;

        let filename = format!("{}{}{}", quest_id, period, season);
        let quest_bin = self.get_quest_buffer(filename);
        let quest_bin_size: i32 = if let Some(buffer) = &quest_bin { buffer.len() as i32 } else { 0 };

        sqlx::query("
            INSERT INTO quests (
                quest_id,
                period,
                season,
                name,
                objective,
                category,
                enabled,
                metadata,
                quest_bin,
                quest_bin_size,
                quest_list_bin,
                quest_list_bin_size
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9, 
                $10,
                $11,
                $12
            )
        ")
            .bind(quest_id)
            .bind(period)
            .bind(season)
            .bind(name)
            .bind(objective)
            .bind(category)
            .bind(true)
            .bind("")
            .bind(quest_bin)
            .bind(quest_bin_size)
            .bind(&quest_list_bin)
            .bind(quest_list_bin_len)
            .execute(&self.pool)
            .await?;

        Ok(())
    }

    pub async fn debug(&self, filepath: String) -> Result<()> {
        let filename = "";
        let mut quest = QuestFile::from_path(filename)?;
        let ids = [24,57,66,70,71,72,76,77,78,80,81,82,85,86,87,126,131,132,133,134,135,136,137,138,139,170,171,172,173,174,175,180,181,182,184,185,186,187,188,189,190,191,192,193,194,195,196,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,222,242,243,244,256,257,260,261,262,263,264,265,266,267,268,269,270,271,282,283,284,285,286,287,309,310,312,313,315,316,318,319,321,326,327,328,329,334,336,337,338,340,341,342,344,373,379,381,382,383,384,385,386,387,388,389,390,393,394,395,397,398,412,413,415,416,419,420,421,422,437,441,442,443,444,445,450,451,452,453,454,455,456,457,458,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499, 500];
        let origin_id = 64589;
        for id in ids {
            quest.quest_type_flags.main_quest_prop.quest_id = origin_id + id;

            for loaded_stage in &mut quest.loaded_stages {
                loaded_stage.stage_id = id as u32;
            }

            quest.strings.title = format!("≪Area≫ {}\ntest area {}", id, id);
            QuestFile::save_to(filename, &mut quest)?;
            let mut quest_info = QuestInfo::from_questfile(filename)?;
            self.insert_quest(&mut quest_info).await?;
        }

        Ok(())
    }
    
}