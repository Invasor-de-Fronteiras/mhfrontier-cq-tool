import React, { useContext, useMemo } from "react";
import { PosInput } from "./PosInput";
import { LargeMonsterSpawn,  monster_options } from "../../utils";
import { Select } from "./Select";
import { maps } from "../../utils/maps";

interface Stage {
  value: number;
  label: string;
}
export interface MonsterCardProps {
  data: LargeMonsterSpawn;
  stages: Stage[];
  onChange: (value: LargeMonsterSpawn) => void;
  index: number;
}

type Option = {
  label: string;
  value: number
}

export function MonsterCard({ data, stages, onChange, index }: MonsterCardProps) {

  const monsterSelected = useMemo(() => monster_options.find(monster => monster.value === data.monster_id), [data.monster_id]);
  const stageSelected = useMemo(() => stages.find(stage => stage.value === data.spawn_stage), [data.spawn_stage]);

  const change = (key: keyof LargeMonsterSpawn) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(`${key} => ${event.target.value}`);
      onChange({
        ...data,
        [key]: parseInt(event.target.value, 10)
      });
  }

  const changeMonster = (option: Option | null) => {
    if (!option) {
      onChange({
        ...data,
        monster_id: 255
      });
      return;
    }

    onChange({
      ...data,
      monster_id: option.value
    });
  }

  const changeStage = (option: Stage | null) => {
    if (!option) return;

    onChange({
      ...data,
      spawn_stage: option.value
    });
  }

  return (
    <div className="drop-shadow-sm border rounded px-3 py-2 flex flex-col flex-wrap gap-6 w-min">
      <div className="flex flex-col">
        <label>Monster</label>
        {/* className="border rounded p-2 w-full max-w-xs" */}
        <Select options={monster_options} onChange={v => changeMonster(v)} value={monsterSelected} index={index} />
      </div>
      <div className="flex flex-col">
        <label>Area</label>
        {/* className="border rounded p-2 w-full max-w-xs" */}
        <Select options={stages} onChange={v => changeStage(v)} value={stageSelected} index={index} />
      </div>
      <fieldset>
        <legend>Position</legend>
        <div className="flex flex-row">
          <PosInput label="X" onChange={change('x_position')} value={data.x_position} />
          <PosInput label="Y" onChange={change('y_position')} value={data.y_position} />
          <PosInput label="Z" onChange={change('z_position')} value={data.z_position} />
        </div>
      </fieldset>
    </div>
  );
}
