import { QuestDB } from "../../../utils";
import { RemoteQuestRow } from "./RemoteQuestRow";

// function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
  
//     return result;
// }

interface RemoteQuestTableProps {
    quests: QuestDB[];
    onAddToQuestlist: (quest: QuestDB) => void;
}

export function RemoteQuestTable({ quests, onAddToQuestlist }: RemoteQuestTableProps) {
    return (
        <table
            aria-label="Quests"
            className="shadow-sm w-full text-sm text-left"
        >
            <caption>click on which quest you want to edit</caption>
            <thead className="text-xs uppercase">
                <tr className="dark:text-white">
                    <th role="columnheader" scope="col" className="px-6 py-4">Quest Id</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Period</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Season</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Title</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Main Objective</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Sub A</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Sub B</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Reward Item1</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Reward Item2</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Reward Item3</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {quests.map((quest) => {
                    return <RemoteQuestRow
                        key={`${quest.quest_id}-${quest.period}-${quest.season}`}
                        quest={quest}
                        onDelete={() => {
                            // todo
                        }}
                        onAddToQuestlist={onAddToQuestlist}
                    />
                })}
            </tbody>
        </table>
    );
}