use std::fs::File;
use std::io::{BufReader, Read, Result, Seek, SeekFrom};
use std::mem::{forget, size_of, MaybeUninit};
use std::path::Path;
use std::slice;

pub struct FileReader {
    pub reader: BufReader<File>,
}

impl FileReader {
    pub fn from_filename(filename: &str) -> Result<FileReader> {
        let filename = Path::new(filename);
        let f = File::open(filename)?;

        Ok(FileReader {
            reader: BufReader::new(f),
        })
    }

    pub fn seek_start(&mut self, pos: u64) -> Result<u64> {
        let result = self.reader.seek(SeekFrom::Start(pos))?;

        Ok(result)
    }

    /**
     * Função que le uma struct de um arquivo
     * T => struct que será usada para ler o arquivo
     */
    pub fn read_struct<T>(&mut self) -> std::io::Result<T> {
        // calculando o tamanho da struct em bytes
        let num_bytes = size_of::<T>();

        unsafe {
            // Aqui vamos criar uma instancia da nossa struct não inicializada
            // para fazer isso precisamos utilizar o escopo unsafe
            let mut data = MaybeUninit::<T>::uninit().assume_init();
            // Vamos criar um buffer dividindo nossa struct em um array de bytes
            // esse buffer é um espelho da nossa instancia, ou seja, eles compartilham o mesmo endereço na memória
            #[allow(unused_mut)]
            let mut buffer = slice::from_raw_parts_mut(&mut data as *mut T as *mut u8, num_bytes);

            // Depois de ler os bytes do arquivo para nosso buffer a nossa variavel data estava com os dados corretos
            match self.reader.read_exact(buffer) {
                Ok(()) => Ok(data),
                Err(e) => {
                    forget(data);
                    Err(e)
                }
            }
        }
    }

    pub fn read_u32(&mut self) -> std::io::Result<u32> {
        let mut buffer = [0_u8; 4];
        self.reader.read_exact(&mut buffer)?;

        Ok(u32::from_le_bytes(buffer))
    }

    pub fn read_u16(&mut self) -> std::io::Result<u16> {
        let mut buffer = [0_u8; 2];
        self.reader.read_exact(&mut buffer)?;

        Ok(u16::from_le_bytes(buffer))
    }

    pub fn read_u8(&mut self) -> std::io::Result<u8> {
        let mut buffer = [0_u8; 1];
        self.reader.read_exact(&mut buffer)?;

        Ok(u8::from_le_bytes(buffer))
    }

    pub fn read_f32(&mut self) -> std::io::Result<f32> {
        let mut buffer = [0_u8; size_of::<f32>()];
        self.reader.read_exact(&mut buffer)?;

        Ok(f32::from_le_bytes(buffer))
    }
}
