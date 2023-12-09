use std::fmt::Display;

use serde::Serialize;

#[derive(Serialize)]
pub struct EventResponse<T: Serialize = ()> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}

impl EventResponse<()> {
    pub fn success() -> EventResponse<()> {
        EventResponse::<()> {
            success: true,
            data: None,
            error: None,
        }
    }

    pub fn error(error: String) -> EventResponse<()> {
        EventResponse::<()> {
            success: false,
            data: None,
            error: Some(error),
        }
    }

    pub fn payload_error(error: String) -> EventResponse<()> {
        let message = format!("Payload error: {}", error);
        EventResponse::error(message)
    }

    pub fn from_result<E: std::fmt::Display>(result: Result<(), E>) -> EventResponse<()> {
        match result {
            Ok(_) => EventResponse::success(),
            Err(error) => EventResponse::error(error.to_string()),
        }
    }
}

impl<T: Serialize> EventResponse<T> {
    pub fn from_result_data<E: std::fmt::Display>(result: Result<T, E>) -> EventResponseResult<T> {
        match result {
            Ok(data) => EventResponseResult::Ok(EventResponse::success_with_data(data)),
            Err(error) => EventResponseResult::Err(EventResponse::error(error.to_string())),
        }
    }

    pub fn success_with_data(data: T) -> EventResponse<T> {
        EventResponse::<T> {
            success: true,
            data: Some(data),
            error: None,
        }
    }

    pub fn to_string(&self) -> String {
        if let Ok(result) = serde_json::to_string_pretty(self) {
            return result;
        }

        return "{ \"success\": false, \"error\": \"unexpected error\" }".to_string();
    }
}

pub enum EventResponseResult<T: Serialize> {
    Ok(EventResponse<T>),
    Err(EventResponse<()>),
}

impl<T: Serialize> EventResponseResult<T> {
    pub fn to_string(&self) -> String {
        match self {
            EventResponseResult::Ok(response) => response.to_string(),
            EventResponseResult::Err(response) => response.to_string(),
        }
    }
}

#[derive(Debug)]
pub enum CustomError {
    IoError(std::io::Error),
    SqlxError(sqlx::Error),
    SerdeError(serde_json::Error),
}

impl Display for CustomError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            CustomError::IoError(error) => write!(f, "{}", error),
            CustomError::SqlxError(error) => write!(f, "{}", error),
            CustomError::SerdeError(error) => write!(f, "{}", error),
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
