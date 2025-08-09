import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { open } from "@tauri-apps/api/dialog";
import { QuestInfo, QuestlistDB, QuestlistDBOptions, QuestlistDBQueryOptions, QuestlistDBWithInfo } from "../utils";
import * as db from '../events/db';
import { useDatabaseSelected } from "./ConfigContext";

interface RemoteQuestlistContextState {
  getQuestlists: (options: QuestlistDBQueryOptions) => Promise<QuestlistDB[]>;
  countQuestlists: (options: QuestlistDBQueryOptions) => Promise<number>;
  getQuestInfo: (quest_id: number, period: string, season: number) => Promise<QuestlistDBWithInfo | null>;
  insertOrUpdateQuestlist: (quest_info: QuestInfo, options: QuestlistDBOptions) => Promise<void>;
  importQuestlists: () => Promise<void>;
  updateQuestlistOptions: (quest_id: number, period: string, season: number, options: QuestlistDBOptions) => Promise<void>;
}

interface RemoteQuestlistProviderProps {
  children: React.ReactNode;
}

const context = createContext({} as RemoteQuestlistContextState);

export function RemoteQuestlistProvider({
  children
}: RemoteQuestlistProviderProps) {
  const dbSelected = useDatabaseSelected();

  const importQuestlists = async (): Promise<void> => {
    try {
      if (!dbSelected) {
        return;
      }
  
      const path = await open({ multiple: false, directory: true });
      if (!path) return;

      await db.importQuestlists({
        db_config: dbSelected,
        filepath: path as string
      });

      toast.success('Questlist imported successfully!');
    } catch (error) {
      toast.error(`Failed to import questlist: ${error}`);
    }
  }

  const getQuestlists = async (options: QuestlistDBQueryOptions): Promise<QuestlistDB[]> => {
    try {
      if (!dbSelected) {
        return [];
      }

      const result = await db.getQuestlists({
        db_config: dbSelected,
        options
      });

      return result;
    } catch (error) {
      toast.error(`Failed to get quests from db: ${error}`);
    }
    return [];
  }

  const countQuestlists = async (options: QuestlistDBQueryOptions): Promise<number> => {
    try {
      if (!dbSelected) {
        return 0;
      }

      return await db.countQuestlist({
        db_config: dbSelected,
        options
      });
    } catch (error) {
      toast.error(`Failed to count questlists from db: ${error}`);
    }
    return 0;
  }

  const insertOrUpdateQuestlist = async (quest_info: QuestInfo, options: QuestlistDBOptions): Promise<void> => {
    try {
      if (!dbSelected) {
        return;
      }

      await db.insertOrUpdateQuestlist({
        db_config: dbSelected,
        quest_info,
        options
      });

      toast.success('Questlist updated successfully!');
    } catch (error) {
      toast.error(`Failed to insert or update questlist: ${error}`);
    }
  }

  const updateQuestlistOptions = async (quest_id: number, period: string, season: number, options: QuestlistDBOptions): Promise<void> => {
    try {
      if (!dbSelected) {
        return;
      }

      await db.updateQuestlistOptions({
        db_config: dbSelected,
        quest_id,
        period,
        season,
        options
      });
    } catch (error) {
      toast.error(`Failed to update questlists options: ${error}`);
    }
  }

  const getQuestInfo = async (quest_id: number, period: string, season: number): Promise<QuestlistDBWithInfo | null> => {
    try {
      if (!dbSelected) {
        return null;
      }

      return db.getQuestInfo({
        db_config: dbSelected,
        quest_id,
        period,
        season
      });
    } catch (error) {
      toast.error(`Failed to update questlists options: ${error}`);
    }
    return null;
  }

  return (
    <context.Provider value={{
      countQuestlists,
      getQuestInfo,
      getQuestlists,
      importQuestlists,
      insertOrUpdateQuestlist,
      updateQuestlistOptions,
    }}>{children}</context.Provider>
  );
}

export const useRemoteQuestlist = () => useContext(context);
