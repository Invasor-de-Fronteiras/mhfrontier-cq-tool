import { PosInput } from "./PosInput";
import { LargeMonsterSpawn,  monster_options } from "../utils";
import { Select } from "./Select";
import { useMemo } from "react";

export function MonsterCard({ data,index }: { data: LargeMonsterSpawn, index: number }) {
  const monsterSelected = useMemo(() => monster_options.find(v => v.value === data.monster_id), [data.monster_id]);

  return (
    <div className="drop-shadow-sm border rounded px-3 py-2 flex flex-col flex-wrap gap-6 w-min">
      <div className="flex flex-col">
        <label>Monster</label>
        {/* className="border rounded p-2 w-full max-w-xs" */}
        <Select options={monster_options} value={monsterSelected} index={index} />
      </div>
      <fieldset>
        <legend>Position</legend>
        <div className="flex flex-row">
          <PosInput label="X" value={data.x_position} />
          <PosInput label="Y" value={data.y_position} />
          <PosInput label="Z" value={data.z_position} />
        </div>
      </fieldset>
    </div>
  );
}
