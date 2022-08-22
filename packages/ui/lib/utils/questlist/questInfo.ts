import { QuestTypeFlags } from "../quest-file";
import { QuestStrings } from "../quest-file/questStrings";


export interface QuestInfoHeader {
    unk0: number[];
    max_players: number;
    quest_category: number;
    unk1: number[];
    mark: number;
    unk2: number;
    unk3: number;
    length_msb: number;
    length_lsb: number;
}


export interface QuestInfo {
    header: QuestInfoHeader,
    quest_type_flags: QuestTypeFlags,
    unk_data: number[], // 112 bytes
    strings: QuestStrings
}
