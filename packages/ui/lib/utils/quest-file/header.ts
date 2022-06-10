export interface QuestFileHeader {
  quest_type_ptr: number;
  loaded_stages_ptr: number;
  supply_box_ptr: number;
  reward_ptr: number;
  sub_supply_box_ptr: number;
  unk0: number;
  sub_supply_box_len: number;
  quest_area_ptr: number;
  large_monster_ptr: number;
  area_change: number;
  area_maping: number;
  map_info: number;
  gather_points: number;
  base_camp_inf: number;
  some_strings: number;
  fixed_cords1: number;
  gathering_pointers: number;
  fixed_cords2: number;
  fixed_inf: number;
}
