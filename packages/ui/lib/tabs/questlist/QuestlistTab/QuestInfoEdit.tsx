import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { Button } from "../../../components/Button";
import { GroupCard } from "../../../components/CardGroup";
import { InputField } from "../../../components/Input";
import { SelectField } from "../../../components/Select";
import { TextAreaField } from "../../../components/TextArea";
import { UnknownField } from "../../../components/UnknownFields";
import { useQuestlistEditor } from "../../../context/QuestlistEditorContext";
import { quest_category, quest_mark } from "../../../utils";

export interface QuestInfoEditProps {
    questIndex: number;
    onClose: () => void;
}

export function QuestInfoEdit({ questIndex, onClose }: QuestInfoEditProps) {
    const { form } = useQuestlistEditor();

    const quests = useWatch({
        control: form.control,
        name: 'quests',
    });

    const quest = useMemo(() => {
        const data = quests[questIndex];
        console.log('quest: ', data);
        return data;
    }, [quests, questIndex]);

    return (
    <div className="flex flex-row flex-wrap gap-2">
        <Button
            type="button"
            onClick={onClose}
        >
            Back
        </Button>
        <GroupCard title="Quest">
            <SelectField
                label="Mark"
                name={`quests.${questIndex}.header.mark`}
                control={form.control}
                options={quest_mark}
            />
            <SelectField
                label="Category"
                name={`quests.${questIndex}.header.quest_category`}
                control={form.control}
                options={quest_category}
            />
            <InputField
                label="Max Players"
                type="number"
                name={`quests.${questIndex}.header.max_players`}
                control={form.control}
            />
            <InputField
                label="Quest ID"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.main_quest_prop.quest_id`}
                control={form.control}
            />
            <InputField
                label="Max Deaths"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.main_quest_prop.max_death`}
                control={form.control}
            />
            <InputField
                label="Quest Fee"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.main_quest_prop.quest_fee`}
                control={form.control}
            />
            <InputField
                label="Quest Time"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.main_quest_prop.quest_time`}
                control={form.control}
            />
            <InputField
                label="Main grp"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.rewards_focus.main_rp_grp`}
                control={form.control}
            />
            <InputField
                label="Sub A grp"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.rewards_focus.sub_a_rp_grp`}
                control={form.control}
            />
            <InputField
                label="Sub B grp"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.rewards_focus.sub_b_rp_grp`}
                control={form.control}
            />
            <InputField
                label="Join rank min"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.main_quest_prop.join_rank_min`}
                control={form.control}
            />
            <InputField
                label="Post rank min"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.main_quest_prop.post_rank_min`}
                control={form.control}
            />
        </GroupCard>
        <GroupCard title="Text" contentClass="grid grid-cols-4">
            <TextAreaField
                label="Title"
                type="string"
                className="col-span-2"
                name={`quests.${questIndex}.strings.title`}
                control={form.control}
            />
            <InputField
                label="Main Objetive"
                type="string"
                className="col-span-2"
                name={`quests.${questIndex}.strings.main_objective`}
                control={form.control}
            />
            <InputField
                label="Sub A"
                type="string"
                className="col-span-2"
                name={`quests.${questIndex}.strings.sub_a_objective`}
                control={form.control}
            />
            <InputField
                label="Sub B"
                type="string"
                className="col-span-2"
                name={`quests.${questIndex}.strings.sub_b_objective`}
                control={form.control}
            />
            <InputField
                label="Clear"
                type="string"
                className="col-span-2"
                name={`quests.${questIndex}.strings.clear_reqs`}
                control={form.control}
            />
            <InputField
                label="Fail"
                type="string"
                className="col-span-2"
                name={`quests.${questIndex}.strings.fail_reqs`}
                control={form.control}
            />
            <InputField
                label="Contractor"
                type="string"
                className="col-span-2"
                name={`quests.${questIndex}.strings.contractor`}
                control={form.control}
            />
            <TextAreaField
                label="Description"
                type="string"
                className="col-span-2"
                name={`quests.${questIndex}.strings.description`}
                control={form.control}
            />
        </GroupCard>
        <GroupCard title="Flags">
            <InputField
                label="Locale flags"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.main_quest_prop.quest_locale_flags`}
                control={form.control}
            />
            <InputField
                label="Quest Variant1"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.variants.quest_variant1`}
                control={form.control}
            />
            <InputField
                label="Quest Variant2"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.variants.quest_variant2`}
                control={form.control}
            />
            <InputField
                label="Quest Variant3"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.variants.quest_variant3`}
                control={form.control}
            />
            <InputField
                label="Allowed Weapons"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.forced_equipement.weapon_attach1or_bitmask`}
                control={form.control}
            />
            <InputField
                label="Allowed Equipement"
                type="number"
                name={`quests.${questIndex}.quest_type_flags.allowed_equipment_bitmask`}
                control={form.control}
            />
        </GroupCard>
        <GroupCard title="Unknown Data">
            <UnknownField
                name="Header"
                path={`quests.${questIndex}.header`}
                data={quest.header}
                control={form.control}
                initialHide
            />
            <UnknownField
                name="Quest Type Flags"
                path={`quests.${questIndex}.quest_type_flags`}
                data={quest.quest_type_flags}
                control={form.control}
                initialHide
            />
        </GroupCard>
    </div>
  );
}
