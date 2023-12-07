import { useState } from "react";

import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';
import events from "../events";
import { QuestFile, QuestInfo, getPeriotFromQuestTypeFlags, getSeasonFromQuestTypeFlags } from "../utils";
import { useDatabaseSelected } from "../context/ConfigContext";
import { EditorContextProvider } from "../context/EditorContext";

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
      await events.quest.saveQuest({
        filepath: questPath,
        quest: data
      });

      toast.success('Successfully saved quest file!');
    } catch(err) {
      toast.error(`Failed to save quest file: ${err}`);
    }
  };

  const onReadFile = async (filepath?: string): Promise<boolean> => {
    try {
      const path = filepath || await open({ multiple: false });
      if (!path) return false;

      const quest = await events.quest.readQuest(path as string);

      setFile(quest);
      setQuestPath(path as string);
      toast.success('Quest file read successfully!');
      return true;
    } catch (error) {
      toast.error(`Failed to read quest file: ${error}`);
    }

    return false;
  };

  const reFrontier = async () => {
    try {
      const filePath = await open({ multiple: false });
      if (!filePath) return;

      const message = await events.refrontier.refrontier(filePath as string);
      const messages = message.split('==============================');
      messages.forEach(v => {
        toast.success(v);
      });

    } catch (error) {
      toast.error(`Failed to execute ReFrontier: ${error}`);
    }
  };

  const handleExportQuestInfo = async (data: QuestInfo) => {
    try {
      if (!questPath) return;
      const filepath = await save({ defaultPath: questPath.replace('.bin', '-info.bin') });
      if (!filepath) return;

      await events.quest.exportQuestInfo({ quest_info: data, filepath: filepath as string });
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
      await events.quest.saveQuest({
        filepath: questPath,
        quest: data
      });

      const period = getPeriotFromQuestTypeFlags(data.quest_type_flags);
      const season = getSeasonFromQuestTypeFlags(data.quest_type_flags);

      await events.db.insertOrUpdateQuest({
        db_config: dbSelected,
        quest_id: data.quest_type_flags.main_quest_prop.quest_id,
        period,
        season,
        quest_filepath: questPath
      });

      const questlist = await events.db.getQuestInfo({
        db_config: dbSelected,
        quest_id: data.quest_type_flags.main_quest_prop.quest_id,
        period,
        season
      });

      if (questlist) {
        await events.db.insertOrUpdateQuestlist({
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
