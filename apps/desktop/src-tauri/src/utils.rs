use std::fmt::Display;

use serde::Serialize;

#[derive(Serialize)]
pub struct ErrorResponse {
  error: String
}

pub fn wrap_result(message: String, has_error: bool) -> String {
    if has_error {
      let error = ErrorResponse { error: message };
      
      if let Ok(result) = serde_json::to_string_pretty(&error) {
        return result;
      } else {
        return "{ \"error\": \"unexpected error\" }".to_string();
      }
    }

    message
}

pub fn wrap_json_result<T: Serialize, E: std::fmt::Display>(result: Result<T, E>) -> String {
    match result {
      Ok(data) => {
        match serde_json::to_string_pretty(&data) {
          Ok(text) => text,
          Err(error) => wrap_result(error.to_string(), true)
        }
      },
      Err(error) => wrap_result(error.to_string(), true)
    }
}

#[derive(Debug)]
pub enum CustomError {
  IoError(std::io::Error),
  SqlxError(sqlx::Error),
  SerdeError(serde_json::Error)
}

impl Display for CustomError {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
      match self {
        CustomError::IoError(error) => 
          write!(f, "{}", error),
        CustomError::SqlxError(error) => 
          write!(f, "{}", error),
        CustomError::SerdeError(error) => 
          write!(f, "{}", error),
      }
  }
}

impl std::error::Error for CustomError {}

impl From<std::io::Error> for CustomError {
  fn from(err: std::io::Error) -> Self {
    CustomError::IoError(err)
  }
}

impl From<sqlx::Error> for CustomError {
  fn from(err: sqlx::Error) -> Self {
    CustomError::SqlxError(err)
  }
}

impl From<serde_json::Error> for CustomError {
  fn from(err: serde_json::Error) -> Self {
    CustomError::SerdeError(err)
  }
}

pub type CustomResult<T> = Result<T, CustomError>;
