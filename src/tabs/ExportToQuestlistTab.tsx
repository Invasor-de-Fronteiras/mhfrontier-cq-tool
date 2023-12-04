import { useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { GroupCard } from "../components/CardGroup";
import { InputField } from "../components/Input";
import { SelectField } from "../components/Select";
import { UnknownField } from "../components/UnknownFields";
import { useEditor } from "../context/EditorContext";
import { QuestInfoHeader, quest_category, quest_mark } from "../utils";

export function ExportToQuestlistTab() {
  const { form, handleExportQuestInfo } = useEditor();

  const formHeader = useForm<QuestInfoHeader>({
    defaultValues: {
      unk0: [0, 0, 15],
      max_players: 4,
      quest_category: 0x1C,
      unk1: [1, 0, 0, 0, 0, 0],
      mark: 0,
      unk2: 0,
      unk3: 0,
      length_msb: 0,
      length_lsb: 0
    },
  });

  const onExportQuestInfo = () => {
    const header = formHeader.getValues();
    const quest = form.getValues();

    handleExportQuestInfo({
      header,
      quest_type_flags: quest.quest_type_flags,
      strings: quest.strings,
      unk_data: quest.unk_data,
      unk0_len: 0x12,
      unk0: [
        0x83, 0x59, 0x89, 0x5B, 0x83, 0x3A, 0x58, 0xB6, 0x8E, 0x59, 0x82, 0xCC, 0x83, 0x58, 0x83, 0x58,
        0x83, 0x81,
      ]
    })
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div>
        <Button type="button" className="mt-5 mx-4" onClick={onExportQuestInfo}>Export Quest</Button>
      </div>
      <GroupCard title="Quest">
        <SelectField
          label="Mark"
          name="mark"
          control={formHeader.control}
          options={quest_mark}
        />
        <SelectField
          label="Category"
          name="quest_category"
          control={formHeader.control}
          options={quest_category}
        />
        <InputField
          label="Max Players"
          type="number"
          name="max_players"
          control={formHeader.control}
        />
      </GroupCard>
      <GroupCard title="Unknown Data">
        <UnknownField
          name="Header"
          path=""
          data={formHeader.getValues()}
          control={formHeader.control}
          initialHide
        />
      </GroupCard>
    </div>
  );
}
