use sqlx::postgres::PgPoolOptions;
use sqlx::Pool;
use sqlx::Postgres;
use sqlx::Result;

use super::config::Config;
use super::config::DBConfig;

pub struct DB {
    pub db_config: DBConfig,
    pub pool: Pool<Postgres>,
    pub config: Option<Config>,
}

impl DB {
    pub async fn new(db_config: DBConfig) -> Result<DB> {
        let pool = PgPoolOptions::new()
            .max_connections(1)
            .connect_with(db_config.get_connection_options())
            .await?;

        let config = Config::from_file();

        Ok(DB {
            config,
            db_config,
            pool,
        })
    }
}
