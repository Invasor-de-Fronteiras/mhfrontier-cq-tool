import classNames from "classnames";
import { useMemo, useState } from "react";
import { MonsterCard } from "../components/MonsterCard";
import { useEditor } from "../context/EditorContext";
import {
  findMap,
  findStage,
  getStageName,
  LargeMonsterSpawn,
  maps,
  monsters,
} from "../utils";
import {GrClose} from 'react-icons/gr';

export function MonstersTab() {
  const { data, onChangeData } = useEditor();
  const [selectedIndex, setSelectedIndex] = useState<null|number>(null);

  const map = findMap(data!.map_info.map_id);

  const stages = useMemo(
    () =>
      !data?.map_info
        ? []
        : maps[data?.map_info.map_id].stages.map((v, i) => ({
            value: v.id,
            label: v.areaNumber === 0 ? "Base" : `Area ${i}`,
          })),
    [data?.map_info]
  );

  const handleChangeMonster =
    (index: number) => (monster: LargeMonsterSpawn) => {
      onChangeData((prev) => ({
        ...prev,
        large_monster_spawns: prev.large_monster_spawns.map((v, i) =>
          i === index ? monster : v
        ),
      }));
    };

  return (
    <div className="flex h-full w-full">
      <table
        aria-label="Quest monsters"
        className="shadow-sm  w-full text-sm text-left"
      >
        <caption>click on which monster you want to edit</caption>
        <thead className="text-xs uppercase">
          <tr>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Monster
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Area
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Position X
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Position Y
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Position Z
            </th>
            <th role="columnheader" scope="col" className="px-6 py-4">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data!.large_monster_spawns.map((monster, i) => {
            return (
              <tr
                key={i}
                className={classNames("hover:bg-emerald-300 cursor-pointer", {
                  "bg-emerald-300": i === selectedIndex,
                })}
                onClick={() =>   setSelectedIndex(i === selectedIndex ? null : i)}
              >
                <th className="px-6 py-4" scope="row">
                  {monsters[monster.monster_id] ?? "--"}
                </th>
                <td className="px-6 py-4">
                  {getStageName(map!, monster.spawn_stage)}
                </td>
                <td className="px-6 py-4">{monster.x_position}</td>

                <td className="px-6 py-4">{monster.y_position}</td>

                <td className="px-6 py-4">{monster.z_position}</td>
                <td className="px-6 py-4">{monster.spawn_amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedIndex !== null && <div className=" bg-white absolute right-0">
        <MonsterCard
           
          key={selectedIndex}
          data={data!.large_monster_spawns[selectedIndex]}
          onChange={handleChangeMonster(selectedIndex)}
          onClose={() => setSelectedIndex(null)}
          stages={stages}
        />
      </div>}
    </div>
  );
}
