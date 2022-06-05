import { MonsterCard } from "ui";
import { useEditor } from "../context/EditorContext";


export function MonstersTab() {
 const editor = useEditor();

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {editor.data.large_monster_spawns.map((monster, i) => (
        <MonsterCard key={i} data={monster} index={i} />
      ))}
    </div>
  );
}
