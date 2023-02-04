import classNames from "classnames";
import { ComponentProps } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { periodToString, QuestDB, seasonToNumber } from "../../../utils";
import { useRemoteQuest } from "../../../context/RemoteQuestContext";
import { MdOutlineAdd } from "react-icons/md";

interface RemoteQuestRowProps {
    quest: QuestDB;
    onAddToQuestlist: (quest: QuestDB) => void;
    onDelete: (value: number) => void;
}

export const ActionButton = ({ children, ...props }: ComponentProps<"button"> & { children: React.ReactNode }) => 
    <button 
        type="button"
        className={classNames(
            "mx-1 text-slate-900 border  hover:bg-slate-700", 
            "hover:text-white focus:ring-4 focus:outline-none",
            "focus:ring-blue-300 font-medium rounded-full text-sm p-2.5",
            "text-center inline-flex items-center dark:border-blue-500",
            "dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
        )}
        {...props}
    >
        {children}
    </button>;

export const RemoteQuestRow = ({ quest, onAddToQuestlist }: RemoteQuestRowProps) => {
    const { downloadQuest } = useRemoteQuest();

    return <tr
            className={classNames("hover:bg-emerald-300 cursor-pointer dark:text-white")}
        >
            {/* <td className="px-6 py-4"><Checkbox label="" name="" value={quest.enable} /></td> */}
            <td className="px-6 py-4">{quest.quest_id}</td>
            <td className="px-6 py-4">{quest.period}</td>
            <td className="px-6 py-4">{quest.season}</td>
            <td className="px-6 py-4">{quest.title}</td>
            <td className="px-6 py-4">{quest.main_objective}</td>
            <td className="px-6 py-4">{quest.sub_a_objective}</td>
            <td className="px-6 py-4">{quest.sub_b_objective}</td>
            <td className="px-6 py-4">{quest.reward_item1}</td>
            <td className="px-6 py-4">{quest.reward_item2}</td>
            <td className="px-6 py-4">{quest.reward_item3}</td>
            <td className="px-6 py-4 flex">
                <ActionButton onClick={() => downloadQuest(quest.quest_id, periodToString(quest.period), seasonToNumber(quest.season))}>
                    <AiOutlineDownload size={16} />
                </ActionButton>
                <ActionButton onClick={() => onAddToQuestlist(quest)}>
                    <MdOutlineAdd size={16} />
                </ActionButton>
            </td>
        </tr>;
}