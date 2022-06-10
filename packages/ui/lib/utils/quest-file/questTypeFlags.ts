export interface Objective {
  quest_objective: number;
  monster_id: number;
  unk: number;
  quantity: number;
}

export interface QuestObjective {
  objective1: Objective;
  objective2: Objective;
  objective3: Objective;
}

export interface MainQuestProp {
  unk0: number;
  unk1: number;
  quest_locale_flags: number;
  unk2: number;
  ranking_id: number;
  unk3: number;
  unk4: number;
  rank_band0: number;
  untat_id: number;
  skip1: number;
  quest_fee: number;
  reward_main: number;
  max_death: number;
  unk9: number;
  unk10: number;
  unk11: number;
  reward_a: number;
  skip2: number[];
  reward_b: number;
  hard_hunter_rank_req: number;
  quest_time: number;
  quest_map_only_monitor: number;
  quest_strings_ptr: number;
  unkk: number;
  quest_id: number;
  objectives: QuestObjective;
  unk6: number;
  unk7: number;
  join_rank_min: number;
  join_rank_max: number;
  post_rank_min: number;
  post_rank_max: number;
}

export interface Variants {
  monster_variant0: number;
  monster_variant1: number;
  monster_variant2: number;
  map_variant0: number;
  required_item_type: number;
  required_item_count: number;
  quest_variant1: number;
  quest_variant2: number;
  quest_variant3: number;
  // quest_variant4: number;
}

export interface ForcedEquipment {
  legs: number;
  legs_attach1: number;
  legs_attach2: number;
  legs_attach3: number;
  weapon: number;
  weapon_attach1or_bitmask: number;
  weapon_attach2: number;
  weapon_attach3: number;
  head: number;
  head_attach1: number;
  head_attach2: number;
  head_attach3: number;
  chest: number;
  chest_attach1: number;
  chest_attach2: number;
  chest_attach3: number;
  arms: number;
  arms_attach1: number;
  arms_attach2: number;
  arms_attach3: number;
  waist: number;
  waist_attach1: number;
  waist_attach2: number;
  waist_attach3: number;

  unk: number;
}

export interface RewardsFocus {
  exp_type_maybe: number;
  main_rp_grp: number;
  skip1: number[];
  sub_a_rp_grp: number;
  skip2: number[];
  sub_b_rp_grp: number;
  skip3: number[];
  item1: number;
  item2: number;
  item3: number;
  skip4: number[];
  monster_id: number;
}

export interface QuestTypeFlags {
  main_quest_prop: MainQuestProp;
  skip1: number[];
  forced_equipement: ForcedEquipment;
  variants: Variants;
  allowed_equipment_bitmask: number;
  rewards_focus: RewardsFocus;
  skip3: number[];
  quest_clears_allowed: number;
  quest_monster_icon: number;
}
