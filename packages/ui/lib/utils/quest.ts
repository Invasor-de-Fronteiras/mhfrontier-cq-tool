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
