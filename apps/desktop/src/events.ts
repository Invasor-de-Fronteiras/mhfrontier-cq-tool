import { invoke } from "@tauri-apps/api";

interface DBConfig {
    name: string;
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

interface Config {
    dbs: DBConfig[];
    bin_path: string;
}

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

    console.log('response: ', response);
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