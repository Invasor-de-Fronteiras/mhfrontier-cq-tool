import { useMemo } from "react";
import { MonsterCard } from "ui";
import { useEditor } from "../context/EditorContext";
import { LargeMonsterSpawn, maps, Variants } from "../utils";

export function MonstersTab() {
  const { data, onChangeData } = useEditor();
  
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

  const onChangeVariant = (key: keyof Variants) => (value: number) => {
      onChangeData((prev) => ({
        ...prev,
        quest_type_flags: {
          ...prev.quest_type_flags,
          variants: {
            ...prev.quest_type_flags.variants,
            [key]: value
          }
        }
      }));
    };

  const getVariantProps = (index: number) => {
    if (!data) return {};
    const { variants } = data.quest_type_flags;
    if (index === 0) return { variant: variants.monster_variant0, onChangeVariant: onChangeVariant('monster_variant0') };
    if (index === 1) return { variant: variants.monster_variant1, onChangeVariant: onChangeVariant('monster_variant1') };
    if (index === 2) return { variant: variants.monster_variant2, onChangeVariant: onChangeVariant('monster_variant2') };

    return {};
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {data!.large_monster_spawns.map((monster, i) => (
        <MonsterCard
          key={i}
          data={monster}
          onChange={handleChangeMonster(i)}
          stages={stages}
          {...getVariantProps(i)}
        />
      ))}
    </div>
  );
}
