import { QuestDB, QuestDBQueryOptions, useDatabaseSelected, RemoteQuestContextProvider, useEditor, useTool, QuestInfo, getPeriotFromQuestTypeFlags, getSeasonFromQuestTypeFlags } from "ui";
import { open, save } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';
import * as db from './events/db';
import * as quests from './events/quest';
import { useNavigate } from "react-router-dom";

interface RemoteQuestProps {
    children: React.ReactNode;
}

function RemoteQuest({ children }: RemoteQuestProps) {
  const nav = useNavigate();
  const dbSelected = useDatabaseSelected();
  const { loadQuest } = useEditor();
  const { setTool } = useTool();

  const getQuestsFromDb = async (options: QuestDBQueryOptions): Promise<QuestDB[]> => {
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

  const countQuestsFromDb = async (options: QuestDBQueryOptions): Promise<number> => {
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

      await loadQuest();

      nav('/quest-info');
      setTool('QuestEditor');
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
 
  const uploadQuest = async (): Promise<void> => {
    if (!dbSelected) {
      return;
    }

    try {

      const path = await open({ multiple: false });
      if (!path) return;

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

      toast.success('Quest uploaded successfully!');
    } catch (error) {
      toast.error(`Failed update quest: ${error}`);
    }
  }

  return (
    <RemoteQuestContextProvider
      getQuests={getQuestsFromDb}
      countQuests={countQuestsFromDb}
      downloadQuest={downloadQuest}
      getQuestInfoFromQuest={getQuestInfoFromQuest}
      uploadQuest={uploadQuest}
    >
      {children}
    </RemoteQuestContextProvider>
  );
}

export default RemoteQuest;
