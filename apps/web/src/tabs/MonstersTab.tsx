import { monsters } from "../utils";

export function MonstersTab() {
  const questMonsters = [
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
    <div>
      <h2>Monsters</h2>
      <div className="flex flex-col gap-3">
        {questMonsters.map((monster) => (
          <div className="drop-shadow-sm border rounded px-3 py-2 flex flex-col flex-wrap gap-6">
            <div className="flex flex-col">
              <label>Monster</label>
              <select
                value={monster.monsterId}
                className="border rounded p-2 w-full max-w-xs"
              >
                <option>Select a monster</option>
                {monsters.map((monster, i) => (
                  <option key={monster} value={i}>
                    {monster}
                  </option>
                ))}
              </select>
            </div>
            <fieldset>
              <legend>Position</legend>
              <div className="flex flex-row">
                <PosInput label="X" value={monster.pos[0]} />
                <PosInput label="Y" value={monster.pos[1]} />
                <PosInput label="Z" value={monster.pos[2]} />
              </div>
            </fieldset>
          </div>
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
