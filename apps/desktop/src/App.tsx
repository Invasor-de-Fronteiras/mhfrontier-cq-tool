import { useState } from "react";

import { EditorContextProvider, QuestFile, Ui } from "ui";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';

interface SaveQuestPayload {
  filepath: string;
  quest: QuestFile;
}

function App() {
  const [questPath, setQuestPath] = useState<string | null>(null);
  const [file, setFile] = useState<QuestFile | undefined>(undefined);

  const handleChangeSave = async (data: QuestFile) => {
    if (!questPath || !data) return;

    const quest: QuestFile = {
      header: data.header,
      gen_quest_prop: data.gen_quest_prop,
      quest_type_flags: data.quest_type_flags,
      map_info: data.map_info,
      large_monster_pointers: data.large_monster_pointers,
      large_monster_spawns: data.large_monster_spawns,
      large_monster_ids: data.large_monster_spawns.map((v) =>
        v.monster_id >= 255 ? 0 : v.monster_id
      ),
      rewards: data.rewards,
      supply_items: data.supply_items,
    };

    const payload: SaveQuestPayload = { filepath: questPath, quest };

    const response: string = await invoke("save_quest_file", {
      event: JSON.stringify(payload),
    });

    const resData = JSON.parse(response);
    if (resData?.error) {
      console.error("error: ", resData.error);
      toast.error(`Failed to save file: ${resData.error}`);
      return;
    }

    toast.success('Successfully saved quest file!');
  };

  const onReadFile = async () => {
    try {
      const path = await open({ multiple: false });
      if (!path) return;

      const response: string = await invoke("read_quest_file", {
        event: path,
      });

      const quest = JSON.parse(response);
      if (quest && quest.error) {
        toast.error(`Failed to read file: ${quest.error}`);
        // setError(quest.error);
        console.error("response ", response);
        return;
      }

      setFile(quest as QuestFile);
      setQuestPath(path as string);
      toast.success('Quest file read successfully!');
      // setResult(quest);
    } catch (error) {
      console.error("error ", error);
    }
  };

  return (
    <EditorContextProvider
      data={file}
      handleSaveQuest={handleChangeSave}
      isLoadedFile={!!file}
      uploadFile={{
        dragSupport: false,
        isDragActive: false,
        uploadFileInputProps: () => ({
          onClick: onReadFile,
        }),
        uploadFileContainerProps: () => ({
          onClick: onReadFile,
        }),
      }}
    >
      <Ui />
    </EditorContextProvider>
  );
}

export default App;
