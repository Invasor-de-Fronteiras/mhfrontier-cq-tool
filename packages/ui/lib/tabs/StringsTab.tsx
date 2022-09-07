import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { TextAreaField } from "../components/TextArea";

export function QuestStringTab() {
    return (
    <div className="flex flex-row flex-wrap gap-2">
        <GroupCard title="Text" contentClass="grid grid-cols-4">
            <TextAreaField
                label="Title"
                type="text"
                className="col-span-2"
                name="strings.title"
            />
            <InputField
                label="Main Objetive"
                type="text"
                className="col-span-2"
                name="strings.main_objective"
            />
            <InputField
                label="Sub A"
                type="text"
                className="col-span-2"
                name="strings.sub_a_objective"
            />
            <InputField
                label="Sub B"
                type="text"
                className="col-span-2"
                name="strings.sub_b_objective"
            />
            <InputField
                label="Clear"
                type="text"
                className="col-span-2"
                name="strings.clear_reqs"
            />
            <TextAreaField
                label="Fail"
                type="text"
                className="col-span-2"
                name="strings.fail_reqs"
            />
            <InputField
                label="Contractor"
                type="text"
                className="col-span-2"
                name="strings.contractor"
            />
            <TextAreaField
                label="Description"
                type="text"
                className="col-span-2"
                name="strings.description"
            />
        </GroupCard>
    </div>
  );
}
