use std::error::Error;

use serde::Serialize;

pub fn wrap_result(message: String, has_error: bool) -> String {
    if has_error {
      return format!("{{ \"error\": \"{}\" }}", message);
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