import { QuestTypeFlags } from "./questFile";
import { QuestInfo } from "./questlist";

export enum PERIOD {
    DAY = 'DAY',
    NIGHT = 'NIGHT',
}

export enum SEASON {
    WARM = 'WARM',
    COLD = 'COLD',
    BREED = 'BREED',
}

export const getPeriotFromQuestTypeFlags = (questTypeFlags: QuestTypeFlags): string => {
    const { main_quest_prop } = questTypeFlags;
    if ((main_quest_prop.quest_locale_flags & 0b1000) > 0) {
        return 'd';
    }

    return 'n';
}

export const getSeasonFromQuestTypeFlags = (questTypeFlags: QuestTypeFlags): number => {
    const { main_quest_prop } = questTypeFlags;

    if ((main_quest_prop.quest_locale_flags & 0b010) > 0) {
        return 0;
    }

    if ((main_quest_prop.quest_locale_flags & 0b001) > 0) {
        return 2;
    }

    return 1;
}

export const periodToString = (period: PERIOD): string => {
    if (period === PERIOD.DAY) return 'd';

    return 'n';
}

export const seasonToNumber = (season: SEASON): number => {
    if (season === SEASON.WARM) return 0;
    if (season === SEASON.COLD) return 1;
    return 2;
}

export interface QuestDB {
    quest_id: number;
    period: PERIOD,
    season: SEASON,
    title: string;
    main_objective: string;
    sub_a_objective: string;
    sub_b_objective: string;
    reward_item1: number;
    reward_item2: number;
    reward_item3: number;
}

export interface QuestBinDB {
    quest_id: number;
    period: PERIOD,
    season: SEASON,
    quest_bin: number[];
}

export interface QuestDBQueryOptions {
    page?: number;
    per_page?: number;
    quest_id?: number;
    period?: PERIOD;
    season?: SEASON;
    title?: string;
    main_objective?: string;
    sub_a_objective?: string;
    sub_b_objective?: string;
    reward_item1?: number;
    reward_item2?: number;
    reward_item3?: number;
}

export interface QuestlistDB {
    enable: boolean;
    quest_id: number;
    period: PERIOD,
    season: SEASON,
    category: number;
    title: string;
    position: number;
    only_dev: boolean;
}

export interface QuestlistBinDB {
    enable: boolean;
    quest_id: number;
    period: PERIOD,
    season: SEASON,
    category: number;
    title: string;
    position: number;
    only_dev: boolean;
    questlist_bin: number[];
}

export interface QuestlistDBWithInfo {
    enable: boolean;
    quest_id: number;
    period: PERIOD,
    season: SEASON,
    category: number;
    title: string;
    position: number;
    only_dev: boolean;
    quest_info: QuestInfo;
}

export interface QuestlistDBOptions {
    position: number;
    enable: boolean;
    only_dev: boolean;
}

export interface QuestlistDBQueryOptions {
    page?: number;
    per_page?: number;
    quest_id?: number;
    period?: PERIOD;
    season?: SEASON;
    title?: string;
    category?: number;
    enable?: boolean;
    only_dev?: boolean;
    position?: number;
}
