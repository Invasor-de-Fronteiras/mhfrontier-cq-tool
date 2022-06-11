import { SelectOption } from '../components/Select';
import itemsData from './data/items.json';

export interface Item {
    id: number,
    name_jp: string,
    name_en: string,
    hex: string,
    dec: number
}

export const items: Item[] = itemsData;

export const item_options: SelectOption[] = items.map((item) => ({
    label: item.name_en, //`${item.name_en} / ${item.name_jp}`,
    value: item.id,
}));