use std::fmt::Display;

#[derive(Debug)]
pub enum CustomError {
    IoError(std::io::Error),
    SerdeError(serde_json::Error),
    UnkownHeader,
    JpkInvalidType,
    NotImplemented(String),
}

impl Display for CustomError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            CustomError::IoError(error) => write!(f, "{}", error),
            CustomError::SerdeError(error) => write!(f, "{}", error),
            CustomError::UnkownHeader => write!(f, "Unkown header"),
            CustomError::JpkInvalidType => write!(f, "Jpk invalid type"),
            CustomError::NotImplemented(feature) => write!(f, "{} not implemented", feature)
        }
    }
}

impl std::error::Error for CustomError {}

impl From<std::io::Error> for CustomError {
    fn from(err: std::io::Error) -> Self {
        CustomError::IoError(err)
    }
}

impl From<serde_json::Error> for CustomError {
    fn from(err: serde_json::Error) -> Self {
        CustomError::SerdeError(err)
    }
}

pub type CustomResult<T> = Result<T, CustomError>;