import { GenQuestProp } from './genQuestProp';
import { QuestFileHeader } from './header';
import { MapInfo } from './map';
import { LargeMonsterPointers, LargeMonsterSpawn } from './monsters';
import { QuestTypeFlags } from './questTypeFlags';
import { RewardTable } from './reward';

export * from "./header";
export * from "./genQuestProp";
export * from "./questTypeFlags";
export * from "./map";
export * from "./monsters";

export interface QuestFile {
    header: QuestFileHeader;
    map_info:  MapInfo;
    gen_quest_prop: GenQuestProp,
    quest_type_flags: QuestTypeFlags,
    large_monster_pointers: LargeMonsterPointers;
    large_monster_ids: number[];
    large_monster_spawns: LargeMonsterSpawn[];
    rewards: RewardTable[];
}