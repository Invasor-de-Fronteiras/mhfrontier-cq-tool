import { MonsterCard } from "ui";
import { monsters } from "../utils";

interface Monster {
  monsterId: number;
  pos: [number, number, number];
}

export function MonstersTab() {
  const questMonsters: Monster[] = [
    {
      monsterId: 1,
      pos: [0, 0, 0],
    },
    {
      monsterId: 2,
      pos: [0, 0, 0],
    },
    {
      monsterId: 3,
      pos: [0, 0, 0],
    },
    {
      monsterId: 30,
      pos: [0, 0, 0],
    },
    {
      monsterId: 43,
      pos: [0, 0, 0],
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {questMonsters.map((monster) => (
        <MonsterCard key={monster.monsterId} data={monster} />
      ))}
    </div>
  );
}
