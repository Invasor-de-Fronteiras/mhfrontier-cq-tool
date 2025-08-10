import { SelectOption } from "../components/Select";

export const quest_type = [
  "N (LR)",
  "ka (HR)",
  "zy",
  "su (HR5+)",
  "HC (HR5+)",
  "HS (HR5+)",
  "Rea (HR6)",
  "G (GR/Z)",
];

export const quest_type_options: SelectOption[] = quest_type.map(
  (type, index) => ({
    label: type,
    value: index,
  }));


export const quest_category = [
  { label: "Campaign(HR)", value: 0x09 },
  { label: "Great Slaying", value: 0x10 },
  { label: "DivaDefense", value: 0x11 },
  { label: "Event(HR)", value: 0x12 },
  { label: "Great Slaying", value: 0x16 },
  { label: "Series", value: 0x18 },
  { label: "Daily", value: 0x1A },
  { label: "Event(GSR)", value: 0x1C },
  { label: "Emergency(?)", value: 0x1F },
  { label: "Exotic", value: 0x26 },
  { label: "Exotic(GSR★8)", value: 0x27 },
  { label: "Great Slaying(GSR)", value: 0x28 },
  { label: "Zenith", value: 0x2B },
  { label: "Diva defence", value: 0x2E },
  { label: "Keo(?)", value: 0x30 },
  { label: "Great Slaying Support(GSR)", value: 0x32 },
  { label: "Great Slaying Support(GSR)", value: 0x33 },
  { label: "Superior", value: 0x34 },
  { label: "Superior(GSR)", value: 0x35 },
  { label: "Weapon/Armor Quest(GSR)", value: 0x36 },
];

export const getQuestCategory = (id: number): string => {
  const category = quest_category.find(v => v.value === id);
  return category?.label || '???';
}

export const quest_mark = [
  "None",
  "Recommended",
  "New",
  "Refine",
].map((v, i) => ({ label: v, value: i }));

export const getQuestMark = (id: number) => quest_mark[id]?.label || '???';


export const locale_flags = [
  { value: 0, label: "Based on season and daytime in town." },
  { value: 10, label: "Warm/Day" },
  { value: 18, label: "Warm/Night" },
  { value: 12, label: "Cold/Day" },
  { value: 20, label: "Cold/Night" },
  { value: 9, label: "Breeding/Day" },
  { value: 17, label: "Breeding/Night" },
  { value: 64, label: "Based on season and daytime in town." },
  { value: 74, label: "Warm/Day/Master" },
  { value: 82, label: "Warm/Night/Master" },
  { value: 76, label: "Cold/Day/Master" },
  { value: 84, label: "Cold/Night/Master" },
  { value: 73, label: "Breed/Day/Master" },
  { value: 81, label: "Breed/Night/Master" },
  { value: 209, label: "Breed/Day/Master" },
  { value: 26, label: "Warm/Day" },
  { value: 90, label: "Warm/Day/Master" },
  { value: 201, label: "Breed/Day/Master" }
]

export const requirement_to_finish_quest = [
  { value: 0, label: "None" },
  { value: 1, label: "Main Objective / Exit with Subquest allowed" },
  { value: 2, label: "Main Objective / Exit with Subquest not allowed" },
  { value: 3, label: "Main Objective + Sub A" },
  { value: 4, label: "All Objectives" },
]