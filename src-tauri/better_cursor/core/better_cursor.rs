use std::fs::{remove_file, File, OpenOptions};
use std::io::{Cursor, Result};
use std::path::Path;

use super::cursor::read::BetterRead;
use super::cursor::seek::BetterSeek;
use super::cursor::write::BetterWrite;

impl BetterSeek for File {}
impl BetterSeek for Cursor<Vec<u8>> {}
impl BetterRead for File {}
impl BetterRead for Cursor<Vec<u8>> {}
impl BetterWrite for File {}
impl BetterWrite for Cursor<Vec<u8>> {}

pub trait BetterCursor: BetterSeek + BetterRead + BetterWrite {}

impl BetterCursor for Cursor<Vec<u8>> {}
impl BetterCursor for File {}

pub fn from_buffer(buffer: Vec<u8>) -> Cursor<Vec<u8>> {
    Cursor::new(buffer)
}

pub fn from_filepath(filepath: &str) -> Result<File> {
    let filepath = Path::new(filepath);
    let file = File::open(filepath)?;

    Ok(file)
}

pub fn from_filepath_write(filepath: &str) -> Result<File> {
    let filepath = Path::new(filepath);

    let file = OpenOptions::new().read(true).write(true).open(filepath)?;

    Ok(file)
}

pub fn from_new_file(filepath: &str) -> Result<File> {
    let filepath = Path::new(filepath);
    if filepath.exists() {
        remove_file(filepath)?;
    }
    let file = File::create(filepath)?;

    Ok(file)
}
