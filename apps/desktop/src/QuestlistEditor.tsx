import { useMemo, useState } from "react";

import { QuestInfo, QuestlistEditorContextProvider, QuestlistFile } from "ui";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';

// interface SaveQuestlistPayload {
//   folder: string;
//   questlists: QuestlistFile[];
// }

interface QuestlistEditorProps {
    children: React.ReactNode;
}

function QuestlistEditor({ children }: QuestlistEditorProps) {
  const [questlistPath, setQuestlistPath] = useState<string | null>(null);
  const [questlists, setQuestlists] = useState<QuestlistFile[] | undefined>(undefined);
  const data = useMemo(() => ({ questlists: questlists || [] }), [questlists]);

  const handleChangeSave = async (data: QuestlistFile[]) => {
    if (!questlistPath || !data) return;

    // const quest: QuestFile = {
    //   header: data.header,
    //   gen_quest_prop: data.gen_quest_prop,
    //   quest_type_flags: data.quest_type_flags,
    //   map_info: data.map_info,
    //   large_monster_pointers: data.large_monster_pointers,
    //   large_monster_spawns: data.large_monster_spawns,
    //   large_monster_ids: data.large_monster_spawns.map((v) =>
    //     v.monster_id >= 255 ? 0 : v.monster_id
    //   ),
    //   rewards: data.rewards,
    //   supply_items: data.supply_items,
    // };

    // const payload: SaveQuestlistPayload = { filepath: questPath, quest };

    // const response: string = await invoke("save_quest_file", {
    //   event: JSON.stringify(payload),
    // });

    // const resData = JSON.parse(response);
    // if (resData?.error) {
    //   console.error("error: ", resData.error);
    //   toast.error(`Failed to save file: ${resData.error}`);
    //   return;
    // }

    // toast.success('Successfully saved quest file!');
  };

  const loadQuestlists = async () => {
    try {
      const path = await open({ multiple: false, directory: true });
      if (!path) return;

      const response: string = await invoke("read_all_questlist", {
        event: path,
      });

      console.log('load questlist: ', response);
      const questlists = JSON.parse(response);
      console.log('load questlist (json): ', questlists);
      if (questlists && questlists.error) {
        toast.error(`Failed to read file: ${questlists.error}`);
        console.error("response ", response);
        return;
      }

      setQuestlists(questlists as QuestlistFile[]);
      setQuestlistPath(path as string);
      toast.success('Quest file read successfully!');
    } catch (error) {
      console.error("error ", error);
    }
  };

  const addQuestFromFile = (): QuestInfo | null => {
    return null;
  }

  return (
    <QuestlistEditorContextProvider
      data={data}
      handleSaveQuest={handleChangeSave}
      isLoadedQuestlists={!!questlists}
      loadQuestlists={loadQuestlists}
      addQuestFromFile={addQuestFromFile}
    >
      {children}
    </QuestlistEditorContextProvider>
  );
}

export default QuestlistEditor;
