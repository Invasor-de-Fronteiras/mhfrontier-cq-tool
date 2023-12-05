import { useWatch } from "react-hook-form";
import { Button } from "../../../components/Button";
import { GroupCard } from "../../../components/CardGroup";
import { InputField } from "../../../components/Input";
import { SelectField } from "../../../components/Select";
import { UnknownField } from "../../../components/UnknownFields";
import { useEditor } from "../../../context/EditorContext";
import { monster_options } from "../../../utils";

export interface SmallMonsterIndex {
  mapZoneIndex: number;
  mapSectionIndex: number;
  monsterIndex: number;
}

export interface SmallMonsterEditProps {
  mapZoneIndex: number;
  mapSectionIndex: number;
  monsterIndex: number;
  onClose: () => void;
}

export function SmallMonsterEdit({
  mapZoneIndex,
  mapSectionIndex,
  monsterIndex,
  onClose
}: SmallMonsterEditProps) {
  const { form } = useEditor();

  const data = useWatch({
    control: form.control,
    name: `map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}`
  });

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Button
        type="button"
        onClick={onClose}
      >
        Back
      </Button>
      <GroupCard title="Small Monster">
        <SelectField
          label="Monster"
          options={monster_options}
          isClearable
          onClearValue={65535}
          control={form.control}
          className="min-w-[200px] mt-3"
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}.monster_id`}
        />

        <InputField
          label="Monster Id"
          type="number"
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}.monster_id`}
        />
        <InputField
          label="Position X"
          type="number"
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}.x_position`}
        />
        <InputField
          label="Position Y"
          type="number"
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}.y_position`}
        />
        <InputField
          label="Position Z"
          type="number"
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}.z_position`}
        />
        <InputField
          label="Spawn amount"
          type="number"
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}.spawn_amount`}
        />
        <InputField
          label="Spawn toggle"
          type="number"
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}.spawn_toggle`}
        />
        <InputField
          label="Size"
          type="number"
          name={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}.size`}
        />
      </GroupCard>
      <GroupCard title="Unknown Data">
        <UnknownField
          name="All data"
          path={`map_zones.map_zones.${mapZoneIndex}.map_sections.${mapSectionIndex}.small_monster_spawns.${monsterIndex}`}
          data={data}
          control={form.control}
          initialHide
        />
      </GroupCard>
    </div>
  );
}
