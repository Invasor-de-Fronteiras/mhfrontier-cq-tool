use better_cursor::{BetterCursor, BetterRead, BetterWrite};
use crate::utils::custom_error::CustomResult;

pub fn decode_rw<T: BetterCursor>(input: &mut T, offset: u32, size: u32) -> CustomResult<Vec<u8>> {
    let mut buffer = better_cursor::from_buffer(vec![]);
    input.seek_start(offset as u64)?;

    for _ in 0..size {
        let byte = input.read_u8()?;

        buffer.write_u8(&byte)?;
    }

    let buffer = buffer.get_buffer()?;

    Ok(buffer)
}