use std::fs::remove_file;
use std::{path::Path, fs::File};

use better_cursor::{BetterRead, BetterWrite};
use crate::crypto::ecd::{self, EcdHeader};
use crate::pack::jpk;
use crate::utils::custom_error::CustomResult;

pub fn process_file(input: &str, output: &str) -> CustomResult<()> {
    let input_path = Path::new(input);
    let output_path = Path::new(output);

    let mut input_file = File::open(input_path).unwrap();
    let mut reader = input_file.to_buffer_reader()?;

    let header = reader.read_current_u32()?;

    if ecd::is_ecd_header(header) {
        println!("ECD Header detected.");

        let decript_result = ecd::decrypt_ecd(&mut reader)?;
        println!("{:?}", decript_result.header);

        if output_path.exists() {
            remove_file(output_path)?;
        }

        let mut output_file = File::create(output_path)?;
        output_file.write_buffer(&decript_result.buffer)?;

        let output_meta_path = &output_path.with_extension("meta");
        if output_meta_path.exists() {
            remove_file(output_meta_path)?;
        }
        let mut meta_file = File::create(output_meta_path)?;
        
        meta_file.write_struct(&decript_result.header)?;
    }

    if jpk::is_jpk_header(header) {
        println!("JKR Header detected.");

        let unpacked_buffer = jpk::decode_jpk(&mut reader)?;
        if output_path.exists() {
            remove_file(output_path)?;
        }

        let mut output_file = File::create(output_path)?;
        output_file.write_buffer(&unpacked_buffer)?;
    }

    Ok(())
}

pub fn load_ecd_header(input: &str) -> CustomResult<EcdHeader> {
    let input_path = Path::new(input);

    let mut input_file = File::open(input_path).unwrap();
    let mut reader = input_file.to_buffer_reader()?;

    let header = reader.read_struct::<EcdHeader>()?;

    Ok(header)
}

pub fn encrypt_ecd_file(input: &str, output: &str, header: EcdHeader) -> CustomResult<()> {
    let input_path = Path::new(input);
    let output_path = Path::new(output);

    let mut input_file = File::open(input_path).unwrap();
    let mut reader = input_file.to_buffer_reader()?;

    let buffer = ecd::encrypt_ecd(&mut reader, header)?;

    if output_path.exists() {
        remove_file(output_path)?;
    }

    let mut output_file = File::create(output_path)?;
    output_file.write_buffer(&buffer)?;

    Ok(())
}

pub fn encode_jpk_file(input: &str, output: &str, jpk_type: u16, level: u32) -> CustomResult<()> {
    let input_path = Path::new(input);
    let output_path = Path::new(output);

    let mut input_file = File::open(input_path).unwrap();
    let mut reader = input_file.to_buffer_reader()?;

    let buffer = jpk::encode_jpk(&mut reader, jpk_type, level)?;

    if output_path.exists() {
        remove_file(output_path)?;
    }

    let mut output_file = File::create(output_path)?;
    output_file.write_buffer(&buffer)?;
    
    Ok(())
}