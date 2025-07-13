use better_cursor::{BetterCursor, BetterRead, BetterWrite};
use crate::pack::jpk::JpkHeader;
use crate::utils::custom_error::CustomResult;

pub fn encode_rw<T: BetterCursor>(input: &mut T, header: JpkHeader, _level: u32) -> CustomResult<Vec<u8>> {
    let mut buffer = better_cursor::from_buffer(vec![]);
    let len = input.len()?;
    let header = header;
    input.seek_start(0)?;

    buffer.write_struct(&header)?;

    for _ in 0..len {
        let byte = input.read_u8()?;

        buffer.write_u8(&byte)?;
    }

    let buffer = buffer.get_buffer()?;

    Ok(buffer)
}