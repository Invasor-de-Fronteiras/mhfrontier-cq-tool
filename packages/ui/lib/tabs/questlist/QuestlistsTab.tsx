import classNames from "classnames";
import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { Button } from "../../components/Button";
import { GroupCard } from "../../components/CardGroup";
import { useQuestlistEditor } from "../../context/QuestlistEditorContext";
import { getQuestCategory, getQuestMark } from "../../utils";

interface QuestlistQuestsProps {
    questlistIndex: number;
}

export function QuestlistQuests({ questlistIndex }: QuestlistQuestsProps) {
    const { form } = useQuestlistEditor();
    const questlists = useWatch({
        control: form.control,
        name: 'questlists',
    });

    const questlist = useMemo(() => questlists[questlistIndex] || [], [questlists, questlistIndex]);
    
    return (
    <table
        aria-label="Quests"
        className="shadow-sm  w-full text-sm text-left"
    >
        <caption>click on which quest you want to edit</caption>
        <thead className="text-xs uppercase">
            <tr className="dark:text-white">
                <th role="columnheader" scope="col" className="px-6 py-4">
                    Title
                </th>
                <th role="columnheader" scope="col" className="px-6 py-4">
                    Description
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
            {questlist.quests.map((quest) => {
                return (
                    <tr
                        key={quest.quest_type_flags.main_quest_prop.quest_id}
                        className={classNames("hover:bg-emerald-300 cursor-pointer", {
                            // "bg-emerald-300": i === selectedIndex,
                        })}
                        // onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
                    >
                    <th className="px-6 py-4" scope="row">
                        {quest.strings.title ?? "--"}
                    </th>
                    <td className="px-6 py-4">
                        {quest.strings.description ?? "--"}
                    </td>
                    <td className="px-6 py-4">{quest.strings.main_objective ?? "--"}</td>
                    <td className="px-6 py-4">{getQuestCategory(quest.header.quest_category)}</td>
                    <td className="px-6 py-4">{getQuestMark(quest.header.mark)}</td>
                    <td className="px-6 py-4">{quest.header.max_players}</td>
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
          {questlists.map((v, i) => (<div key={v.filename} className="right-0 mt-3 mr-4">
            {v.filename}
            <Button onClick={() => setSelected(i)} />
          </div>))}
        </GroupCard>
        <GroupCard title="Main">
            {selected !== null && <QuestlistQuests questlistIndex={selected} />}
        </GroupCard>
    </div>
  );
}
