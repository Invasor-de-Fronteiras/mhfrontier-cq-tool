import { useWatch } from "react-hook-form";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { useEditor } from "../context/EditorContext";

export function FlagsTab() {
    const { form } = useEditor();
    const quest = useWatch({ control: form.control });

    quest.quest_type_flags?.variants?.map_variant0
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <GroupCard title="Variants">
        <InputField
          label="Map Variant 0"
          type="number"
          name="quest_type_flags.variants.map_variant0"
        />
        <InputField
          label="Monster Variant 0 (Reward variant)"
          type="number"
          name="quest_type_flags.variants.monster_variant0"
        />
        <InputField
          label="Monster Variant 1"
          type="number"
          name="quest_type_flags.variants.monster_variant1"
        />
        <InputField
          label="Monster Variant 2"
          type="number"
          name="quest_type_flags.variants.monster_variant2"
        />
        <InputField
          label="Quest Variant 1"
          type="number"
          name="quest_type_flags.variants.quest_variant1"
        />
        <InputField
          label="Quest Variant 2"
          type="number"
          name="quest_type_flags.variants.quest_variant2"
        />
        <InputField
          label="Quest Variant 3"
          type="number"
          name="quest_type_flags.variants.quest_variant3"
        />
      </GroupCard>
    </div>
  );
}
