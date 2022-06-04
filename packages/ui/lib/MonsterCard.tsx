import { PosInput } from "./PosInput";
import { LargeMonsterSpawn, monsters } from "../utils";

export function MonsterCard({ data }: { data: LargeMonsterSpawn }) {
  return (
    <div className="drop-shadow-sm border rounded px-3 py-2 flex flex-col flex-wrap gap-6 w-min">
      <div className="flex flex-col">
        <label>Monster</label>
        <select
          value={data.monster_id}
          className="border rounded p-2 w-full max-w-xs"
        >
          <option>Select a monster</option>
          {monsters.map((monster, i) => (
            <option key={monster} value={i}>
              {monster}
            </option>
          ))}
        </select>
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
