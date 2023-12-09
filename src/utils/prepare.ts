import { QuestFile } from "./questFile";
import { MapZones } from "./questFile/mapZones";

export const prepareMapZones = (mapZones: MapZones) => {
    mapZones.map_zones.forEach(mapZone => {
        mapZone.map_sections.forEach(mapSection => {
            const monsterIds = mapSection.small_monster_spawns.reduce<Record<number, boolean>>((acc, cur) => {
                acc[cur.monster_id] = true;
                return acc;
            }, {});

            mapSection.monster_ids = Object.keys(monsterIds).map(v => parseInt(v, 10));
        })
    });

    return mapZones;
}

export const prepareQuest = (quest: QuestFile): QuestFile => ({
    header: quest.header,
    gen_quest_prop: quest.gen_quest_prop,
    quest_type_flags: quest.quest_type_flags,
    map_info: quest.map_info,
    map_zones: prepareMapZones(quest.map_zones),
    large_monster_pointers: quest.large_monster_pointers,
    large_monster_spawns: quest.large_monster_spawns,
    large_monster_ids: quest.large_monster_spawns.map((v) =>
        v.monster_id >= 255 ? 0 : v.monster_id
    ),
    rewards: quest.rewards,
    supply_items: quest.supply_items,
    loaded_stages: quest.loaded_stages,
    strings: quest.strings,
    unk_data: quest.unk_data
});