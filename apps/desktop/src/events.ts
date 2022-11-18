import { invoke } from "@tauri-apps/api";
import { Config, DBConfig, QuestInfo } from "ui";

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