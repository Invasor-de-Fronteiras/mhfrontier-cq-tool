import itemsData from "./items-data.json";

export interface Item {
  id: 0;
  name_jp: string;
  name_en: string;
  hex: string;
  dec: number;
}

export const items: Item[] = itemsData;
