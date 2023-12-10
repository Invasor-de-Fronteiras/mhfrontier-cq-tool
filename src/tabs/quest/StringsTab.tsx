import { GroupCard } from "../../components/CardGroup";
import { InputField } from "../../components/Input";
import { TextAreaField } from "../../components/TextArea";
import { useEditor } from "../../context/EditorContext";

export function QuestStringTab() {
    const { form } = useEditor();
    return (
    <div className="flex flex-row flex-wrap gap-2">
        <GroupCard title="Text" contentClass="grid grid-cols-4">
            <TextAreaField
                label="Title"
                type="text"
                className="col-span-2"
                name="strings.title"
                control={form.control}
            />
            <InputField
                label="Main Objetive"
                type="text"
                className="col-span-2"
                name="strings.main_objective"
                control={form.control}
            />
            <InputField
                label="Sub A"
                type="text"
                className="col-span-2"
                name="strings.sub_a_objective"
                control={form.control}
            />
            <InputField
                label="Sub B"
                type="text"
                className="col-span-2"
                name="strings.sub_b_objective"
                control={form.control}
            />
            <InputField
                label="Clear"
                type="text"
                className="col-span-2"
                name="strings.clear_reqs"
                control={form.control}
            />
            <TextAreaField
                label="Fail"
                type="text"
                className="col-span-2"
                name="strings.fail_reqs"
                control={form.control}
            />
            <InputField
                label="Contractor"
                type="text"
                className="col-span-2"
                name="strings.contractor"
                control={form.control}
            />
            <TextAreaField
                label="Description"
                type="text"
                className="col-span-2"
                name="strings.description"
                control={form.control}
            />
        </GroupCard>
    </div>
  );
}
