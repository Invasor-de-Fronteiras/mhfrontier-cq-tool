import classNames from "classnames";
import { ComponentProps, useMemo } from "react";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import { BiArrowFromBottom, BiArrowFromTop } from "react-icons/bi";
import { periodToString, QuestlistDB, quest_category, seasonToNumber } from "../../../utils";
import { useRemoteQuestlist } from "../../../context/RemoteQuestlistContext";
import { Checkbox } from "../../../components/Checkbox";
import { MdModeEdit } from "react-icons/md";

interface RemoteQuestlistRowProps {
    quest: QuestlistDB;
    onRefresh: () => void;
    onEditQuestlist: (quest: QuestlistDB) => void;
    onChangePosition: (category: number, current: number, destination: number) => Promise<void>;
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

export const RemoteQuestlistRow = ({ quest, onRefresh, onChangePosition, onEditQuestlist }: RemoteQuestlistRowProps) => {
    const { updateQuestlistOptions } = useRemoteQuestlist();
    const category = useMemo(() => {
        const questCategory = quest_category.find(v => v.value === quest.category);
        return questCategory?.label || quest.category;
    }, [quest]);

    const onChangeFlag = (key: keyof QuestlistDB) => async (value: boolean) => {
        await updateQuestlistOptions(
            quest.quest_id,
            periodToString(quest.period),
            seasonToNumber(quest.season),
            {
                enable: quest.enable,
                only_dev: quest.only_dev,
                position: quest.position,
                [key]: value
            }
        );
        onRefresh();
    }

    return <tr
            className={classNames("hover:bg-gray-700 cursor-pointer dark:text-white")}
        >
            <td className="px-6 py-4">
                {/* {quest.enable} */}
                <Checkbox label="" name="enable" value={quest.enable} onChange={onChangeFlag('enable')} />
            </td>
            <td className="px-6 py-4">{quest.quest_id}</td>
            <td className="px-6 py-4">{quest.period}</td>
            <td className="px-6 py-4">{quest.season}</td>
            <td className="px-6 py-4">{category}</td>
            <td className="px-6 py-4">{quest.position}</td>
            <td className="px-6 py-4">{quest.title}</td>
            <td className="px-6 py-4">
                <Checkbox label="" name="only_dev" value={quest.only_dev} onChange={onChangeFlag('only_dev')} />
            </td>
            <td className="px-6 py-4 flex">
                <ActionButton onClick={() => onChangePosition(quest.category, quest.position, 0)}>
                    <BiArrowFromBottom size={16} />
                </ActionButton>
                <ActionButton onClick={() => onChangePosition(quest.category, quest.position, quest.position - 1)}>
                    <VscTriangleUp size={16} />
                </ActionButton>
                <ActionButton onClick={() => onChangePosition(quest.category, quest.position, quest.position + 1)}>
                    <VscTriangleDown size={16} />
                </ActionButton>
                <ActionButton onClick={() => onChangePosition(quest.category, quest.position, -1)}>
                    <BiArrowFromTop size={16}  />
                </ActionButton>
                <ActionButton onClick={() => onEditQuestlist(quest)}>
                    <MdModeEdit size={16} />
                </ActionButton>
            </td>
        </tr>;
}