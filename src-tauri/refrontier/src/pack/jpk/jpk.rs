use std::io::Result;

use better_cursor::{StructRead, StructWrite};
use better_cursor::{BetterCursor, BetterRead, BetterWrite};
use crate::utils::custom_error::{CustomResult, CustomError};

use super::decoders;
use super::encoders;

#[derive(StructRead, StructWrite)]
pub struct JpkHeader {
    pub header_sign: u32,
    pub unk: u16,
    pub jpk_type: u16,
    pub start_offset: u32,
    pub size: u32
}

pub struct JpkResult {
    pub jpk_type: u16,
    pub buffer: Vec<u8>
}

pub fn is_jpk_header(header: u32) -> bool {
    header == 0x1A524B4A
}

pub fn decode_jpk<R: BetterCursor>(input: &mut R) -> CustomResult<Vec<u8>> {
    let header = input.read_struct::<JpkHeader>()?;

    println!("JPK type {}", header.jpk_type);

    let result = match header.jpk_type {
        0 => decoders::rw::decode_rw(input, header.start_offset, header.size),
        2 => decoders::hfirw::decode_hfirw(input, header.start_offset, header.size),
        3 => decoders::lz::decode_lz(input, header.start_offset, header.size),
        4 => decoders::hfi::decode_hfi(input, header.start_offset, header.size),
        _ => Err(CustomError::JpkInvalidType)
    };

    result
}

pub fn encode_jpk<R: BetterCursor>(input: &mut R, jpk_type: u16, level: u32) -> CustomResult<Vec<u8>> {
    let buffer_len = input.len()?;

    let header = JpkHeader {
        header_sign: 0x1A524B4A,
        unk: 0x108,
        jpk_type,
        start_offset: 0x10,
        size: buffer_len as u32
    };

    let result = match header.jpk_type {
        0 => encoders::rw::encode_rw(input, header, level),
        // 2 => hfirw::encode_hfirw(input, header.start_offset, header.size),
        3 => encoders::lz::encode_lz(input, header, level),
        // 4 => hfi::encode_hfi(input, header.start_offset, header.size),
        _ => Err(CustomError::JpkInvalidType)
    };

    result
}