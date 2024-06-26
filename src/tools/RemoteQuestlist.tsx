import { open } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';
import * as db from '../events/db';
import { useDatabaseSelected } from "../context/ConfigContext";
import { QuestInfo, QuestlistDB, QuestlistDBOptions, QuestlistDBQueryOptions, QuestlistDBWithInfo } from "../utils";
import { RemoteQuestlistContextProvider } from "../context/RemoteQuestlistContext";

interface RemoteQuestlistProps {
    children: React.ReactNode;
}

function RemoteQuestlist({ children }: RemoteQuestlistProps) {
  const dbSelected = useDatabaseSelected();

  const onImportQuestlists = async (): Promise<void> => {
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
    <RemoteQuestlistContextProvider
      importQuestlists={onImportQuestlists}
      getQuestlists={getQuestlists}
      countQuestlists={countQuestlists}
      insertOrUpdateQuestlist={insertOrUpdateQuestlist}
      updateQuestlistOptions={updateQuestlistOptions}
      getQuestInfo={getQuestInfo}
    >
      {children}
    </RemoteQuestlistContextProvider>
  );
}

export default RemoteQuestlist;
