use std::fs::File;
use std::io::{BufReader, Read, Seek};
use std::mem::{forget, size_of, MaybeUninit};
use std::slice;

use crate::monsters::LargeMonsterPointers;
use crate::structs::{QuestFile, QuestFileHeader};

#[derive(Debug)]
#[repr(C)]
struct QuestFileQuestType {
    big_monster_size_multi: u16,
}

/**
 * Função que le uma struct de um arquivo
 * T => struct que será usada para ler o arquivo
 */
pub fn read_struct<T>(read: &mut BufReader<File>) -> std::io::Result<T> {
    // calculando o tamanho da struct em bytes
    let num_bytes = size_of::<T>();

    unsafe {
        // Aqui vamos criar uma instancia da nossa struct não inicializada
        // para fazer isso precisamos utilizar o escopo unsafe
        let mut data = MaybeUninit::<T>::uninit().assume_init();
        // Vamos criar um buffer dividindo nossa struct em um array de bytes
        // esse buffer é um espelho da nossa instancia, ou seja, eles compartilham o mesmo endereço na memória
        let mut buffer = slice::from_raw_parts_mut(&mut data as *mut T as *mut u8, num_bytes);

        // Depois de ler os bytes do arquivo para nosso buffer a nossa variavel data estava com os dados corretos
        match read.read_exact(buffer) {
            Ok(()) => {
                print!("{:?}", buffer);
                Ok(data)
            }
            Err(e) => {
                forget(data);
                Err(e)
            }
        }
    }
}

pub fn reader(reader: &mut BufReader<File>) -> QuestFile {
    let header = read_struct::<QuestFileHeader>(reader).unwrap();

   

    reader.seek(std::io::SeekFrom::Start(header.large_monster_ptr as u64)).unwrap();

    let monster_pointers = read_struct::<LargeMonsterPointers>(reader).unwrap();

    // reader.seek(std::io::SeekFrom::Start(header.quest_type_ptr as u64)).unwrap();
    // let quest_type = read_struct::<QuestFileQuestType>(reader).unwrap();

    QuestFile {
        header: header,
        monster_pointers,
        // monster_spawn,
    }
}
