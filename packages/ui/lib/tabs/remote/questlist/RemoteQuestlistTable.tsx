import { QuestlistDB } from "../../../utils";
import { RemoteQuestlistRow } from "./RemoteQuestlistRow";

interface RemoteQuestlistTableProps {
    quests: QuestlistDB[];
    onRefresh: () => void;
    onEditQuestlist: (quest: QuestlistDB) => void;
    onChangePosition: (category: number, current: number, destination: number) => Promise<void>;
}

export function RemoteQuestlistTable({ quests, onRefresh, onChangePosition, onEditQuestlist }: RemoteQuestlistTableProps) {
    return (
        <table
            aria-label="Quests"
            className="shadow-sm w-full text-sm text-left"
        >
            <caption>click on which quest you want to edit</caption>
            <thead className="text-xs uppercase">
                <tr className="dark:text-white">
                    <th role="columnheader" scope="col" className="px-6 py-4">Enable</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Quest Id</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Period</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Season</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Category</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Position</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Title</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">Only Dev</th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {quests.map((quest) => {
                    return <RemoteQuestlistRow
                        key={`${quest.quest_id}-${quest.period}-${quest.season}`}
                        quest={quest}
                        onRefresh={onRefresh}
                        onEditQuestlist={onEditQuestlist}
                        onChangePosition={onChangePosition}
                    />
                })}
            </tbody>
        </table>
    );
}