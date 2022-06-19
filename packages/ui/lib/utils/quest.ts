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
