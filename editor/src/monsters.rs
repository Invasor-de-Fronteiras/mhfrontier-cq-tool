pub enum MonsterID {
    None,
    Rathian,
    Fatalis,
    Kelbi,
    Mosswine,
    Bullfango,
    YianKutKu,
    LaoShanLung,
    Cephadrome,
    Felyne1,
    VeggieElder,
    Rathalos,
    Aptonoth,
    Genprey,
    Diablos,
    Khezu,
    Velociprey,
    Gravios,
    Felyne2,
    Vespoid,
    Gypceros,
    Plesioth,
    Basarios,
    Melynx,
    Hornetaur,
    Apceros,
    Monoblos,
    Velocidrome,
    Gendrome,
    Rocks0,
    Ioprey,
    Iodrome,
    Pugis,
    Kirin,
    Cephalos,
    Giaprey,
    CrimsonFatalis,
    PinkRathian,
    BlueYianKutKu,
    PurpleGypceros,
    YianGaruga,
    SilverRathalos,
    GoldRathian,
    BlackDiablos,
    WhiteMonoblos,
    RedKhezu,
    GreenPlesioth,
    BlackGravios,
    DaimyoHermitaur,
    AzureRathalos,
    AshenLaoShanLung,
    Blangonga,
    Congalala,
    Rajang,
    KushalaDaora,
    ShenGaoren,
    GreatThunderbug,
    Shakalaka,
    YamaTsukami1,
    Chameleos,
    RustedKushalaDaora,
    Blango,
    Conga,
    Remobra,
    Lunastra,
    Teostra,
    Hermitaur,
    ShogunCeanataur,
    Bulldrome,
    Anteka,
    Popo,
    WhiteFatalis,
    YamaTsukami2,
    Ceanataur,
    Hypnocatrice,
    Lavasioth,
    Tigrex,
    Akantor,
    BrightHypnoc,
    LavasiothSubspecies,
    Espinas,
    OrangeEspinas,
    WhiteHypnoc,
    AkuraVashimu,
    AkuraJebia,
    Berukyurosu,
    Cactus01,
    GorgeObjects,
    GorgeRocks,
    Pariapuria,
    WhiteEspinas,
    KamuOrugaron,
    NonoOrugaron,
    Raviente,
    Dyuragaua,
    Doragyurosu,
    Gurenzeburu,
    Burukku,
    Erupe,
    Rukodiora,
    Unknown,
    Gogomoa,
    Kokomoa,
    TaikunZamuza,
    Abiorugu,
    Kuarusepusu,
    Odibatorasu,
    Disufiroa,
    Rebidiora,
    Anorupatisu,
    Hyujikiki,
    Midogaron,
    Giaorugu,
    MiRu,
    Farunokku,
    Pokaradon,
    Shantien,
    Pokara,
    Dummy,
    Goruganosu,
    Aruganosu,
    Baruragaru,
    Zerureusu,
    Gougarf,
    Uruki,
    Forokururu,
    Meraginasu,
    Diorekkusu,
    GarubaDaora,
    Inagami,
    Varusaburosu,
    Poborubarumu,
    Duremudira,
    Unk0,
    Felyne,
    BlueNpc,
    Unk1,
    CactusVarusa,
    VeggieElders,
    Gureadomosu,
    Harudomerugu,
    Toridcless,
    Gasurabazura,
    Kusubami,
    YamaKurai,
    Dure2ndDistrict,
    Zinogre,
    Deviljho,
    Brachydios,
    BerserkLaviente,
    ToaTesukatora,
    Barioth,
    Uragaan,
    StygianZinogre,
    Guanzorumu,
    StarvingDeviljho,
    UNK,
    Egyurasu,
    Voljang,
    Nargacuga,
    Keoaruboru,
    Zenaserisu,
    GoreMagala,
    BlinkingNargacuga,
    ShagaruMagala,
    Amatsu,
    Elzelion,
    MusouDure,
    Rocks1,
    Seregios,
    Bogabadorumu,
    UnknownBlueBarrel,
    MusouBogabadorumu,
    CostumedUruki,
    MusouZerureusu,
    Pso2Rappy,
    KingShakalaka,
}

// struct LargeMonsterPointers{
//     FSkip(8);
//     uint32 largeMonsterIds;
//     uint32 largeMonsterSpawns;
// } lgPtr<size=32>;

#[derive(Debug)]
pub struct LargeMonsterPointers {
    // skip 8 bytes
    pub unk_0: u32,
    pub unk_1: u32,
    pub large_monster_ids: u32,
    pub large_monster_spawns: u32,
    pub unk_2: u32,
    pub unk_3: u32,
    pub unk_4: u32,
    pub unk_5: u32,
}

// struct LargeMonsterSpawn {
//     MonsterID monster;
//     FSkip(3);// adjust for other values being int16s
//     uint32 spawnAmount;
//     uint32 spawnStage;
//     FSkip(16); // null in working example
//     uint32 Unk2;
//     float xPos;
//     float yPos;
//     float zPos;
// }

#[derive(Debug)]
pub struct LargeMonsterSpawn {
    pub monster_id: u32,
    // skip 3 bytes
    pub unk1: u8,
    pub unk2: u8,
    pub unk3: u8,
    pub spawn_amount: u32,
    pub spawn_stage: u32,

    // skip 16 bytes
    pub unk4: u32,
    pub unk5: u32,
    pub unk6: u32,
    pub unk7: u32,

    pub unk8: u32,
    pub x_position: u32,
    pub y_position: u32,
    pub z_position: u32,
}

// struct LargeMonster {
//     monster_id: u8,
//     spawn: LargeMonsterSpawn
// }

// fn test() {
//     let monster = MonsterID::Akantor;

// }

// MonsterID<
