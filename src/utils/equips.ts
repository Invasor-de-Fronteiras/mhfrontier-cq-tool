import meleeData from './data/melee.json';
import rangeData from './data/range.json';
import headData from './data/head.json';
import chestData from './data/chest.json';
import armsData from './data/arms.json';
import waistData from './data/waist.json';
import legsData from './data/legs.json';
import { SelectOption } from '../components/Select';

export interface Equip {
    hex: number;
    english: string;
    japanese: string;
}

export interface WeaponEquip extends Equip {
    type: string;
}

export const meleeTypes = [
    'GS',
    'LS',
    'Hammer',
    'Gunlance',
    'Lance',
    'SnS',
    'DS',
    'HH',
    'Swaxe',
    'Tonfa',
    'Magspike',
]

export const rangeTypes = [
    'LBG',
    'HBG',
    'Bow',
]

export const equipeTypes = [...meleeTypes, ...rangeTypes];

export const melee: WeaponEquip[] = meleeData.map(v => ({ 
    hex: Number(`0x${v.Hex}`),
    english: v.English,
    japanese: v.Japanese,
    type: v.Type
}));

export const range: WeaponEquip[] = rangeData.map(v => ({ 
    hex: Number(`0x${v.Hex}`),
    english: v.English,
    japanese: v.Japanese,
    type: v.Type
}));

export const head_options: SelectOption[] = headData.map(v => ({ 
    value: Number(`0x${v.Hex}`),
    label: v.English
}));

export const chest_options: SelectOption[] = chestData.map(v => ({ 
    value: Number(`0x${v.Hex}`),
    label: v.English
}));

export const arms_options: SelectOption[] = armsData.map(v => ({ 
    value: Number(`0x${v.Hex}`),
    label: v.English
}));

export const waist_options: SelectOption[] = waistData.map(v => ({ 
    value: Number(`0x${v.Hex}`),
    label: v.English
}));

export const legs_options: SelectOption[] = legsData.map(v => ({ 
    value: Number(`0x${v.Hex}`),
    label: v.English
}));
