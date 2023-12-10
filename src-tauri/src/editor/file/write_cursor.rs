use std::io::{Cursor, Error, ErrorKind, Read, Result, Seek, SeekFrom, Write};
use std::mem::{forget, size_of};
use std::slice;

use encoding_rs::SHIFT_JIS;

use super::reader::FileReader;

pub trait CustomWriter
where
    Self: Sized,
{
    fn write<W: WriteCursor + ?Sized>(&mut self, writer: &mut W) -> Result<u64>;
}

pub trait WriteCursor
where
    Self: Write + Seek,
{
    fn seek_start(&mut self, pos: u64) -> Result<u64> {
        let result = self.seek(SeekFrom::Start(pos))?;

        Ok(result)
    }

    /**
     * Função que le uma struct de um arquivo
     * T => struct que será usada para ler o arquivo
     */
    fn write_struct<T>(&mut self, data: &mut T) -> std::io::Result<()> {
        // calculando o tamanho da struct em bytes
        let num_bytes = size_of::<T>();

        unsafe {
            // Vamos criar um buffer dividindo nossa struct em um array de bytes
            // esse buffer é um espelho da nossa instancia, ou seja, eles compartilham o mesmo endereço na memória
            #[allow(unused_mut)]
            let mut buffer = slice::from_raw_parts_mut(data as *mut T as *mut u8, num_bytes);

            // Depois de ler os bytes do arquivo para nosso buffer a nossa variavel data estava com os dados corretos
            match self.write(buffer) {
                Ok(_) => Ok(()),
                Err(e) => {
                    forget(data);
                    Err(e)
                }
            }
        }
    }

    fn write_struct_on<T>(&mut self, data: &mut T, pos: u64) -> std::io::Result<()> {
        let current = self.current_position()?;

        self.seek_start(pos)?;
        self.write_struct(data)?;
        self.seek_start(current)?;

        Ok(())
    }

    fn write_custom<T: CustomWriter>(&mut self, data: &mut T) -> std::io::Result<u64> {
        data.write(self)
    }

    fn write_buffer(&mut self, buffer: &[u8]) -> std::io::Result<()> {
        self.write(&buffer)?;
        Ok(())
    }

    fn write_u32(&mut self, value: &u32) -> std::io::Result<usize> {
        let buffer = value.to_le_bytes();
        let result = self.write(&buffer)?;

        Ok(result)
    }

    fn write_u16(&mut self, value: &u16) -> std::io::Result<()> {
        let mut buffer = value.to_le_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_u16_be(&mut self, value: &u16) -> std::io::Result<()> {
        let mut buffer = value.to_be_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_u8(&mut self, value: &u8) -> std::io::Result<()> {
        let mut buffer = value.to_le_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn write_f32(&mut self, value: &f32) -> std::io::Result<()> {
        let mut buffer = value.to_le_bytes();
        self.write(&mut buffer)?;

        Ok(())
    }

    fn current_position(&mut self) -> std::io::Result<u64> {
        self.stream_position()
    }

    fn write_string(&mut self, value: &str) -> std::io::Result<()> {
        let (result, _enc, errors) = SHIFT_JIS.encode(value);
        if errors {
            return Err(Error::new(
                ErrorKind::Other,
                format!("Failed to convert {} to JIS", value),
            ));
        }

        let mut buf = result.to_vec();
        buf.push(0);
        self.write(&buf)?;

        Ok(())
    }

    fn write_from_filename(&mut self, filename: &str) -> Result<()> {
        let mut reader = FileReader::from_filename(filename)?;
        let mut buffer = Vec::new();
        reader.reader.read_to_end(&mut buffer)?;

        self.write_buffer(&buffer)?;

        Ok(())
    }
}

impl WriteCursor for Cursor<Vec<u8>> {}
