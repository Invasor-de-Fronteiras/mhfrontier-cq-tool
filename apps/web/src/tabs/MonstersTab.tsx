import { MonsterCard } from "ui";
import {large_monster_spawns } from '../64554d1-musous.json'


export function MonstersTab() {

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {large_monster_spawns.map((monster, i) => (
        <MonsterCard key={i} data={monster} index={i} />
      ))}
    </div>
  );
}
