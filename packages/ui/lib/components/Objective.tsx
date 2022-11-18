import { useMemo } from "react";
import { monster_options } from "../utils";
import { SelectField } from "./Select";
import { useEditor } from "../context/EditorContext";
import { InputField } from "./Input";
import { useWatch } from "react-hook-form";
import { ObjectiveType, objective_options } from "../utils/objectiveType";
import { item_options } from "../utils/items";
import { createFilter } from "react-select";


export interface ObjectiveCardProps {
    objective: 1 | 2 | 3;
}

export function ObjectiveCard({ objective }: ObjectiveCardProps) {
    const { form } = useEditor();

    const data = useWatch({
        name: `quest_type_flags.main_quest_prop.objectives.objective${objective}`,
        control: form.control,
    });

    if (!data) return null;

    const objectiveTypeSelected = useMemo(
        () => objective_options.find((objective) => objective.value === data.quest_objective),
        [data.quest_objective, objective_options]
    );

    const shouldSelectMonster = useMemo(() => [
        ObjectiveType.Break_Part,
        ObjectiveType.Capture,
        ObjectiveType.Damage,
        ObjectiveType.Hunt,
        ObjectiveType.Slay,
        ObjectiveType.Slay_All,
        ObjectiveType.Slay_or_Damage,
    ].includes(data.quest_objective), [data.quest_objective]);

    const shouldSelectItem = useMemo(() => [
        ObjectiveType.Deliver,
        ObjectiveType.Deliver_Flag
    ].includes(data.quest_objective), [data.quest_objective]);

    const monsterSelected = useMemo(
        () =>
            shouldSelectMonster ? monster_options.find(
                (monster) => monster.value === data.monster_id
            ) : undefined,
        [shouldSelectMonster, data.monster_id]
    );

    const itemSelected = useMemo(
        () =>
            shouldSelectItem ? item_options.find(
                (item) => item.value === data.monster_id
            ) : undefined,
        [shouldSelectItem, data.monster_id]
    );

    return (
        // <div className="drop-shadow-sm border bg-white dark:bg-slate-800 rounded px-3 py-3 flex flex-col flex-wrap items-center gap-3 w-full max-w-sm">
        <div className="flex flex-row" >
            <SelectField
                label="Objective Type"
                className="mt-3 mr-3"
                options={objective_options}
                isClearable
                control={form.control}
                name={`quest_type_flags.main_quest_prop.objectives.objective${objective}.quest_objective`}
                value={objectiveTypeSelected}
            />
            {shouldSelectMonster && <SelectField
                label="Monster"
                className="mt-3"
                options={monster_options}
                control={form.control}
                name={`quest_type_flags.main_quest_prop.objectives.objective${objective}.monster_id`}
                getFormValue={(v) => v.value}
                value={monsterSelected}
            />}
            {shouldSelectItem && <SelectField
                label="Item"
                className="mt-3"
                options={item_options}
                control={form.control}
                // isSearchable={false}
                filterOption={createFilter({ ignoreAccents: false })}
                name={`quest_type_flags.main_quest_prop.objectives.objective${objective}.monster_id`}
                value={itemSelected}
            />}
            {!shouldSelectMonster && !shouldSelectItem && <InputField
                label="Objective Id"
                type="number"
                name={`quest_type_flags.main_quest_prop.objectives.objective${objective}.monster_id`}
            />}
            <InputField
                label="Unk"
                type="number"
                name={`quest_type_flags.main_quest_prop.objectives.objective${objective}.unk`}
            />
            <InputField
                label="Quantity"
                type="number"
                name={`quest_type_flags.main_quest_prop.objectives.objective${objective}.quantity`}
            />
            {/* <div className="flex flex-row">

            </div> */}
        </div>
    );
}
