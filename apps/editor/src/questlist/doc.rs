pub mod file_header;

// funçções importantes
// AddNewQuestFromFile
// buttonOpenFolder_Click
// listQuest_SelectedIndexChanged

/* ======== Enums e valores conhecidos ======== */

// 2 bytes
// enum QuestCategory {
//     09 00 = Campaign
//     18 01 = Series
//     34 01 = Superior
//     35 01 = G Superior
//     36 01 = G Armor/Weapon
//     12 01 = LR/HR Event
//     1C 01 = G Event
//     2B 01 = Zenith
//     26 01 = HR Exotic
//     27 01 = G Exotic
//     11 3C = Diva Defense
//     10 01 = Great Slaying
// }

// enum QuestMark {
//     00 = None
//     01 = Recommended
//     02 = New
//     04 = Refine
// }

// enum SeasonDaytime {
//     00 = Based on season and daytime in town.
//     0A = Warm/Day
//     12 = Warm/Night
//     0C = Cold/Day
//     14 = Cold/Night
//     09 = Breeding/Day
//     11 = Breeding/Night
//     40 = Based on season and daytime in town.
//     4A = Warm/Day/Master
//     52 = Warm/Night/Master
//     4C = Cold/Day/Master
//     54 = Cold/Night/Master
//     49 = Breed/Day/Master
//     51 = Breed/Night/Master
//     D1 = Breed/Day/Master
//     1A = Warm/Day
//     5A = Warm/Day/Master
//     C9 = Breed/Day/Master
// }

// enum Course {
//     00 12 = Hunter's Life
//     00 13 = Trial
//     00 14 = Premium
//     00 10 = Netcafe/NCourse
// }

// /* ======== START FILE ======== */
// // 6 bytes
// struct FileHeader {
//     quest_count: u16;
//     unk0: u16;
//     unk1: u16;
//     unk2: u16;
// }

// struct QuestHeader {
//     skip: [u8; 3],
//     // This byte is the number of players that can join the quest
//     // values above 04 will make the quest into PVP, more testing needed.
//     max_players: u8;
//     // This is the Quest Category, 2 bytes, the quest will be available in this category.
//     quest_category: u16; // QuestCategory
//     skip: [u8; 5],
//     mark: u8; // QuestMark
//     unk1: u8;
//     unk2: u8;
//     lenght: u16; // pode ser o tamanho de bytes da quest
// }

// /* ======== Observações ======== */
// // do offset 0x00 até 0x140 é equivalente a 320 bytes a partir do MAIN_QUEST_PROP do arquivo de quest

// ForcedEquipment

// Rewards

// MainQuestProp

// QuestData

// struct QuestData {
//     // 0x00 ==========
//     unk3: u8; // 41 parece sempre repetir antes do season_daytime
//     unk4: u8; // 40
//     // This byte changes the Time/Season of the quest, it also changes the quest to Master Order.
//     // Search for 41 40 xx to quickly find them to overwrite! They have way more than this value...
//     season_daytime: u8;
//     unk15: u8;
//     star_level: u8; // 01..08
//     course: u16;
//     skip: [u8; 5],
//     // This 4 bytes is the quest fee, as usual those values are inverted “BC 02 00 00” hex 00 00 02 BC = dec 700.
//     quest_fee: u32,
//     // 0x10 ==========
//     main_reward: u32,
//     // This 4 bytes is the death penalty reduction, can be either the reduction zenny or just 03 00 00 00 for total 3 deaths.
//     death_penalty: u32,
//     sub_a_reward: u32,
//     sub_b_reward: u32,
//     // 0x20 ==========
//     time: u32;
//     map_id: u32;
//     skip: u32;
//     rest: u8;
//     skip: u8;
//     quest_id: u16;
//     // 0x30 ==========
//     main_objective_type: u32;
//     main_objective_targey: u16;
//     main_objective_quantity: u16;
//     sub_a_objective_type: u32;
//     sub_a_objective_target: u16;
//     sub_a_objective_quantity: u16;

//     // 0x40 ==========
//     sub_b_objective_type: u32;
//     sub_b_objective_target: u16;
//     sub_b_objective_quantity: u16;
//     skip: u16;
//     req_min: u16;
//     req_max: u16;
//     req_host: u16;

//     // 0x50 =========
//     skip: u32;
//     skip: u32;
//     skip: u32;
//     legs_id: u16;
//     legs_deco_1: u16;
    
//     // 0x60 =========
//     legs_deco_2: u16;
//     legs_deco_3: u16;
//     weapon_id: u16;
//     weapon_deco_1: u16;
//     weapon_deco_2: u16;
//     weapon_deco_3: u16;
//     head_id: u16;
//     head_deco_1: u16;
//     // 0x70 =========
//     head_deco_2: u16;
//     head_deco_3: u16;
//     chest_id: u16;
//     chest_deco_1: u16;
//     chest_deco_2: u16;
//     chest_deco_3: u16;
//     arms_id: u16;
//     arms_deco_1: u16;
//     // 0x80 =========
//     arms_deco_2: u16;
//     arms_deco_3: u16;
//     waist_id: u16;
//     waist_deco_1: u16;
//     waist_deco_2: u16;
//     waist_deco_3: u16;
//     skip: u32;
//     // 0x90 =========
//     skip: u32,
//     item_req: u16,
//     item_req_quant: u8,
//     quest_type_1: u8,
//     quest_type_2: u16,
//     // 0xA0 ==========
//     skip: u32;
//     main_points: u32;
//     sub_a_points: u32;
//     sub_b_points: u32;
//     // 0xB0 ==========
//     item_1: u16;
//     item_2: u16;
//     item_3: u16;
//     skip: u16;
//     skip: u8;
//     monster_icon1: u8;
//     monster_icon2: u8;
//     monster_icon3: u8;
//     monster_icon4: u8;
//     monster_icon5: u8;
//     skip: u8;
//     skip: u8;
//     // 0xC0 ==========
    
//     // 0x140 ==========
//     title_and_name_ptr: u16,
//     skip: u16;
//     main_objective_ptr: u16,
//     skip: u16;
//     a_objective_ptr: u16,
//     skip: u16;
//     b_objective_ptr: u16,
//     skip: u16;
//     // 0x150 ==========
//     clear_condition_ptr: u16,
//     skip: u16;
//     fail_condition_ptr: u16,
//     skip: u16;
//     client_ptr: u16,
//     skip: u16;
//     text_ptr: u16,
//     skip: u16;
//     // 0x160 ==========
// }

pub struct QuestStringPointers {
    // 0x140 (quest_data)
    pub title_and_name_ptr: u16,
    pub skip: u16,
    pub main_objective_ptr: u16,
    pub skip: u16,
    pub a_objective_ptr: u16,
    pub skip: u16,
    pub b_objective_ptr: u16,
    pub skip: u16,
    // 0x150 (quest_data)
    pub clear_condition_ptr: u16,
    pub skip: u16,
    pub fail_condition_ptr: u16,
    pub skip: u16,
    pub client_ptr: u16,
    pub skip: u16,
    pub text_ptr: u16,
    pub skip: u16,
}

pub struct ForcedEquipment {
    // 0x50 (quest_data)
    pub skip: u32,
    pub skip: u32,
    pub skip: u32,
    pub legs_id: u16,
    pub legs_deco_1: u16,
    // 0x60 (quest_data)
    pub legs_deco_2: u16,
    pub legs_deco_3: u16,
    pub weapon_id: u16,
    pub weapon_deco_1: u16,
    pub weapon_deco_2: u16,
    pub weapon_deco_3: u16,
    pub head_id: u16,
    pub head_deco_1: u16,
    // 0x70 (quest_data)
    pub head_deco_2: u16,
    pub head_deco_3: u16,
    pub chest_id: u16,
    pub chest_deco_1: u16,
    pub chest_deco_2: u16,
    pub chest_deco_3: u16,
    pub arms_id: u16,
    pub arms_deco_1: u16,
    // 0x80 (quest_data)
    pub arms_deco_2: u16,
    pub arms_deco_3: u16,
    pub waist_id: u16,
    pub waist_deco_1: u16,
    pub waist_deco_2: u16,
    pub waist_deco_3: u16,
    pub skip: u32,
}

pub struct MainQuestProp {
    // 0x00 ==========
    unk0: u8, // 41 parece sempre repetir antes do season_daytime
    unk1: u8, // 40
    // This byte changes the Time/Season of the quest, it also changes the quest to Master Order.
    // Search for 41 40 xx to quickly find them to overwrite! They have way more than this value...
    quest_locale_flags: u8, // season_daytime
    unk2: u8,
    ranking_id: u8, // star level 01..08
    // course: u16,
    // skip: [u8, 5],
    pub course: u16,
    pub unk4: u8,
    pub rank_band0: u16,
    pub untat_id: u8, // enum quest_type_id N,ka,zy,su,HC,HS,Rea,G
    pub skip1: u8,

    // This 4 bytes is the quest fee, as usual those values are inverted “BC 02 00 00” hex 00 00 02 BC = dec 700.
    quest_fee: u32,
    // 0x10 ==========
    reward_main: u32,
    // This 4 bytes is the death penalty reduction, can be either the reduction zenny or just 03 00 00 00 for total 3 deaths.
    death_penalty: u32,
    pub reward_a: u16,
    pub unk5: u16,
    pub reward_b: u16,
    pub hard_hunter_rank_req: u16,
    // 0x20 ==========
    quest_time: u32,
    quest_map_only_monitor: u32,
    quest_strings_ptr: u32,
    rest: u8,
    skip: u8,
    quest_id: u16,
    // 0x30 ==========
    pub objectives: QuestObjective,
    // 0x48
    skip: u16,
    join_rank_min: u16,
    join_rank_max: u16,
    req_host: u16,
}