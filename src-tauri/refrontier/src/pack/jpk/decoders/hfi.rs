use better_cursor::BetterCursor;

use crate::utils::custom_error::CustomResult;

use super::lz::DecodeLz;

pub struct DecoderHfi {
    m_shift_index: i32,
    m_flag: u8,
    m_flag_hf: u8,
    m_flag_shift: i32,
    m_hf_table_offset: i32,
    m_hf_data_offset: i32,
    m_hf_table_len: i32,
}

impl DecodeLz for DecoderHfi {

    fn jpkbit_lz<T: BetterCursor>(&mut self, input: &mut T) -> CustomResult<u8> {
        self.m_shift_index -= 1;

        if self.m_shift_index < 0 {
            self.m_shift_index = 7;
            self.m_flag = self.read_byte(input).unwrap();
        }

        Ok((self.m_flag >> self.m_shift_index) & 0x01)
    }

    fn read_byte<T: BetterCursor>(&mut self, input: &mut T) -> CustomResult<u8> {
        let mut data = self.m_hf_table_len;

        while data >= 0x100 {
            self.m_flag_shift -= 1;

            if self.m_flag_shift < 0 {
                self.m_flag_shift = 7;
                input.seek_start(self.m_hf_data_offset as u64).unwrap();
                self.m_hf_data_offset += 1;
                self.m_flag_hf = input.read_u8().unwrap();
            }

            let bit = (self.m_flag_hf >> self.m_flag_shift) & 0x1;
            let position = (data * 2 - 0x200 + bit as i32) * 2 + self.m_hf_table_offset;
            input.seek_start(position as u64).unwrap();
            data = input.read_u16()? as i32;
        }

        Ok(data as u8)
    }
}

impl DecoderHfi {

    pub fn decode_hfi<T: BetterCursor>(&mut self, input: &mut T, offset: u32, size: u32) -> CustomResult<Vec<u8>> {
        input.seek_start(offset as u64).unwrap();
        self.m_hf_table_len = input.read_u16()? as i32;
        self.m_hf_table_offset = input.current_position()? as i32;

        self.m_hf_data_offset = self.m_hf_table_offset + self.m_hf_table_len * 4 - 0x3FC;
        let buffer = self.decode_lz(input, self.m_hf_table_offset as u32, size).unwrap();
        
        Ok(buffer)
    }

    pub fn new() -> DecoderHfi {
        DecoderHfi {
            m_shift_index: 0,
            m_flag: 0,
            m_flag_hf: 0,
            m_flag_shift: 0,
            m_hf_table_offset: 0,
            m_hf_data_offset: 0,
            m_hf_table_len: 0,
        }
    }
}

pub fn decode_hfi<T: BetterCursor>(input: &mut T, offset: u32, size: u32) -> CustomResult<Vec<u8>> {
    let mut decoder = DecoderHfi::new();
    let buffer = decoder.decode_hfi(input, offset, size).unwrap();

    Ok(buffer)
}