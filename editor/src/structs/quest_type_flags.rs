use serde_derive::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct Objective {
    quest_objective: u32,
    monster_id: u8,
    unk: u8,
    quantity: u16
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestObjective {
    objective1: Objective,
    objective2: Objective,
    objective3: Objective,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct Quantity {
    gathering_tables_qty: u16,
    unk0: u16,
    area1zones: u8,
    area2zones: u8,
    area3zones: u8,
    area4zones: u8,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct GenQuestProp {
    big_monster_size_multi: u16,
    size_range: u16,
    mons_stat_table1: u32,
    main_rank_points: u32,
    kn: u32,
    sub_arank_points: u32,
    sub_brank_points: u32,
    monster_class_id: u8,
    // skip 4
    skip1: [u8; 4],
    little_mons_stat_table: u8,
    // skip 9
    skip2: [u8; 9],
    quest_kn0: u8,
    // skip 7
    skip3: [u8; 7],
    quest_kn1: u8,
    quest_kn2: u16,
    quest_kn3: u16,
    quantity: Quantity,
    unk3: u16,
    unk4: u16,
    unk5: u16,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct MainQuestProp {
    unk0: u8,
    unk1: u8,
    quest_locale_flags: u8,
    unk2: u8,
    ranking_id: u8,
    unk3: u8,
    unk4: u16,
    rank_band0: u16,
    untat_id: u8, // enum quest_type_id N,ka,zy,su,HC,HS,Rea,G
    skip1: u8,
    quest_fee: u32,
    reward_main: u32,
    deathtime: u32,
    reward_a: u16,
    skip2: [u8;2],
    reward_b: u16,
    hard_hunter_rank_req: u16,
    quest_time: u32,
    quest_map_only_monitor: u32, // map_id
    quest_strings_ptr: u32,
    unkk: u16,
    quest_id: u16,
    objectives: QuestObjective,
    unk6: u8,
    unk7: u8,
    join_rank_min: u16,
    join_rank_max: u16,
    post_rank_min: u16,
    post_rank_max: u16,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct Variants {
    monster_variant0: u8,
    monster_variant1: u8,
    monster_variant2: u8,
    map_variant0: u8,
    required_item_type: u16,
    required_item_count: u8,
    quest_variant1: u8,
    quest_variant2: u8,
    quest_variant3: u8,
    // quest_variant4: u8, // esse valor está pegando dado da struct ForcedEquipment
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct ForcedEquipment {
    legs: u16,
    legs_attach1: u16, // +0x80 for some reason
    legs_attach2: u16, // +0x80 for some reason
    legs_attach3: u16, // +0x80 for some reason
    weapon: u16,
    weapon_attach1or_bitmask: u16,
    weapon_attach2: u16,
    weapon_attach3: u16,
    head: u16,
    head_attach1: u16, // +0x80 for some reason
    head_attach2: u16, // +0x80 for some reason
    head_attach3: u16, // +0x80 for some reason
    chest: u16,
    chest_attach1: u16, // +0x80 for some reason
    chest_attach2: u16, // +0x80 for some reason
    chest_attach3: u16, // +0x80 for some reason
    arms: u16,
    arms_attach1: u16, // +0x80 for some reason
    arms_attach2: u16, // +0x80 for some reason
    arms_attach3: u16, // +0x80 for some reason
    waist: u16,
    waist_attach1: u16, // +0x80 for some reason
    waist_attach2: u16, // +0x80 for some reason
    waist_attach3: u16, // +0x80 for some reason

    unk: u32,

    // variant: Variants,
    // skip_variant: [u8;10],
    // allowed_equipment_bitmask: u32 // FF7F for none
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
struct RewardsFocus {
    exp_type_maybe: u32,
    main_rp_grp: u16,
    skip1: [u8;2],
    sub_a_rp_grp: u16,
    skip2: [u8;2],
    sub_b_rp_grp: u16,
    skip3: [u8;2],
    item1: u16,
    item2: u16,
    item3: u16,
    skip4: [u8;3],
    monster_id: u8
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestTypeFlags {
    gen_quest_prop: GenQuestProp,
    // skip 192
    // skip1: [u8;192],
    main_quest_prop: MainQuestProp,
    skip2: [u8;10],
    forced_equipement: ForcedEquipment,
    variants: Variants,
    allowed_equipment_bitmask: u32, // FF7F for none
    skip3: [u8;11],
    quest_clears_allowed: u32,
    quest_monster_icon: u8
}