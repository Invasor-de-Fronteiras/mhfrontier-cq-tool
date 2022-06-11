import { useMemo } from "react";
import { PosInputField } from "./PosInput";
import { monster_options } from "../utils";
import { SelectField } from "./Select";
import { MapPreview } from "./MapPreview";
import { useEditor } from "../context/EditorContext";
import { InputField } from "./Input";
import { GrClose } from "react-icons/gr";
import { useWatch } from "react-hook-form";

interface Stage {
  value: number;
  label: string;
}
export interface MonsterCardProps {
  stages: Stage[];
  onClose: () => void;
  index: number;
}

export function MonsterCard({ stages, onClose, index }: MonsterCardProps) {
  const { form } = useEditor();
  const mapId = useWatch({ control: form.control, name: "map_info.map_id" });
  const data = useWatch({
    name: `large_monster_spawns.${index}`,
    control: form.control,
  });

  const monsterSelected = useMemo(
    () =>
      monster_options.find(
        (monster) => monster.value === data.monster_id
      ),
    [data.monster_id]
  );
  const stageSelected = useMemo(
    () => stages.find((stage) => stage.value === data.spawn_stage),
    [data.spawn_stage, stages]
  );

  return (
    <div className="drop-shadow-sm border bg-white dark:bg-slate-800 rounded px-3 py-2 flex flex-col flex-wrap items-center gap-6 w-full max-w-sm">
      <GrClose
        className="self-end hover:cursor-pointer dark:text-white"
        onClick={onClose}
      />
      <SelectField
        label="Monster"
        options={monster_options}
        isClearable
        control={form.control}
        name={`large_monster_spawns.${index}.monster_id`}
        value={monsterSelected}
      />
      <SelectField
        label="Area"
        options={stages}
        isClearable
        control={form.control}
        name={`large_monster_spawns.${index}.spawn_stage`}
        value={stageSelected}
      />
      <div className="flex flex-wrap">
        <fieldset className="flex flex-row gap-2">
          <legend className="dark:text-white">Position</legend>
          <div className="flex flex-col flex-wrap">
            <PosInputField
              label="X"
              name={`large_monster_spawns.${index}.x_position`}
            />
            <PosInputField
              label="Y"
              name={`large_monster_spawns.${index}.y_position`}
            />
            <PosInputField
              label="Z"
              name={`large_monster_spawns.${index}.z_position`}
            />
          </div>
          <MapPreview
            mapId={mapId}
            areaId={data.spawn_stage}
            objects={[
              {
                id: data.monster_id,
                x: data.x_position,
                y: data.z_position,
              },
            ]}
            onChange={(obj) =>
              form.setValue(`large_monster_spawns.${index}`, {
                ...data,
                x_position: obj.x,
                z_position: obj.y,
              })
            }
          />
        </fieldset>
        <fieldset className="flex flex-row mb-3 mt-3">
          <InputField
            label="Amount"
            type="number"
            name={`large_monster_spawns.${index}.spawn_amount`}
          />
          {index >= 0 && index <= 2 && (
            <InputField
              label="Monster variant"
              type="number"
              name={`quest_type_flags.variants.monster_variant${
                index as 0 | 1 | 2
              }`}
            />
          )}
        </fieldset>
      </div>
    </div>
  );
}
