use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct Objective {
    pub quest_objective: u32,
    pub monster_id: u8,
    pub unk: u8,
    pub quantity: u16,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestObjective {
    pub objective1: Objective,
    pub objective2: Objective,
    pub objective3: Objective,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct Quantity {
    pub gathering_tables_qty: u16,
    pub unk0: u16,
    pub area1zones: u8,
    pub area2zones: u8,
    pub area3zones: u8,
    pub area4zones: u8,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct MainQuestProp {
    pub unk0: u8,
    pub unk1: u8,
    pub quest_locale_flags: u8, // season / daytime
    pub unk2: u8,
    pub ranking_id: u8,
    pub unk3: u8,
    pub course: u16,
    pub rank_band0: u16,
    pub untat_id: u8, // enum quest_type_id N,ka,zy,su,HC,HS,Rea,G
    pub skip1: u8,
    pub quest_fee: u32,
    pub reward_main: u32,
    pub max_death: u8,
    pub unk9: u8,
    pub unk10: u8,
    pub unk11: u8,
    pub reward_a: u16,
    pub skip2: [u8; 2],
    pub reward_b: u16,
    pub hard_hunter_rank_req: u16,
    pub quest_time: u32,
    pub quest_map_only_monitor: u32, // map_id
    pub quest_strings_ptr: u32,
    pub unkk: u16,
    pub quest_id: u16,
    pub objectives: QuestObjective,
    pub unk6: u8,
    pub unk7: u8,
    pub join_rank_min: u16,
    pub join_rank_max: u16,
    pub post_rank_min: u16,
    pub post_rank_max: u16,
    pub unk12: u8,
    pub unk13: u8,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct Variants {
    pub monster_variant0: u8,
    pub monster_variant1: u8,
    pub monster_variant2: u8,
    pub map_variant0: u8,
    pub required_item_type: u16,
    pub required_item_count: u8,
    pub quest_variant1: u8,
    pub quest_variant2: u8,
    pub quest_variant3: u8,
    pub quest_variant4: u8, // esse valor está pegando dado da struct ForcedEquipment
    pub unk1: u8,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct ForcedEquipment {
    pub legs: u16,
    pub legs_attach1: u16, // +0x80 for some reason
    pub legs_attach2: u16, // +0x80 for some reason
    pub legs_attach3: u16, // +0x80 for some reason
    pub weapon: u16,
    pub weapon_attach1or_bitmask: u16,
    pub weapon_attach2: u16,
    pub weapon_attach3: u16,
    pub head: u16,
    pub head_attach1: u16, // +0x80 for some reason
    pub head_attach2: u16, // +0x80 for some reason
    pub head_attach3: u16, // +0x80 for some reason
    pub chest: u16,
    pub chest_attach1: u16, // +0x80 for some reason
    pub chest_attach2: u16, // +0x80 for some reason
    pub chest_attach3: u16, // +0x80 for some reason
    pub arms: u16,
    pub arms_attach1: u16, // +0x80 for some reason
    pub arms_attach2: u16, // +0x80 for some reason
    pub arms_attach3: u16, // +0x80 for some reason
    pub waist: u16,
    pub waist_attach1: u16, // +0x80 for some reason
    pub waist_attach2: u16, // +0x80 for some reason
    pub waist_attach3: u16, // +0x80 for some reason

    pub unk: u32,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct RewardsFocus {
    pub exp_type_maybe: u32,
    pub main_rp_grp: u32,
    pub sub_a_rp_grp: u32,
    pub sub_b_rp_grp: u32,
    pub item1: u16,
    pub item2: u16,
    pub item3: u16,
    pub skip4: [u8; 3],
    pub monster_icon1: u8,
    pub monster_icon2: u8,
    pub monster_icon3: u8,
    pub monster_icon4: u8,
    pub monster_icon5: u8,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct GenQuestProp {
    pub big_monster_size_multi: u16,
    pub size_range: u16,
    pub mons_stat_table1: u32,
    pub main_rank_points: u32,
    pub kn: u32,
    pub sub_arank_points: u32,
    pub sub_brank_points: u32,
    pub monster_class_id: u8,
    // skip 4
    pub skip1: [u8; 4],
    pub little_mons_stat_table: u8,
    // skip 9
    pub skip2: [u8; 9],
    pub quest_kn0: u8,
    // skip 7
    pub skip3: [u8; 7],
    pub quest_kn1: u8,
    pub quest_kn2: u16,
    pub quest_kn3: u16,
    pub quantity: Quantity,
    pub unk3: u16,
    pub unk4: u16,
    pub unk5: u16,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestTypeFlags {
    pub main_quest_prop: MainQuestProp,
    pub skip1: [u8; 8],
    pub forced_equipement: ForcedEquipment,
    pub variants: Variants,
    pub allowed_equipment_bitmask: u32, // FF7F for none
    pub rewards_focus: RewardsFocus,
    pub skip3: [u8; 8],
    pub quest_clears_allowed: u32,
    pub quest_monster_icon: u8,
}

impl QuestTypeFlags {
    pub fn get_periot(&self) -> char {
        if (self.main_quest_prop.quest_locale_flags & 0b1000) > 0 {
            return 'd';
        }

        'n'
    }

    pub fn get_season(&self) -> u8 {
        if self.main_quest_prop.quest_locale_flags & 0b010 > 0 {
            return 0;
        }

        if self.main_quest_prop.quest_locale_flags & 0b001 > 0 {
            return 2;
        }

        return 1;
    }
}
