import React, { useMemo } from "react";
import { PosInput } from "./PosInput";
import { LargeMonsterSpawn, monster_options } from "../utils";
import { Select, SelectOption } from "./Select";
import { MapPreview } from "./MapPreview";
import { useEditor, useQuestObjective } from "../context/EditorContext";
import { Input } from "./Input";
import { GrClose } from "react-icons/gr";

interface Stage {
  value: number;
  label: string;
}
export interface MonsterCardProps {
  data: LargeMonsterSpawn;
  stages: Stage[];
  onChange: (value: LargeMonsterSpawn) => void;
  onChangeVariant?: (value: number) => void;
  variant?: number;
  onClose: () => void;

}

export function MonsterCard({
  data,
  stages,
  onChange,
  onClose,
  onChangeVariant,
  variant
}: MonsterCardProps) {
  const { changeQuestObjective, questObjectives } = useQuestObjective();

  return (
    <div className="drop-shadow-sm border bg-white dark:bg-slate-800 rounded px-3 py-2 flex flex-col flex-wrap items-center gap-6 w-full max-w-sm">
      {/* <Select
        label="Monster"
        options={monster_options}
        isClearable
        onChange={(v) => handleChangeMonster(v)}
        value={String(data.monster_id)}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
      /> */}
    </div>
  );
}
