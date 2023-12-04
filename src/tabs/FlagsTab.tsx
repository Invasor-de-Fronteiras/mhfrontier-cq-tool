import { useWatch } from "react-hook-form";
import { BitFlagsField } from "../components/BitFlags";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { SelectField } from "../components/Select";
import { useEditor } from "../context/EditorContext";

const questTypeRaw = [
  "HR",
  "HR/Hiden",
  "HR/HC",
  "HR//Hiden/HC",
  "HR/HC or Normal",
  "HR/Hiden/HC or Normal",
  "HR/HC",
  "HR/Hiden/HC",
  "GSR/Changeable difficult",
  "GSR/Changeable difficult",
  "GSR/HC/Fixed difficult",
  "GSR/HC/Fixed difficult",
  "GSR/N,HC,UL/Changeable difficult",
  "GSR/N,HC,UL/Changeable difficult",
  "GSR/HC/Fixed difficult",
  "GSR/HC/Fixed difficult",
  "Unknown1",
  "Unknown2",
  "Unknown3",
  "Unknown4",
  "Unknown5",
  "Unknown6",
  "Unknown7",
  "Unknown8",
  "Unknown9",
  "Unknown10",
  "Unknown12",
  "Unknown12",
  "Unknown13",
  "Unknown14",
  "Unknown15",
  "Unknown16",
  "Diva defence",
  "Unknown17"
]
  .map((v, i) => ({ value: i, label: v}));

const questType = [
  ...questTypeRaw,
  { label: 'UL Fixed', value: 128 },
  { label: 'HC/UL Fixed', value: 188 },
];

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
        <SelectField
          label="Quest Variant 1"
          options={questType}
          name="quest_type_flags.variants.quest_variant1"
        />
        <InputField
          label="Ranking/Star"
          type="number"
          name="quest_type_flags.main_quest_prop.ranking_id"
        />
      </GroupCard>
      <GroupCard title="Quest Variant 1">
        <BitFlagsField
          label="Quest Variant 1"
          name="quest_type_flags.variants.quest_variant1"
          options={[
            { label: 'SR/Changeable', bitValue: 1 },
            { label: 'HC Fixed', bitValue: 2 },
            { label: 'Toggle HC/UL', bitValue: 4 },
            { label: 'G Rank', bitValue: 8 },
            { label: 'Unk', bitValue: 16 },
            { label: 'Unk', bitValue: 32 },
            { label: 'Unk', bitValue: 64 },
            { label: 'UL Fixed', bitValue: 128 }
          ]}
        />
      </GroupCard>
      <GroupCard title="Quest Variant 2">
        <BitFlagsField
          label="Quest Variant 2"
          name="quest_type_flags.variants.quest_variant2"
          options={[
            { label: 'LV 1', bitValue: 1 },
            { label: 'Disable Halk Potion', bitValue: 2 },
            { label: 'Disable Halk & Poogie', bitValue: 4 },
            { label: 'Timer', bitValue: 8 },
            { label: 'Disable Active Feature', bitValue: 16 },
            { label: 'Fixed Difficulty', bitValue: 32 },
            { label: 'LV 9999', bitValue: 64 },
            { label: 'Road', bitValue: 128 }
          ]}
        />
      </GroupCard>
      <GroupCard title="Quest Variant 3">
        <BitFlagsField
          label="Quest Variant 3"
          name="quest_type_flags.variants.quest_variant3"
          options={[
            { label: 'Disable Reward Bonus', bitValue: 1 },
            { label: 'Require GR', bitValue: 2 },
            { label: 'Unk', bitValue: 4 },
            { label: 'Unk', bitValue: 8 },
            { label: 'Zenith', bitValue: 16 },
            { label: 'Diva Defense', bitValue: 32 },
            { label: 'Course???', bitValue: 64 },
            { label: 'Sigil not allowed', bitValue: 128 }
          ]}
        />
      </GroupCard>
      <GroupCard title="Quest Variant 4">
        <BitFlagsField
          label="Quest Variant 4"
          name="quest_type_flags.variants.quest_variant4"
          options={[
            { label: 'Unk', bitValue: 1 },
            { label: 'Unk', bitValue: 2 },
            { label: 'Unk', bitValue: 4 },
            { label: 'Unk', bitValue: 8 },
            { label: 'Unk', bitValue: 16 },
            { label: 'Unk', bitValue: 32 },
            { label: 'Unk', bitValue: 64 },
            { label: 'Unk', bitValue: 128 }
          ]}
        />
      </GroupCard>
    </div>
  );
}
