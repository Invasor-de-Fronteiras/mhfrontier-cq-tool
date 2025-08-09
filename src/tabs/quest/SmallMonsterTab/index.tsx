import { useState } from "react";
import { useWatch } from "react-hook-form";
import { Button } from "../../../components/Button";
import { GroupCard } from "../../../components/CardGroup";
import { InputField } from "../../../components/Input";
import { useQuestEditor } from "../../../context/QuestEditorContext";
import { findMap } from "../../../utils";
import { MapSection } from "./MapSection";
import { SmallMonsterEdit, SmallMonsterIndex } from "./SmallMonsterEdit";

export function SmallMonsterTab() {
  const { form } = useQuestEditor();
  const [selected, setSelected] = useState<SmallMonsterIndex | null>(null);
  const mapZones = useWatch({
    control: form.control,
    name: "map_zones.map_zones",
  });
  const mapZonePtrs = useWatch({
    control: form.control,
    name: "map_zones.map_zone_ptrs",
  });
  const mapId = useWatch({ control: form.control, name: "map_info.map_id" });

  const onReorder = () => {
    if (!mapId) return;
    const map = findMap(mapId);
    if (!map) return;

    mapZones.map((mapZone, mapZoneIndex) => {
      form.setValue(
        `map_zones.map_zones.${mapZoneIndex}.map_sections`,
        mapZone.map_sections.sort((a, b) => {
          const aStage = map.stages.findIndex(v => v.id === a.header.loaded_stage);
          const bStage =  map.stages.findIndex(v => v.id === b.header.loaded_stage);
          if (aStage === -1 || bStage === -1) return 0;

          return aStage - bStage;
        })
      );
    });
  }

  const onAddZone = () => {
      const lastOne = mapZonePtrs.length > 0 ? Math.max(...mapZonePtrs) : 0;
      form.setValue(
        `map_zones.map_zones`,
        [
          ...mapZones,
          {
            map_sections: [],
            map_zone_ptr: lastOne + 1,
            unk0: 0,
            unk1: 0,
            unk2: 0,
            unk3: 0,
          }
        ]
      );

      form.setValue(
        `map_zones.map_zone_ptrs`,
        [
          ...mapZonePtrs,
          lastOne + 1
        ]
      );
  }

  const onRemoveZone = (index: number) => {
    const zone = mapZones[index];
    form.setValue(
      `map_zones.map_zones`,
      mapZones.filter((v) => v.map_zone_ptr !== zone.map_zone_ptr)
    );

    form.setValue(
      `map_zones.map_zone_ptrs`,
      mapZonePtrs.filter((v) => v !== zone.map_zone_ptr)
    );
  }

  const onAddSection = (zone: number) => {
    const map = findMap(mapId);
    if (!map) return;

    form.setValue(
      `map_zones.map_zones.${zone}.map_sections`,
      [
        ...mapZones[zone].map_sections,
        {
          header: {
            loaded_stage: map.stages[0].id,
            spawn_stats_ptr: 0,
            spawn_types_ptr: 0,
            unk0: 0
          },
          monster_ids: [],
          small_monster_spawns: []
        }
      ]
    );
  }

  const onRemoveSection = (zone: number, section: number) => {
    form.setValue(
      `map_zones.map_zones.${zone}.map_sections`,
      mapZones[zone].map_sections.filter((v, i) => i !== section)
    );
  }

  if (selected) return <SmallMonsterEdit
    mapSectionIndex={selected.mapSectionIndex}
    mapZoneIndex={selected.mapZoneIndex}
    monsterIndex={selected.monsterIndex}
    onClose={() => setSelected(null)}
  />;

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <GroupCard title="Monsters">
        <InputField
          label="Small Monster Status table"
          type="number"
          name="gen_quest_prop.little_mons_stat_table"
          control={form.control}
        />
      </GroupCard>
      <Button type="button" className="mt-5 mr-4" onClick={onReorder}>Reorder</Button>
      {mapZones.map((mapZone, mapZoneIndex) => 
        <GroupCard title={`Zone ${mapZoneIndex + 1}`} className="relative">
          <Button type="button" className="mt-5 mr-4 mb-2 absolute right-0 top-0" onClick={() => onRemoveZone(mapZoneIndex)}>Remove Zone</Button>
          <div className="flex flex-row flex-wrap w-full gap-2 mt-6">
            {mapZone.map_sections.map((map_section, mapSectionIndex) =>
              <MapSection
                mapSectionIndex={mapSectionIndex}
                mapZoneIndex={mapZoneIndex}
                onSelectSmallMonster={setSelected}
                onRemoveSection={onRemoveSection}
              />
            )}
          </div>
          <Button type="button" className="mt-5 mr-4 mb-2" onClick={() => onAddSection(mapZoneIndex)}>Add Section</Button>
        </GroupCard>
      )}
      <Button type="button" className="mt-5 mr-4" onClick={onAddZone}>Add Zone</Button>
    </div>
  );
}
