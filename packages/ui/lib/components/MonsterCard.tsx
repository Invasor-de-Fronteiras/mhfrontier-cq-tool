import React, { useMemo } from "react";
import { PosInput } from "./PosInput";
import { LargeMonsterSpawn, monster_options } from "../utils";
import { Select, SelectOption } from "./Select";
import { MapPreview } from "./MapPreview";
import { useEditor } from "../context/EditorContext";
import { Input } from "./Input";

interface Stage {
  value: number;
  label: string;
}
export interface MonsterCardProps {
  data: LargeMonsterSpawn;
  stages: Stage[];
  onChange: (value: LargeMonsterSpawn) => void;
  onChangeVariant?: (value: number) => void;
  variant?: number;
}

export function MonsterCard({ data, stages, onChange, onChangeVariant, variant }: MonsterCardProps) {
  const { data: file } = useEditor();

  const monsterSelected = useMemo(
    () => monster_options.find((monster) => monster.value === data.monster_id),
    [data.monster_id]
  );
  const stageSelected = useMemo(
    () => stages.find((stage) => stage.value === data.spawn_stage),
    [data.spawn_stage, stages]
  );

  const changeVal = (key: keyof LargeMonsterSpawn) => (val: number) => {
    onChange({
      ...data,
      [key]: parseInt(String(val), 10),
    });
  };

  const change =
    (key: keyof LargeMonsterSpawn) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      changeVal(key)(parseInt(event.target.value, 10));
    };

  const handleChangeMonster = (option: SelectOption | null) => {
    if (!option) {
      onChange({
        ...data,
        monster_id: 65535,
      });
      return;
    }

    onChange({
      ...data,
      monster_id: option.value,
    });
  };

  const handleChangeStage = (option: Stage | null) => {
    if (!option) {
      onChange({
        ...data,
        spawn_stage: 0,
      });
      return;
    }

    onChange({
      ...data,
      spawn_stage: option.value,
    });
  };

  return (
    <div className="drop-shadow-sm border rounded px-3 py-2 flex flex-col flex-wrap items-center gap-6 w-full max-w-sm">
      <Select
        label="Monster"
        options={monster_options}
        isClearable
        onChange={(v) => handleChangeMonster(v)}
        value={monsterSelected}
      />
      <Select
        label="Area"
        options={stages}
        isClearable
        onChange={(v) => handleChangeStage(v)}
        value={stageSelected}
      />
      <div className="flex flex-wrap">
        <fieldset className="flex flex-row gap-2">
          <legend>Position</legend>
          <div className="flex flex-col flex-wrap">
            <PosInput
              label="X"
              onChange={change("x_position")}
              value={data.x_position}
            />
            <PosInput
              label="Y"
              onChange={change("y_position")}
              value={data.y_position}
            />
            <PosInput
              label="Z"
              onChange={change("z_position")}
              value={data.z_position}
            />
          </div>
          <MapPreview
            mapId={file!.map_info.map_id}
            areaId={data.spawn_stage}
            objects={[
              {
                id: data.monster_id,
                x: data.x_position,
                y: data.z_position,
              },
            ]}
            onChange={(obj) =>
              onChange({
                ...data,
                x_position: obj.x,
                z_position: obj.y,
              })
            }
          />
        </fieldset>
        <fieldset className="flex flex-row mb-3 mt-3">
          <Input
            label="Amount"
            type="number"
            onChange={change("spawn_amount")}
            value={data.spawn_amount}
          />
          {onChangeVariant && <Input
            label="Monster variant"
            type="number"
            onChange={event => onChangeVariant(parseInt(event.target.value, 10))}
            value={variant}
          />}
        </fieldset>
      </div>
    </div>
  );
}
