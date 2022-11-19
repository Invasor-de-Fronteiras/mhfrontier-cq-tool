import { useState } from "react";

import { EditorContextProvider, QuestFile, QuestInfo } from "ui";
import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';
import { MapZones } from "ui/lib/utils/quest-file/mapZones";
import { exportQuestInfo, getConfig, updateQuest } from "./events";

interface SaveQuestPayload {
  filepath: string;
  quest: QuestFile;
}

interface QuestEditorProps {
    children: React.ReactNode;
}

const prepareMapZones = (mapZones: MapZones) => {
  mapZones.map_zones.forEach(mapZone => {
    mapZone.map_sections.forEach(mapSection => {
      const monsterIds = mapSection.small_monster_spawns.reduce<Record<number, boolean>>((acc, cur) => {
        acc[cur.monster_id] = true;
        return acc;
      }, {});

      mapSection.monster_ids = Object.keys(monsterIds).map(v => parseInt(v, 10));
    })
  });

  return mapZones;
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
      map_zones: prepareMapZones(data.map_zones),
      large_monster_pointers: data.large_monster_pointers,
      large_monster_spawns: data.large_monster_spawns,
      large_monster_ids: data.large_monster_spawns.map((v) =>
        v.monster_id >= 255 ? 0 : v.monster_id
      ),
      rewards: data.rewards,
      supply_items: data.supply_items,
      loaded_stages: data.loaded_stages,
      strings: data.strings,
      unk_data: data.unk_data
    };
    console.log('save: ', quest);

    const payload: SaveQuestPayload = { filepath: questPath, quest };

    const response: string = await invoke("save_quest_file", {
      event: JSON.stringify(payload),
    });
    console.log('response: ', response);

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
      console.log('quest: ', quest);

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

  const handleExportQuestInfo = async (data: QuestInfo) => {
    try {
      if (!questPath) return;
      const filepath = await save({ defaultPath: questPath.replace('.bin', '-info.bin') });
      if (!filepath) return;

      await exportQuestInfo({ quest_info: data, filepath: filepath as string });
      toast.success('Quest exported successfully!');
    } catch (error) {
      toast.error(`Failed to export quest info: ${error}`);
    }
  }

  const handleUpdateQuest = async (data: QuestInfo) => {
    try {
      const config = await getConfig();
      if (
        !config ||
        (!config.dbs || config.dbs.length === 0)
      ) {
        return;
      }

      await updateQuest({
        db_config: config.dbs[0],
        quest: data
      });

      toast.success('Quest updated successfully!');
    } catch (error) {
      toast.error(`Failed update quest: ${error}`);
    }
  }


  return (
    <EditorContextProvider
      data={file}
      handleSaveQuest={handleChangeSave}
      loadQuest={onReadFile}
      handleExportQuestInfo={handleExportQuestInfo}
      handleUpdateQuest={handleUpdateQuest}
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
