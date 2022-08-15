
pub fn quest_header() -> [u8; 16] {
    return [00, 00, 15, 04, 18, 01, 00, 00, 00, 00, 00, 00, 00, 00, 255, 255 ];
}

pub fn file_header() -> [u8; 8] {
    return [ 00, 42, 13, 125, 143, 204, 00, 00 ];
}

pub fn quest_end() -> [u8; 25] {
    return [ 18, 131, 89, 137, 91, 131, 58, 88, 182, 142, 89, 130, 204, 131, 88, 131, 88, 131, 129, 44, 151, 05, 65, 00, 00];
}

pub fn quest_end_last() -> [u8; 1] {
    return [ 00 ];
}

pub struct FileHeader {
    pub quest_count: u16,
    pub unk0: u16,
    pub unk1: u16,
    pub unk2: u16,
}

// utilizar o quest_type_flags
// apartir do MAIN_QUEST_PROP_PRT: u32 = 0xC0; ler 320 bytes
// qyestTypeFlags tem 208 bytes, sobrando 112 bytes
// nos 320 bytes terá o quetTypeflags e mais algumas coisas
// no nosso mainquestprop não tem os icones de monstros e nem o course

// o editor de quest sempre procura pelo valor 0x140,
// porque todas as quests no questlist usam a mesma posição para quest_strings_ptr (0x28 / 40)
// assim sempre q ele achar esse valor ele só precisa voltar 56 posições para encontrar o começo do header (40 + 16) = posição do quest_strings_ptr no quest_types_flags + header da quest
 