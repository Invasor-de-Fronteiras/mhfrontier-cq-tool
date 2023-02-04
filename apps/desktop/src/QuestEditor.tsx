import { useState } from "react";

import { EditorContextProvider, getPeriotFromQuestTypeFlags, getSeasonFromQuestTypeFlags, QuestFile, QuestInfo, useDatabaseSelected } from "ui";
import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';
import { exportQuestInfo } from "./events";
import * as db from './events/db';
import * as questEvents from './events/quest';

interface QuestEditorProps {
    children: React.ReactNode;
}

function QuestEditor({ children }: QuestEditorProps) {
  const [questPath, setQuestPath] = useState<string | null>(null);
  const [file, setFile] = useState<QuestFile | undefined>(undefined);
  const dbSelected = useDatabaseSelected();

  const handleChangeSave = async (data: QuestFile) => {
    if (!questPath || !data) return;

    try {
      await questEvents.saveQuest({
        filepath: questPath,
        quest: data
      });

      toast.success('Successfully saved quest file!');
    } catch(err) {
      toast.error(`Failed to save file: ${err}`);
    }
  };

  const onReadFile = async (filepath?: string) => {
    try {
      const path = filepath || await open({ multiple: false });
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

  const insertOrUpdateQuest = async (data: QuestFile) => {
    if (!questPath || !data) return;
    if (!dbSelected) {
      return;
    }

    try {
      await questEvents.saveQuest({
        filepath: questPath,
        quest: data
      });

      const period = getPeriotFromQuestTypeFlags(data.quest_type_flags);
      const season = getSeasonFromQuestTypeFlags(data.quest_type_flags);

      await db.insertOrUpdateQuest({
        db_config: dbSelected,
        quest_id: data.quest_type_flags.main_quest_prop.quest_id,
        period,
        season,
        quest_filepath: questPath
      });

      const questlist = await db.getQuestInfo({
        db_config: dbSelected,
        quest_id: data.quest_type_flags.main_quest_prop.quest_id,
        period,
        season
      });

      if (questlist) {
        await db.insertOrUpdateQuestlist({
          db_config: dbSelected,
          options: {
            enable: questlist.enable,
            only_dev: questlist.only_dev,
            position: questlist.position
          },
          quest_info: {
            ...questlist.quest_info,
            quest_type_flags: data.quest_type_flags,
            strings: data.strings
          }
        });
      }

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
      reFrontier={reFrontier}
      isLoadedFile={!!file}
      insertOrUpdateQuest={insertOrUpdateQuest}
      uploadFile={{
        dragSupport: false,
        isDragActive: false,
        uploadFileInputProps: () => ({
          onClick: () => onReadFile(),
        }),
        uploadFileContainerProps: () => ({
          onClick: () => onReadFile(),
        }),
      }}
    >
        {children}
    </EditorContextProvider>
  );
}

export default QuestEditor;
