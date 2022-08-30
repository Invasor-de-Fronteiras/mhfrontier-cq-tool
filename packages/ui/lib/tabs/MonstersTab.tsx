import classNames from "classnames";
import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { MonsterCard } from "../components/MonsterCard";
import { useEditor } from "../context/EditorContext";
import { findMap, getStageName, monsters } from "../utils";

export function MonstersTab() {
  const { form } = useEditor();
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const mapId = useWatch({ control: form.control, name: "map_info.map_id" });

  const fields = useWatch({
    control: form.control,
    name: "large_monster_spawns",
  });


  const stages = useMemo(
    () => {
      if (!mapId) return [];
      const map = findMap(mapId);
      if (!map) return [];

      return map.stages.map((v, i) => ({
        value: v.id,
        label: v.areaNumber === 0 ? "Base" : `Area ${i}`,
      }));
    },
    [mapId]
  );

  const map = findMap(mapId);

  if (!fields) return null;

  return (
    <div className="flex h-full w-full">
      <table
        aria-label="Quest monsters"
        className="shadow-sm  w-full text-sm text-left"
      >
        <caption>click on which monster you want to edit</caption>
        <thead className="text-xs uppercase">
          <tr className="dark:text-white">
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
          {fields.map((monster, i) => {
            return (
              <tr
                key={i}
                className={classNames("hover:bg-emerald-300 cursor-pointer", {
                  "bg-emerald-300": i === selectedIndex,
                })}
                onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
              >
                <th className="px-6 py-4" scope="row">
                  {monsters[monster!.monster_id!] ?? "--"}
                </th>
                <td className="px-6 py-4">
                  {getStageName(map!, monster!.spawn_stage!)}
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
      {selectedIndex !== null && (
        <div className="absolute right-0">
          <MonsterCard
            index={selectedIndex}
            key={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            stages={stages}
          />
        </div>
      )}
    </div>
  );
}
