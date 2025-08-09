import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { Button } from "../../../components/Button";
import { GroupCard } from "../../../components/CardGroup";
import { InputField } from "../../../components/Input";
import { SelectField } from "../../../components/Select";
import { UnknownField } from "../../../components/UnknownFields";
import { useRemoteQuest } from "../../../context/RemoteQuestContext";
import { useRemoteQuestlist } from "../../../context/RemoteQuestlistContext";
import {
  QuestDB,
  QuestInfo,
  QuestInfoHeader,
  QuestlistDBOptions,
  quest_category,
  quest_mark,
  periodToString,
  seasonToNumber
} from "../../../utils";
import { toast } from 'react-toastify';
import { CheckboxField } from "../../../components/Checkbox";

interface AddQuestForm {
  header: QuestInfoHeader;
  options: QuestlistDBOptions;
}

export interface AddQuestToListProps {
  quest: QuestDB;
  onClose: () => void;
}

const defaultHeader: QuestInfoHeader = {
  unk0: [0, 0, 15],
  max_players: 4,
  quest_category: 0x1C,
  unk1: [1, 0, 0, 0, 0, 0],
  mark: 0,
  unk2: 0,
  unk3: 0,
  length_msb: 0,
  length_lsb: 0,
  quest_id: 0
};

export const AddQuestToList: React.FC<AddQuestToListProps> = ({ quest, onClose }) => {
  // const { form, handleExportQuestInfo } = useQuestEditor();
  const { insertOrUpdateQuestlist } = useRemoteQuestlist();
  const { getQuestInfoFromQuest } = useRemoteQuest();
  const [questInfo, setQuestInfo] = useState<QuestInfo | null>(null);

  const form = useForm<AddQuestForm>({
    defaultValues: {
      header: {
        ...defaultHeader,
        quest_id: quest.quest_id
      },
      options: { enable: true, only_dev: false, position: 1 },
    },
  });

  useEffect(() => {
    getQuestInfoFromQuest(quest.quest_id, periodToString(quest.period), seasonToNumber(quest.season))
      .then(v => {
        console.log('questInfo: ', v);
        setQuestInfo(v);
      });
  }, [quest]);

  const addQuestToList = async () => {
    if (!questInfo) {
      toast.error('Quest not found!');
      return;
    }

    const values = form.getValues();
    await insertOrUpdateQuestlist({
      header: values.header,
      quest_type_flags: questInfo.quest_type_flags,
      strings: questInfo.strings,
      unk0: questInfo.unk0,
      unk0_len: questInfo.unk0_len,
      unk_data: questInfo.unk_data,
    }, values.options);

    onClose();
  }

  return (
    <div className="drop-shadow-sm border bg-white dark:bg-gray-800 rounded px-3 py-2 flex flex-col flex-wrap items-center gap-6 w-full max-w-sm">
      <GrClose
        className="self-end hover:cursor-pointer dark:text-white"
        onClick={onClose}
      />
      <div>
        <Button type="button" className="mt-5 mx-4" onClick={addQuestToList}>Add to questlist</Button>
      </div>
      <GroupCard title="Options">
        <div>
          <CheckboxField
            label="Enable"
            name="options.enable"
            className=""
            control={form.control}
          />
          <CheckboxField
            label="Only Dev"
            name="options.only_dev"
            control={form.control}
          />
        </div>
        <InputField
          label="Position"
          type="number"
          name="options.position"
          control={form.control}
        />
      </GroupCard>
      <GroupCard title="Quest">
        <SelectField
          label="Mark"
          name="header.mark"
          control={form.control}
          options={quest_mark}
        />
        <SelectField
          label="Category"
          name="header.quest_category"
          control={form.control}
          options={quest_category}
        />
        <InputField
          label="Max Players"
          type="number"
          name="header.max_players"
          control={form.control}
        />
      </GroupCard>
      <GroupCard title="Header Data">
        <UnknownField
          name="Header"
          path=""
          data={form.getValues()}
          control={form.control}
          initialHide
        />
      </GroupCard>
    </div>
  );
}
