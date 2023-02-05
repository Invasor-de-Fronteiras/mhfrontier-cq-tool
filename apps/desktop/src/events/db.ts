import { invoke } from "@tauri-apps/api";
import { Config, DBConfig, QuestDB, QuestDBQueryOptions, QuestInfo, QuestlistDB, QuestlistDBOptions, QuestlistDBQueryOptions, QuestlistDBWithInfo } from "ui";

interface ImportQuestlistPayload {
    db_config: DBConfig;
    filepath: string;
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

interface DownloadQuestPayload {
    db_config: DBConfig;
    filepath: string;
    quest_id: number;
    period: string;
    season: number;
}

export const downloadQuest = async (payload: DownloadQuestPayload): Promise<boolean> => {
    const response: string = await invoke("db_download_quest", {
        event: JSON.stringify(payload)
    });

    if (!response) {
        throw Error("No response!");
    }

    const result = JSON.parse(response) as Result;
    if ((result as Result).error) {
        throw Error(result.error);
    }

    return result.status === "Success";
}

interface GetQuestInfoPayload {
    db_config: DBConfig,
    quest_id: number;
    period: string;
    season: number;
}

export const getQuestInfo = async (payload: GetQuestInfoPayload): Promise<QuestlistDBWithInfo | null> => {
    const response: string = await invoke("db_get_questlist_info", {
        event: JSON.stringify(payload)
    });

    if (!response) {
        throw Error("No response!");
    }

    const result = JSON.parse(response);
    if (result && (result as Result).error) {
        throw Error(result.error);
    }

    return result as QuestlistDBWithInfo;
}

export const getQuestInfoFromQuest = async (payload: GetQuestInfoPayload): Promise<QuestInfo | null> => {
    const response: string = await invoke("db_get_quest_info_from_quest", {
        event: JSON.stringify(payload)
    });

    if (!response) {
        throw Error("No response!");
    }

    const result = JSON.parse(response);
    if (result && (result as Result).error) {
        throw Error(result.error);
    }

    return result as QuestInfo;
}


interface GetQuestsPayload {
    db_config: DBConfig;
    options: QuestDBQueryOptions;
}

export const getQuests = async (payload: GetQuestsPayload): Promise<QuestDB[]> => {
    const response: string = await invoke("db_get_quests", {
        event: JSON.stringify(payload)
    });

    try {
        if (!response) {
            throw Error("No response!");
        }
        const result = JSON.parse(response);
        if ((result as Result).error) {
            throw Error(result.error);
        }

        return result as QuestDB[];
    } catch(error) {
        throw error;
    }
}

export const countQuests = async (payload: GetQuestsPayload): Promise<number> => {
    const response: string = await invoke("db_count_quests", {
        event: JSON.stringify(payload)
    });

    if (!response) {
        throw Error("No response!");
    }
    const result = JSON.parse(response);
    if ((result as Result).error) {
        throw Error(result.error);
    }

    return result as number;
}

interface InsertOrUpdateQuestPayload {
    db_config: DBConfig;
    quest_id: number;
    period: string;
    season: number;
    quest_filepath: string;
}

export const insertOrUpdateQuest = async (payload: InsertOrUpdateQuestPayload): Promise<void> => {
    const response: string = await invoke("db_insert_or_update_quest", {
        event: JSON.stringify(payload)
    });

    if (!response) {
        throw Error("No response!");
    }
    const result = JSON.parse(response);
    if ((result as Result).error) {
        throw Error(result.error);
    }
}


interface GetQuestlistPayload {
    db_config: DBConfig;
    options: QuestlistDBQueryOptions;
}

export const getQuestlists = async (payload: GetQuestlistPayload): Promise<QuestlistDB[]> => {
    const response: string = await invoke("db_get_questlists", {
        event: JSON.stringify(payload)
    });

    try {
        if (!response) {
            throw Error("No response!");
        }
        const result = JSON.parse(response);
        if ((result as Result).error) {
            throw Error(result.error);
        }

        return result as QuestlistDB[];
    } catch(error) {
        throw error;
    }
}

export const countQuestlist = async (payload: GetQuestlistPayload): Promise<number> => {
    const response: string = await invoke("db_count_questlist", {
        event: JSON.stringify(payload)
    });

    if (!response) {
        throw Error("No response!");
    }
    const result = JSON.parse(response);
    if ((result as Result).error) {
        throw Error(result.error);
    }

    return result as number;
}

interface InsertOrUpdateQuestlistPayload {
    db_config: DBConfig;
    quest_info: QuestInfo;
    options: QuestlistDBOptions;
}

export const insertOrUpdateQuestlist = async (payload: InsertOrUpdateQuestlistPayload): Promise<void> => {
    
    const response: string = await invoke("db_insert_or_update_questlist", {
        event: JSON.stringify(payload)
    });

    if (!response) {
        throw Error("No response!");
    }
    const result = JSON.parse(response);
    if ((result as Result).error) {
        throw Error(result.error);
    }
}

interface UpdateQuestlistOptionsPayload {
    db_config: DBConfig;
    quest_id: number;
    period: string;
    season: number;
    options: QuestlistDBOptions;
}

export const updateQuestlistOptions = async (payload: UpdateQuestlistOptionsPayload): Promise<void> => {
    const response: string = await invoke("db_update_questlist_options", {
        event: JSON.stringify(payload)
    });

    if (!response) {
        throw Error("No response!");
    }
    const result = JSON.parse(response);
    if ((result as Result).error) {
        throw Error(result.error);
    }
}