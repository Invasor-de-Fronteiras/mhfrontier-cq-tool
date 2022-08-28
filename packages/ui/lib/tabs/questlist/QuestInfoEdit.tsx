import { Button } from "../../components/Button";
import { GroupCard } from "../../components/CardGroup";
import { InputField } from "../../components/Input";
import { SelectField } from "../../components/Select";
import { TextAreaField } from "../../components/TextArea";
import { useQuestlistEditor } from "../../context/QuestlistEditorContext";
import { quest_category, quest_mark } from "../../utils";

export interface QuestInfoEditProps {
    questIndex: number;
    onClose: () => void;
}

export function QuestInfoEdit({ questIndex, onClose }: QuestInfoEditProps) {
    const { form } = useQuestlistEditor();
    
    return (
    <div className="flex flex-row flex-wrap gap-2">
        <Button
            type="button"
            onClick={onClose}
        >
            Back
        </Button>
        <GroupCard title="Flags">
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
        </GroupCard>
        <GroupCard title="Text" contentClass="grid grid-cols-4">
            <InputField
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
        <GroupCard title="Quest">
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
        </GroupCard>
    </div>
  );
}
