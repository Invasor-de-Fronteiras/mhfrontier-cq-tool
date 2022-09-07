import classNames from "classnames";
import { ComponentProps } from "react";
import {
    BsFillSkipEndFill,
    BsFillSkipBackwardFill,
    BsFillSkipStartFill,
    BsFillSkipForwardFill,
    
} from "react-icons/bs";
import { MdDelete, MdModeEdit } from "react-icons/md";

export interface QuestInfoRow {
    index: number;
    questId: number;
    title: string;
    mainObjective: string;
    questCategory: string;
    mark: string;
    maxPlayers: number;
}

interface QuestlistRowProps {
    quest: QuestInfoRow;
    onChangePosition: (current: number, destination: number) => void;
    onEdit: (value: number) => void;
    onDelete: (value: number) => void;
    showQuestlist?: boolean;
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

export const QuestlistRow = ({ quest, onEdit, onChangePosition, onDelete }: QuestlistRowProps) => {
    return <tr
            className={classNames("hover:bg-emerald-300 cursor-pointer dark:text-white")}
        >
            <td className="px-6 py-4">{quest.index}</td>
            <td className="px-6 py-4">{quest.title}</td>
            <td className="px-6 py-4">{quest.mainObjective}</td>
            <td className="px-6 py-4">{quest.questCategory}</td>
            <td className="px-6 py-4">{quest.mark}</td>
            <td className="px-6 py-4">{quest.maxPlayers}</td>
            <td className="px-6 py-4 flex">
                <ActionButton onClick={() => onChangePosition(quest.index, 0)}>
                    <BsFillSkipStartFill size={16} />
                </ActionButton>
                <ActionButton onClick={() => onChangePosition(quest.index, quest.index - 1)}>
                    <BsFillSkipBackwardFill size={16} />
                </ActionButton>
                <ActionButton onClick={() => onChangePosition(quest.index, quest.index + 1)}>
    
                    <BsFillSkipForwardFill size={16} />
                </ActionButton>
                <ActionButton onClick={() => onChangePosition(quest.index, -1)}>
                    <BsFillSkipEndFill size={16}  />
                </ActionButton>
                <ActionButton onClick={() => onEdit(quest.index)}>
                    <MdModeEdit size={16} />
                </ActionButton>
                <ActionButton onClick={() => onDelete(quest.index)}>
                    <MdDelete size={16}   />
                </ActionButton>
            </td>
        </tr>;
}