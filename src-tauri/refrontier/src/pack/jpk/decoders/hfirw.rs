use better_cursor::{BetterCursor, BetterRead, BetterWrite};
use crate::utils::custom_error::CustomResult;

use super::hfi::DecoderHfi;
use super::lz::DecodeLz;

pub fn decode_hfirw<T: BetterCursor>(input: &mut T, offset: u32, size: u32) -> CustomResult<Vec<u8>> {
    let mut buffer = better_cursor::from_buffer(vec![]);
    input.seek_start(offset as u64)?;

    let mut hfi = DecoderHfi::new();

    for _ in 0..size {
        let byte = hfi.read_byte(input)?;
        buffer.write_u8(&byte)?;
    }

    let buffer = buffer.get_buffer()?;

    Ok(buffer)
}