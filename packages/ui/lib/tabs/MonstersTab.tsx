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

  const onAddMonster = () => {
    form.setValue(`large_monster_spawns`, [
      ...fields,
      { 
        monster_id: 0,
        spawn_amount: 1,
        spawn_stage: 0,
        unk10: 0,
        unk11: 0,
        unk12: 0,
        unk4: 0,
        unk5: 0,
        unk6: 0,
        unk7: 0,
        unk8: 0,
        unk9: 0,
        x_position: 0,
        y_position: 0,
        z_position: 0,
      },
    ]);
  };

  const onRemoveMonster = (index: number) => {
    form.setValue('large_monster_spawns', fields.filter((v, i) => i !== index));
  };

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
    <div className="relative">
      <div>
        <button type="button" onClick={onAddMonster}>Add Monster</button>
      </div>
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
            <th role="columnheader" scope="col" className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="dark:text-white">
          {fields.map((monster, i) => {
            return (
              <tr
                key={i}
                className={classNames("hover:bg-emerald-300 cursor-pointer", {
                  "bg-emerald-300": i === selectedIndex,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedIndex(i === selectedIndex ? null : i);
                }}
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
                <td className="px-6 py-4">
                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemoveMonster(i);
                    }}
                  >Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedIndex !== null && (
        <div className="absolute right-0 top-0">
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
