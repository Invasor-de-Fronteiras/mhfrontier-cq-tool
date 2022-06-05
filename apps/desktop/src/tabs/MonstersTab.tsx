import { useContext, useMemo } from "react";
import { QuestContext } from "../hooks/quest";
import { monsters, QuestFile } from "../types/quest-file";
import { LargeMonsterSpawn, MonsterCard, Select } from 'ui';
import { maps } from "ui/utils/maps";

export function MonstersTab() {
  const { largeMonsterSpawns, mapInfo, setLargeMonsterSpawns } = useContext(QuestContext);
  const stages = useMemo(() => !mapInfo ? [] : maps[mapInfo.map_id].stages.map((v, i) => ({ value: v, label: i === 0 ? 'Base' : `Area ${i}` })), [mapInfo])

  const onChangeMonster = (index: number) => (monster: LargeMonsterSpawn) => {
    if (!setLargeMonsterSpawns || !largeMonsterSpawns) return;
    console.log('onChangeMonster: ', monster);
    setLargeMonsterSpawns(largeMonsterSpawns.map((v, i) => i === index ? monster : v));
  }

  // const questMonsters = [
  //   {
  //     monsterId: 1,
  //     pos: [0, 0, 0],
  //   },
  //   {
  //     monsterId: 2,
  //     pos: [0, 0, 0],
  //   },
  //   {
  //     monsterId: 3,
  //     pos: [0, 0, 0],
  //   },
  //   {
  //     monsterId: 30,
  //     pos: [0, 0, 0],
  //   },
  //   {
  //     monsterId: 43,
  //     pos: [0, 0, 0],
  //   },
  // ];

  console.log('largeMonsterSpawns: ', largeMonsterSpawns);
  return (
    <div>
      <h2>Monsters</h2>
      <div className="flex flex-col gap-3">

        {largeMonsterSpawns && largeMonsterSpawns.map((monster, index) => (
          <MonsterCard
            data={monster}
            index={index}
            stages={stages}
            onChange={onChangeMonster(index)}
            key={`${monster.monster_id}_${index}`}
          />
          // <div className="drop-shadow-sm border rounded px-3 py-2 flex flex-col flex-wrap gap-6">
          //   <div className="flex flex-col">
          //     <label>Monster</label>
          //     <Select options={monsters} />
          //     {/* <select
          //       value={monster.monster_id}
          //       className="border rounded p-2 w-full max-w-xs"
          //     >
          //       <option>Select a monster</option>
          //       {monsters.map((monster, i) => (
          //         <option key={monster} value={i}>
          //           {monster}
          //         </option>
          //       ))}
          //     </select> */}
          //   </div>
          //   <fieldset>
          //     <legend>Position</legend>
          //     <div className="flex flex-row">
          //       <PosInput label="X" value={monster.x_position} />
          //       <PosInput label="Y" value={monster.y_position} />
          //       <PosInput label="Z" value={monster.z_position} />
          //     </div>
          //   </fieldset>
          // </div>
        ))}
      </div>
    </div>
  );
}

interface PosInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function PosInput({ label, ...props }: PosInputProps) {
  return (
    <label className=" p-1 relative flex items-center">
      <span className="text-gray-500 absolute pl-2">{label}</span>
      <input
        type="number"
        className="text-left w-32 pl-6 border-2 border-transparent rounded focus:border-emerald-500 outline-none"
        {...props}
      />
    </label>
  );
}
