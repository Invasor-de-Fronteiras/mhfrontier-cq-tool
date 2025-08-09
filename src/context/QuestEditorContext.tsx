import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { getPeriotFromQuestTypeFlags, getSeasonFromQuestTypeFlags, QuestFile, QuestInfo } from "../utils";
import { toast } from "react-toastify";
import events from "../events";
import { save, open } from "@tauri-apps/api/dialog";
import { useDatabaseSelected } from "./ConfigContext";

interface EditorContextState {
  uploadFile: {
    dragSupport: boolean;
    uploadFileContainerProps: () => React.HTMLAttributes<HTMLDivElement>;
    uploadFileInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
    isDragActive: boolean;
  };
  handleSaveQuest: (data: QuestFile) => void;
  handleExportQuestInfo: (data: QuestInfo) => void;
  insertOrUpdateQuest: () => Promise<void>;
  reFrontier?: () => void;
  loadQuest: (filepath?: string) => Promise<boolean>;
  form: UseFormReturn<QuestFile>;
  isLoadedFile: boolean;
}

interface QuestEditorProps {
  children: React.ReactNode;
  // insertOrUpdateQuest: (data: QuestFile) => Promise<void>;
  // data?: QuestFile;
}

const context = createContext({} as EditorContextState);

export function QuestEditorProvider({
  children,
}: QuestEditorProps) {
  const [questPath, setQuestPath] = useState<string | null>(null);
  const [file, setFile] = useState<QuestFile | undefined>(undefined);
  const dbSelected = useDatabaseSelected();

  const form = useForm<QuestFile>({
    defaultValues: file,
  });

  useEffect(() => {
    form.reset(file);
  }, [file]);

  // const insertOrUpdateQuest = async () => {
  //   const values = form.getValues();
  //   props.insertOrUpdateQuest(values);
  // }

  const handleSaveQuest = async (data: QuestFile) => {
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

  const loadQuest = async (filepath?: string): Promise<boolean> => {
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

  const insertOrUpdateQuest = async () => {
    const data = form.getValues();

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
    <context.Provider value={{
      form,
      insertOrUpdateQuest,
      handleExportQuestInfo,
      handleSaveQuest,
      isLoadedFile: !!file,
      loadQuest,
      reFrontier,
      uploadFile: {
        dragSupport: false,
        isDragActive: false,
        uploadFileInputProps: () => ({
          onClick: () => loadQuest(),
        }),
        uploadFileContainerProps: () => ({
          onClick: () => loadQuest(),
        }),
      }
    }}>{children}</context.Provider>
  );
}

export const useQuestEditor = () => useContext(context);
