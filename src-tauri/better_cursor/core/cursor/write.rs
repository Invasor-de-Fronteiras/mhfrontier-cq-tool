use std::io::{Error, ErrorKind, Result, Write};
use std::mem::size_of;
use std::slice;

use encoding_rs::{Encoding, SHIFT_JIS, UTF_8};

use super::seek::BetterSeek;

pub trait CustomWrite {
    fn write<W: BetterWrite + ?Sized>(&self, writer: &mut W) -> Result<u64>;
}

pub trait StructWrite
where
    Self: Sized,
{
    fn write<W: BetterWrite + ?Sized>(&self, writer: &mut W) -> Result<u64>;
}

pub trait BetterWrite
where
    Self: Write + BetterSeek,
{
    unsafe fn write_struct_unsafe<T>(&mut self, data: &mut T) -> Result<()> {
        let num_bytes = size_of::<T>();

        #[allow(unused_mut)]
        let mut buffer = slice::from_raw_parts_mut(data as *mut T as *mut u8, num_bytes);

        match self.write(buffer) {
            Ok(_) => Ok(()),
            Err(e) => {
                let _ = data;
                Err(e)
            }
        }
    }

    fn write_struct_on<T: StructWrite>(&mut self, data: &T, pos: u64) -> Result<()> {
        let current = self.current_position()?;

        self.seek_start(pos)?;
        self.write_struct(data)?;
        self.seek_start(current)?;

        Ok(())
    }

    fn write_custom<T: CustomWrite>(&mut self, data: &T) -> Result<u64> {
        data.write(self)
    }

    fn write_struct<T: StructWrite>(&mut self, data: &T) -> Result<u64> {
        data.write(self)
    }

    fn write_buffer(&mut self, buffer: &[u8]) -> Result<()> {
        self.write(&buffer)?;
        Ok(())
    }

    fn write_u8(&mut self, value: &u8) -> Result<()> {
        let mut buffer = value.to_le_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_u16(&mut self, value: &u16) -> Result<()> {
        let mut buffer = value.to_le_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_u32(&mut self, value: &u32) -> Result<usize> {
        let buffer = value.to_le_bytes();
        let result = self.write(&buffer)?;

        Ok(result)
    }

    fn write_u64(&mut self, value: &u64) -> Result<usize> {
        let buffer = value.to_le_bytes();
        let result = self.write(&buffer)?;

        Ok(result)
    }

    fn write_u8_be(&mut self, value: &u8) -> Result<()> {
        let mut buffer = value.to_be_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_u16_be(&mut self, value: &u16) -> Result<()> {
        let mut buffer = value.to_be_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_u32_be(&mut self, value: &u32) -> Result<usize> {
        let buffer = value.to_be_bytes();
        let result = self.write(&buffer)?;

        Ok(result)
    }

    fn write_f32(&mut self, value: &f32) -> Result<()> {
        let mut buffer = value.to_le_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_f64(&mut self, value: &f64) -> Result<()> {
        let mut buffer = value.to_le_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_f32_be(&mut self, value: &f32) -> Result<()> {
        let mut buffer = value.to_be_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_f64_be(&mut self, value: &f64) -> Result<()> {
        let mut buffer = value.to_be_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_string_by_encoding(&mut self, encoding: &'static Encoding, value: &str) -> Result<()> {
        let (result, _enc, errors) = encoding.encode(value);
        if errors {
            return Err(Error::new(
                ErrorKind::Other,
                format!("Failed to convert {} to {}", value, encoding.name()),
            ));
        }

        let mut buf = result.to_vec();
        buf.push(0);
        self.write(&buf)?;

        Ok(())
    }

    fn write_string_shift_jis(&mut self, value: &str) -> Result<()> {
        self.write_string_by_encoding(SHIFT_JIS, value)
    }

    fn write_string_utf_8(&mut self, value: &str) -> Result<()> {
        self.write_string_by_encoding(UTF_8, value)
    }
}
