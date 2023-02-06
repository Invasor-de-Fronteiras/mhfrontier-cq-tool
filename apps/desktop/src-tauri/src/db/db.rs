use sqlx::postgres::PgPoolOptions;
use sqlx::Pool;
use sqlx::Postgres;
use sqlx::Result;

use super::config::Config;
use super::config::DBConfig;

#[derive(Clone)]
pub struct DB {
    pub db_config: DBConfig,
    pub pool: Pool<Postgres>,
    pub config: Option<Config>,
    pub max_connections: u32
}

impl DB {
    pub async fn new(db_config: DBConfig) -> Result<DB> {
        let db = DB::new_with_max_connections(db_config, 10).await?;
        Ok(db)
    }

    pub async fn new_with_max_connections(db_config: DBConfig, max_connections: u32) -> Result<DB> {
        let pool = PgPoolOptions::new()
            .max_connections(max_connections)
            .connect_with(db_config.get_connection_options())
            .await?;

        let config = Config::from_file();

        Ok(DB {
            config,
            db_config,
            pool,
            max_connections
        })
    }
}
