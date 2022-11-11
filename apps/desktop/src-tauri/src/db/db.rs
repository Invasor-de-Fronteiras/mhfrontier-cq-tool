use editor::file::reader::FileReader;
use editor::questlist::quest_info::QuestInfo;
use editor::questlist::questlist_file::QuestlistFile;
use sqlx::Pool;
use sqlx::Postgres;
use sqlx::Result;
use sqlx::postgres::PgPoolOptions;

use super::config::Config;
use super::config::DBConfig;

pub struct DB {
    db_config: DBConfig,
    pool: Pool<Postgres>,
    config: Option<Config>
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

        sqlx::query!("
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
        ", quest_id, period, season, name, objective, category, true, "", quest_bin, quest_bin_size, &quest_list_bin, quest_list_bin_len)
            .execute(&self.pool)
            .await?;

        Ok(())
    }
    
}