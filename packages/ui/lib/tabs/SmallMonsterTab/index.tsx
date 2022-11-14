import { useState } from "react";
import { useWatch } from "react-hook-form";
import { Button } from "../../components/Button";
import { GroupCard } from "../../components/CardGroup";
import { InputField } from "../../components/Input";
import { useEditor } from "../../context/EditorContext";
import { findMap, findStage } from "../../utils";
import { MapSection } from "./MapSection";
import { SmallMonsterEdit, SmallMonsterIndex } from "./SmallMonsterEdit";

export function SmallMonsterTab() {
  const { form } = useEditor();
  const [selected, setSelected] = useState<SmallMonsterIndex | null>(null);
  const mapZones = useWatch({
    control: form.control,
    name: "map_zones.map_zones",
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
          const aStage = findStage(map, a.header.loaded_stage);
          const bStage = findStage(map, b.header.loaded_stage);
          if (!aStage || !bStage) return 0;

          return aStage.areaNumber - bStage.areaNumber;
        })
      );
    });
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
        />
      </GroupCard>
      <Button type="button" className="mt-5 mr-4" onClick={onReorder}>Reorder</Button>
      {mapZones.map((mapZone, mapZoneIndex) => <div className="flex flex-row flex-wrap gap-2">
        {mapZone.map_sections.map((map_section, mapSectionIndex) =>
          <MapSection
            mapSectionIndex={mapSectionIndex}
            mapZoneIndex={mapZoneIndex}
            onSelectSmallMonster={setSelected}
          />
        )}
        <hr/>
      </div>)}
    </div>
  );
}
