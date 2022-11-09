use std::io::Cursor;
use reqwest::Body;
use reqwest::Client;
use reqwest::multipart;
// use reqwest::Result;s
use serde::Deserialize;
use tokio_util::codec::{FramedRead, BytesCodec};
// type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;
use tokio::fs::File;

use super::config::Config;
use super::result::Result;



#[derive(Deserialize)]
pub struct FilesResult {
    quests: Vec<String>
}

pub struct Api {
    config: Config
}

impl Api {

    pub fn new() -> Option<Api> {
        let config_file = Config::from_file();
        
        if let Some(config) = config_file {
            return Some(Api {
                config
            })
        }
        
        None
    }
    
    pub async fn get_quests(&self) -> Result<Vec<String>> {     
        let request_url = format!("{}/quests", self.config.host);
        let response = reqwest::get(&request_url).await?;
        
        let result: FilesResult = response.json().await?;
        
        Ok(result.quests)
    }
    
    pub async fn get_quest(&self, quest: String, file_name: String) -> Result<()> {     
        let request_url = format!("{}/quests/{}", self.config.host, quest);
        self.download(request_url, file_name).await?;
        
        Ok(())
    }

    pub async fn post_quest(&self, quest: String, file_name: String) -> Result<()> {     
        let request_url = format!("{}/quests/{}", self.config.host, quest);
        self.upload(request_url, quest, file_name).await?;

        Ok(())
    }

    pub async fn get_questlist_all(&self) -> Result<Vec<String>> {     
        let request_url = format!("{}/questlist", self.config.host);
        let response = reqwest::get(&request_url).await?;
        
        let result: FilesResult = response.json().await?;
        
        Ok(result.quests)
    }
    
    pub async fn get_questlist(&self, quest: String, file_name: String) -> Result<()> {     
        let request_url = format!("{}/questlist/{}", self.config.host, quest);
        self.download(request_url, file_name).await?;
        
        Ok(())
    }

    pub async fn post_questlist(&self, quest: String, file_name: String) -> Result<()> {     
        let request_url = format!("{}/questlist/{}", self.config.host, quest);
        self.upload(request_url, quest, file_name).await?;

        Ok(())
    }

    pub async fn download(&self, url: String, file_name: String) -> Result<()> {
        let response = reqwest::get(url).await?;
        let mut file = std::fs::File::create(file_name)?;
        let mut content = Cursor::new(response.bytes().await?);
        std::io::copy(&mut content, &mut file)?;
        Ok(())
    }
  
    pub async fn upload(&self, url: String, file_name: String, file_path: String) -> Result<()> {
        let client = Client::new();
        let file = File::open(file_path).await?;

        // read file body stream
        let stream = FramedRead::new(file, BytesCodec::new());
        let file_body = Body::wrap_stream(stream);

        //make form part of file
        let some_file = multipart::Part::stream(file_body)
            .file_name(file_name)
            .mime_str("application/octet-stream")?;

        //create the multipart form
        let form = multipart::Form::new()
            .part("file", some_file);
        
        client
            .post(url)
            .multipart(form)
            .send()
            .await?;

        Ok(())
    }
    
}