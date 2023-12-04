use std::{io::Result, process::Command};

use serde::{Deserialize, Serialize};

use super::utils::wrap_result;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ReFrontierPayload {
    filepath: String,
    re_frontier_path: String,
}

#[tauri::command]
pub fn re_frontier(event: String) -> String {
    let result = || -> Result<String> {
        let mut payload = serde_json::from_str::<ReFrontierPayload>(&event)?;

        let is_windows = cfg!(target_os = "windows");

        if !is_windows {
            return Ok(String::from(
                "{ \"message\": \"This feature only works on Windows\" }",
            ));
        }

        let output = Command::new("C:\\Users\\raina_py7xzzm\\OneDrive\\Área de Trabalho\\arca\\repos\\mhfrontier-cq-tool\\app\\src-tauri\\ReFrontier\\ReFrontier.exe")
            .args([payload.filepath])
            .output()?;

        let message = String::from_utf8_lossy(&output.stdout).to_string();

        let result = serde_json::json!({ "message": message });
        Ok(result.to_string())
    };

    match result() {
        Ok(response) => response,
        Err(error) => wrap_result(error.to_string(), true),
    }
}
