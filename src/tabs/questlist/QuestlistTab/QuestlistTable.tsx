import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useQuestlistEditor } from "../../../context/QuestlistEditorContext";
import { getQuestCategory, getQuestMark } from "../../../utils";
import { QuestInfoRow, QuestlistRow } from "./QuestlistRow";

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
}

interface QuestlistQuestsProps {
    questlistIndex: number | null;
    query: Partial<QuestInfoRow>;
    onEdit: (value: number) => void;
}

export function QuestlistTable({ questlistIndex, onEdit, query }: QuestlistQuestsProps) {
    const { form } = useQuestlistEditor();
    const quests = useWatch({
        control: form.control,
        name: 'quests',
    });

    const questlist = useMemo<QuestInfoRow[]>(() => {
        return quests.map<QuestInfoRow>((quest, i) => ({
            index: i,
            questId: quest.quest_type_flags.main_quest_prop.quest_id,
            title: quest.strings.title,
            mainObjective: quest.strings.main_objective,
            questCategory: getQuestCategory(quest.header.quest_category),
            mark: getQuestMark(quest.header.mark),
            maxPlayers: quest.header.max_players,
        }));
    }, [quests]);

    const questsFiltered = useMemo(() => {
        if (Object.keys(query).length === 0) return questlist;

        return questlist.filter(quest => {
            if (query.title && !RegExp(query.title).test(quest.title)) return false;
            if (query.questCategory && !RegExp(query.questCategory).test(quest.questCategory)) return false;

            return true;
        });
    },[questlist, query]);

    const onChangePosition = (current: number, destination: number) => {
        
        const items = reorder(
          quests,
          current,
          destination === -1 ? quests.length - 1 : destination
        );

        form.setValue('quests', items);
    }

    const onDelete = (index: number) => {
        form.setValue('quests', quests.filter((v, i) => i !== index));
    }

    return (
        <table
            aria-label="Quests"
            className="shadow-sm  w-full text-sm text-left"
        >
            <caption>click on which quest you want to edit</caption>
            <thead className="text-xs uppercase">
                <tr className="dark:text-white">
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Position
                    </th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Title
                    </th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Main Objective
                    </th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Category
                    </th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        mark
                    </th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Max players
                    </th>
                    <th role="columnheader" scope="col" className="px-6 py-4">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {questsFiltered.map((quest) => {
                    return <QuestlistRow
                        key={`${quest.index}-${quest.questId}`}
                        quest={quest}
                        onChangePosition={onChangePosition}
                        onEdit={onEdit}
                        showQuestlist={questlistIndex === null}
                        onDelete={onDelete}
                    />
                })}
            </tbody>
        </table>
    );
}