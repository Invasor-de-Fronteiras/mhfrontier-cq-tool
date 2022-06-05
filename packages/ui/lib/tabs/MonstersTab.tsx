import { useMemo } from "react";
import { MonsterCard } from "ui";
import { useEditor } from "../context/EditorContext";
import { LargeMonsterSpawn, maps } from "../utils";

export function MonstersTab() {
  const { data, onChangeData } = useEditor();
  
  const stages = useMemo(
    () =>
      !data?.map_info
        ? []
        : maps[data?.map_info.map_id].stages.map((v, i) => ({
            value: v,
            label: i === 0 ? "Base" : `Area ${i}`,
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
    <div className="flex flex-row flex-wrap gap-3">
      {data!.large_monster_spawns.map((monster, i) => (
        <MonsterCard
          key={i}
          data={monster}
          index={i}
          onChange={handleChangeMonster(i)}
          stages={stages}
        />
      ))}
    </div>
  );
}
