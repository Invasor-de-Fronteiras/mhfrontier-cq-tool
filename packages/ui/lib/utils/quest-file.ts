import { SelectOption } from "../components/Select";

export interface LargeMonsterPointers {
  unk_0: number;
  unk_1: number;
  large_monster_ids: number;
  large_monster_spawns: number;
  unk_2: number;
  unk_3: number;
  unk_4: number;
  unk_5: number;
}

export interface LargeMonsterSpawn {
  monster_id: number;
  unk1: number;
  unk2: number;
  unk3: number;
  spawn_amount: number;
  spawn_stage: number;

  // skip 16 bytes
  unk4: number;
  unk5: number;
  unk6: number;
  unk7: number;

  unk8: number;
  x_position: number;
  y_position: number;
  z_position: number;
  unk9: number;
  unk10: number;
  unk11: number;
  unk12: number;
}

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

export interface MapInfo {
  map_id: number;
  return_bc_id: number;
}

export interface QuestFile {
  header: QuestFileHeader;
  map_info:  MapInfo;
  large_monster_pointers: LargeMonsterPointers;
  large_monster_ids: number[];
  large_monster_spawns: LargeMonsterSpawn[]; // pub monster_spawn: LargeMonsterSpawn,
}

export const monsters = [
  "UNK",
  "Rathian",
  "Fatalis",
  "Kelbi",
  "Mosswine",
  "Bullfango",
  "Yian Kut-Ku",
  "Lao-Shan Lung",
  "Cephadrome",
  "Felyne",
  "Veggie Elder",
  "Rathalos",
  "Aptonoth",
  "Genprey",
  "Diablos",
  "Khezu",
  "Velociprey",
  "Gravios",
  "Felyne?",
  "Vespoid",
  "Gypceros",
  "Plesioth",
  "Basarios",
  "Melynx",
  "Hornetaur",
  "Apceros",
  "Monoblos",
  "Velocidrome",
  "Gendrome",
  "Rocks",
  "Ioprey",
  "Iodrome",
  "Pugis",
  "Kirin",
  "Cephalos",
  "Giaprey / Giadrome",
  "Crimson Fatalis",
  "Pink Rathian",
  "Blue Yian Kut-Ku",
  "Purple Gypceros",
  "Yian Garuga",
  "Silver Rathalos",
  "Gold Rathian",
  "Black Diablos",
  "White Monoblos",
  "Red Khezu",
  "Green Plesioth",
  "Black Gravios",
  "Daimyo Hermitaur",
  "Azure Rathalos",
  "Ashen Lao-Shan Lung",
  "Blangonga",
  "Congalala",
  "Rajang",
  "Kushala Daora",
  "Shen Gaoren",
  "Great Thunderbug",
  "Shakalaka",
  "Yama Tsukami",
  "Chameleos",
  "Rusted Kushala Daora",
  "Blango",
  "Conga",
  "Remobra",
  "Lunastra",
  "Teostra",
  "Hermitaur",
  "Shogun Ceanataur",
  "Bulldrome",
  "Anteka",
  "Popo",
  "White Fatalis",
  "Yama Tsukami",
  "Ceanataur",
  "Hypnocatrice",
  "Lavasioth",
  "Tigrex",
  "Akantor",
  "Bright Hypnoc",
  "Lavasioth Subspecies",
  "Espinas",
  "Orange Espinas",
  "White Hypnoc",
  "Akura Vashimu",
  "Akura Jebia",
  "Berukyurosu",
  "Cactus",
  "Gorge Objects",
  "Gorge Rocks",
  "Pariapuria",
  "White Espinas",
  "Kamu Orugaron",
  "Nono Orugaron",
  "Raviente",
  "Dyuragaua",
  "Doragyurosu",
  "Gurenzeburu",
  "Burukku",
  "Erupe",
  "Rukodiora",
  "Unknown",
  "Gogomoa",
  "Kokomoa",
  "Taikun Zamuza",
  "Abiorugu",
  "Kuarusepusu",
  "Odibatorasu",
  "Disufiroa",
  "Rebidiora",
  "Anorupatisu",
  "Hyujikiki",
  "Midogaron",
  "Giaorugu",
  "Mi Ru",
  "Farunokku",
  "Pokaradon",
  "Shantien",
  "Pokara",
  "Dummy",
  "Goruganosu",
  "Aruganosu",
  "Baruragaru",
  "Zerureusu",
  "Gougarf",
  "Uruki",
  "Forokururu",
  "Meraginasu",
  "Diorekkusu",
  "Garuba Daora",
  "Inagami",
  "Varusaburosu",
  "Poborubarumu",
  "Duremudira",
  "UNK",
  "Felyne",
  "Blue NPC",
  "UNK",
  "Cactus",
  "Veggie Elders",
  "Gureadomosu",
  "Harudomerugu",
  "Toridcless",
  "Gasurabazura",
  "Kusubami",
  "Yama Kurai",
  "Dure 3rd Phase",
  "Zinogre",
  "Deviljho",
  "Brachydios",
  "Berserk Laviente",
  "Toa Tesukatora",
  "Barioth",
  "Uragaan",
  "Stygian Zinogre",
  "Guanzorumu",
  "Deviljho",
  "UNK",
  "Egyurasu",
  "Voljang",
  "Nargacuga",
  "Keoaruboru",
  "Zenaserisu",
  "Gore Magala",
  "Blinking Nargacuga",
  "Shagaru Magala",
  "Amatsu",
  "Eruzerion",
  "Musou Dure",
  "Rocks",
  "Seregios",
  "Bogabadorumu",
  "Unknown Blue Barrel",
  "Musou Bogabadorumu",
  "Costumed Uruki",
  "Musou Zerureusu",
  "PSO2 Rappy",
  "King Shakalaka",
];


export const monster_options: SelectOption[] = monsters.map((monster, index) => ({
  label: monster,
  value: index,
}));