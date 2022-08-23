import classNames from "classnames";
import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { GroupCard } from "../../components/CardGroup";
import { Select } from "../../components/Select";
import { useQuestlistEditor } from "../../context/QuestlistEditorContext";
import { getQuestCategory, getQuestMark, QuestlistFile } from "../../utils";

interface QuestlistQuestsProps {
    questlistIndex: number | null;
}

interface QuestInfoRow {
    filename: string;
    questId: number;
    title: string;
    mainObjective: string;
    questCategory: string;
    mark: string;
    maxPlayers: number;
}

const mapQuestlist = (questlist?: QuestlistFile): QuestInfoRow[] => {
    if (!questlist) return [];

    return questlist.quests.map<QuestInfoRow>(quest => ({
        filename: questlist.filename,
        questId: quest.quest_type_flags.main_quest_prop.quest_id,
        title: quest.strings.title,
        mainObjective: quest.strings.main_objective,
        questCategory: getQuestCategory(quest.header.quest_category),
        mark: getQuestMark(quest.header.mark),
        maxPlayers: quest.header.max_players,
    }));
}

export function QuestlistQuests({ questlistIndex }: QuestlistQuestsProps) {
    const { form } = useQuestlistEditor();
    const questlists = useWatch({
        control: form.control,
        name: 'questlists',
    });

    const questlist = useMemo<QuestInfoRow[]>(() => {
        if (questlistIndex === null) 
            return questlists.reduce<QuestInfoRow[]>((acc, cur) => {
                acc.push(...mapQuestlist(cur));
                return acc;
            }, []);
        
        return mapQuestlist(questlists[questlistIndex]);
    }, [questlists, questlistIndex]);
    
    return (
    <table
        aria-label="Quests"
        className="shadow-sm  w-full text-sm text-left"
    >
        <caption>click on which quest you want to edit</caption>
        <thead className="text-xs uppercase">
            <tr className="dark:text-white">
                {questlistIndex === null && <th role="col" scope="col" className="px-6 py-4">
                    Questlist
                </th>}
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
            </tr>
        </thead>
        <tbody>
            {questlist.map((quest) => {
                return (
                    <tr
                        key={quest.questId}
                        className={classNames("hover:bg-emerald-300 cursor-pointer")}
                        // onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
                    >
                        {questlistIndex === null && <th className="px-6 py-4" scope="row">{quest.filename}</th>}
                        <th className="px-6 py-4" scope="row">{quest.title}</th>
                        <td className="px-6 py-4">{quest.mainObjective}</td>
                        <td className="px-6 py-4">{quest.questCategory}</td>
                        <td className="px-6 py-4">{quest.mark}</td>
                        <td className="px-6 py-4">{quest.maxPlayers}</td>

                    </tr>
                );
            })}
        </tbody>
    </table>
    );
}

export function QuestlistTab() {
  const { form } = useQuestlistEditor();
  const [selected, setSelected] = useState<null | number>(null);
  const questlists = useWatch({ control: form.control,  name: 'questlists' });

  console.log('questlists: ', questlists);
  if (!questlists || !questlists.map) return <div>Empthy</div>;

  return (
    <div className="flex flex-row flex-wrap gap-2">
        <GroupCard title="Main">
            <Select
                options={questlists.map((v, i) => ({ label: v.filename, value: i }))}
                label="Questlist"
                isClearable
                onChange={item => setSelected(item?.value || null)}
            />
          {/* {questlists.map((v, i) => (<div key={v.filename} className="right-0 mt-3 mr-4">
            {v.filename}
            <Button onClick={() => setSelected(i)} />
          </div>))} */}
        </GroupCard>
        <GroupCard title="Main">
            {selected !== null && <QuestlistQuests questlistIndex={selected} />}
        </GroupCard>
    </div>
  );
}
