import { invoke } from "@tauri-apps/api";
import { Config, DBConfig, QuestFile, QuestInfo } from "ui";

interface ImportQuestlistPayload {
    db_config: DBConfig;
    filepath: string;
}

interface UpdateQuestPayload {
    db_config: DBConfig;
    quest: QuestInfo;
}

interface ExportQuestInfoPayload {
    filepath: string,
    quest_info: QuestInfo
}

interface Result {
    status: string;
    error?: string;
}

export const getConfig = async (): Promise<Config | null> => {
    const response: string = await invoke("get_config");

    try {
        if (!response) {
            return null;
        }

        return JSON.parse(response) as Config
    } catch {
        return null;
    }
}

export const importQuestlists = async (payload: ImportQuestlistPayload): Promise<void> => {
    const response: string = await invoke("db_import_questlist", {
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

export const updateQuest = async (payload: UpdateQuestPayload): Promise<void> => {
    const response: string = await invoke("db_update_quest", {
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

export const refrontier = async (filepath: string): Promise<string> => {
    const response: string = await invoke("re_frontier", {
        event: JSON.stringify({
            filepath,
            re_frontier_path: "./ReFrontier/ReFrontier.exe",
        })
    });
    
    try {
        if (!response) {
            throw Error("No response!");
        }

        const result = JSON.parse(response) as { message: string, error?: string };

        if (result.error) {
            throw Error(`Failed to execute ReFrontier: ${result.error}`);
        }

        return result.message;
    } catch (error) {
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