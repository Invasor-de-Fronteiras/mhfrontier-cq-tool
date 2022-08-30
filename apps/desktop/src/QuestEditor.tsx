import { useState } from "react";

import { EditorContextProvider, QuestFile } from "ui";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';

interface SaveQuestPayload {
  filepath: string;
  quest: QuestFile;
}

interface QuestEditorProps {
    children: React.ReactNode;
}

function QuestEditor({ children }: QuestEditorProps) {
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

  const reFrontier = async () => {
    try {
      const filePath = await open({ multiple: false });
      if (!filePath) return;

      const response: string = await invoke("re_frontier", {
        event: JSON.stringify({
          filepath: filePath,
          re_frontier_path: "./ReFrontier/ReFrontier.exe"
        })
      });

      const result = JSON.parse(response) as { message: string, error?: string };
      if (result && result.error) {
        toast.error(`Failed to execute ReFrontier: ${result.error}`);
        return;
      }

      const messages = result.message.split('==============================');
      toast.success(messages[1]);
      toast.success(messages[2]);
    } catch (error) {
      console.error("error ", error);
    }
  };


  return (
    <EditorContextProvider
      data={file}
      handleSaveQuest={handleChangeSave}
      reFrontier={reFrontier}
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
        {children}
    </EditorContextProvider>
  );
}

export default QuestEditor;
