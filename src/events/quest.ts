import { invoke } from "@tauri-apps/api";
import { prepareQuest } from "../utils/prepare";
import { QuestFile, QuestInfo } from "../utils";

interface ExportQuestInfoPayload {
    filepath: string,
    quest_info: QuestInfo
}

interface Result {
    status: string;
    error?: string;
}

export const exportQuestInfo = async (payload: ExportQuestInfoPayload): Promise<void> => {
    const response: string = await invoke("export_quest_info", {
        event: JSON.stringify(payload)
    });

    try {
        if (!response) {
            throw Error("No response!");
        }
        const result = JSON.parse(response) as Result;
        if (result.status !== "Success" || result.error) {
            throw Error(result.error);
        }
    } catch(error) {
        throw error;
    }
}

export const readQuest = async (path: string): Promise<QuestFile> => {
    try {
      const response: string = await invoke("read_quest_file", {
        event: path,
      });

      const quest = JSON.parse(response);
      if (quest && quest.error) {
        throw Error(`Failed to read file: ${quest.error}`);
      }

      return quest as QuestFile;
    } catch (error) {
    throw error;
    }
};

export interface SaveQuestPayload {
    filepath: string;
    quest: QuestFile;
}

export const saveQuest = async (data: SaveQuestPayload) => {
    const quest: QuestFile = prepareQuest(data.quest);
    const payload: SaveQuestPayload = { filepath: data.filepath, quest };

    const response: string = await invoke("save_quest_file", {
      event: JSON.stringify(payload),
    });

    const resData = JSON.parse(response);
    if (resData?.error) {
      throw Error(`Failed to save file: ${resData.error}`);
    }
};

export const readQuestInfo = async (path: string): Promise<QuestInfo> => {
    const response: string = await invoke("read_questinfo", {
        event: path,
    });

    const questInfo = JSON.parse(response);
    if (questInfo?.error) {
        throw Error(`Failed to read file: ${questInfo.error}`);
    }

    return questInfo as QuestInfo;
}