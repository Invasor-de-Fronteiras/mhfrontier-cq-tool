import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { open, save } from "@tauri-apps/api/dialog";
import { getPeriotFromQuestTypeFlags, getSeasonFromQuestTypeFlags, QuestDB, QuestDBQueryOptions, QuestInfo } from "../utils";
import { useDatabaseSelected } from "./ConfigContext";
import { useQuestEditor } from "./QuestEditorContext";
import { useTool } from "./ToolContext";
import * as db from '../events/db';
import * as quests from '../events/quest';

interface RemoteQuestContextState {
  getQuests: (options: QuestDBQueryOptions) => Promise<QuestDB[]>;
  countQuests: (options: QuestDBQueryOptions) => Promise<number>;
  getQuestInfoFromQuest: (quest_id: number, period: string, season: number) => Promise<QuestInfo | null>;
  uploadQuests: () => Promise<void>;
  downloadQuest: (quest_id: number, period: string, season: number) => Promise<void>;
  onImportQuests: () => Promise<void>;
}

interface RemoteQuestContextProps {
  children: React.ReactNode;
}

const context = createContext({} as RemoteQuestContextState);

export function RemoteQuestProvider({
  children,
}: RemoteQuestContextProps) {

  const nav = useNavigate();
  const dbSelected = useDatabaseSelected();
  const { loadQuest } = useQuestEditor();
  const { setTool } = useTool();

  const onImportQuests = async (): Promise<void> => {
    try {
      if (!dbSelected) {
        return;
      }
  
      const path = await open({ multiple: false, directory: true });
      if (!path) return;

      const start = Date.now();
      await db.importQuests({
        db_config: dbSelected,
        folderpath: path as string
      });
      const time = Math.floor((Date.now() - start) / 1000);

      toast.success(`Quests imported successfully in ${time}s`);
    } catch (error) {
      toast.error(`Failed to import quests: ${error}`);
    }
  }

  const getQuests = async (options: QuestDBQueryOptions): Promise<QuestDB[]> => {
    try {
      if (!dbSelected) {
        return [];
      }

      const result = await db.getQuests({
        db_config: dbSelected,
        options
      });

      return result;
    } catch (error) {
      toast.error(`Failed to get quests from db: ${error}`);
    }
    return [];
  }

  const countQuests = async (options: QuestDBQueryOptions): Promise<number> => {
    try {
      if (!dbSelected) {
        return 0;
      }

      return await db.countQuests({
        db_config: dbSelected,
        options
      });
    } catch (error) {
      toast.error(`Failed to get quests from db: ${error}`);
    }
    return 0;
  }

  const downloadQuest = async (quest_id: number, period: string, season: number): Promise<void> => {
    try {
      if (!dbSelected) {
        return;
      }

      const filepath = await save({ defaultPath: `${quest_id}_${period}_${season}.bin` });
      if (!filepath) return;

      await db.downloadQuest({
        db_config: dbSelected,
        filepath,
        period,
        quest_id,
        season
      });

      const isLoaded = await loadQuest(filepath);

      if (isLoaded) {
        setTool('QuestEditor');
        nav('/');
      }
    } catch (error) {
      toast.error(`Failed to get quests from db: ${error}`);
    }
  }

  const getQuestInfoFromQuest = async (quest_id: number, period: string, season: number): Promise<QuestInfo | null> => {
    try {
      if (!dbSelected) {
        return null;
      }

      const questInfo = await db.getQuestInfoFromQuest({
        db_config: dbSelected,
        period,
        quest_id,
        season
      });

      return questInfo;
    } catch (error) {
      toast.error(`Failed to get quests from db: ${error}`);
    }

    return null;
  }
 
  const uploadQuest = async (path: string): Promise<void> => {
    if (!dbSelected) {
      return;
    }

    const questInfo = await quests.readQuestInfo(path as string);
    const period = getPeriotFromQuestTypeFlags(questInfo.quest_type_flags);
    const season = getSeasonFromQuestTypeFlags(questInfo.quest_type_flags);

    await db.insertOrUpdateQuest({
      db_config: dbSelected,
      quest_filepath: path as string,
      quest_id: questInfo?.quest_type_flags.main_quest_prop.quest_id,
      period,
      season
    });

    const questlist = await db.getQuestInfo({
      db_config: dbSelected,
      quest_id: questInfo.quest_type_flags.main_quest_prop.quest_id,
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
          quest_type_flags: questInfo.quest_type_flags,
          strings: questInfo.strings
        }
      });
    }
  }

  const uploadQuests = async (): Promise<void> => {
    if (!dbSelected) {
      return;
    }

    try {

      const path = await open({ multiple: true });
      if (!path) return;

      const paths = Array.isArray(path) ? path : [path];

      for (let i=0; i < paths.length; i+=1) {
        try {
          await uploadQuest(paths[i]);
        } catch(error) {
          toast.error(`Failed upload quest ${paths[i]}: ${error}`);
          return;
        }
      }

      toast.success('Quest uploaded successfully!');
    } catch (error) {
      toast.error(`Failed upload quest: ${error}`);
    }
  }

  return (
    <context.Provider value={{
      countQuests,
      downloadQuest,
      getQuestInfoFromQuest,
      getQuests,
      onImportQuests,
      uploadQuests,
    }}>{children}</context.Provider>
  );
}

export const useRemoteQuest = () => useContext(context);
