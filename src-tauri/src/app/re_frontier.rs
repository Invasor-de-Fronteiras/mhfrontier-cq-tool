use std::{env, process::Command};

use serde::{Deserialize, Serialize};

use super::utils::EventResponse;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ReFrontierPayload {
    filepath: String,
    re_frontier_path: String,
}

#[tauri::command]
pub fn re_frontier(event: String) -> String {
    let event_payload = serde_json::from_str::<ReFrontierPayload>(&event);

    match event_payload {
        Ok(payload) => {
            let is_windows = cfg!(target_os = "windows");

            if !is_windows {
                return EventResponse::error(String::from("This feature only works on Windows"))
                    .to_string();
            }

            let refrontier_path = env::current_dir()
                .unwrap()
                .join("ReFrontier")
                .join("ReFrontier.exe");

            let result = Command::new(refrontier_path)
                .args([payload.filepath])
                .output();

            match result {
                Ok(output) => {
                    if output.stderr.len() > 0 {
                        let error = String::from_utf8_lossy(&output.stderr).to_string();
                        return EventResponse::error(error).to_string();
                    }

                    let message = String::from_utf8_lossy(&output.stdout).to_string();
                    EventResponse::success_with_data(message).to_string()
                }
                Err(error) => EventResponse::error(error.to_string()).to_string(),
            }
        }
        Err(error) => EventResponse::payload_error(error.to_string()).to_string(),
    }
}
