import { useState } from "react";

import { EditorContextProvider, QuestFile, Ui } from "ui";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";

interface SaveQuestPayload {
  filepath: string;
  quest: QuestFile;
}

function App() {
  const [questPath, setQuestPath] = useState<string | null>(null);
  const [data, setData] = useState<QuestFile | undefined>(undefined);

  const handleChangeSave = async (data: QuestFile) => {
    if (!questPath || !data) return;

    const quest: QuestFile = {
      header: data.header,
      gen_quest_prop: data.gen_quest_prop,
      quest_type_flags: data.quest_type_flags,
      map_info: data.map_info,
      large_monster_pointers: data.large_monster_pointers,
      large_monster_spawns: data.large_monster_spawns,
      large_monster_ids: data.large_monster_spawns.map((v) => v.monster_id >= 255 ? 0 : v.monster_id),
    };

    const payload: SaveQuestPayload = { filepath: questPath, quest };

    const response: string = await invoke("save_quest_file", {
      event: JSON.stringify(payload),
    });

    console.log("response: ", response);

    const resData = JSON.parse(response);
    if (resData?.error) {
      console.log("error: ", resData.error);
      return;
    }
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
        // setError(quest.error);
        console.log("response ", response);
        return;
      }

      setData(quest as QuestFile);
      setQuestPath(path as string);
      // setResult(quest);
      console.log("response ", response);
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <EditorContextProvider
      data={data}
      handleSaveQuest={handleChangeSave}
      isLoadedFile={data !== null}
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
