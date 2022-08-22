import { QuestInfo } from "./questInfo";

export interface QuestlistHeader {
    unk0: number;
    quest_count: number;
    unk1: number;
    unk2: number;
    unk3: number;
}

export interface QuestlistFile {
    filename: string;
    header: QuestlistHeader[];
    quests: QuestInfo[];
}