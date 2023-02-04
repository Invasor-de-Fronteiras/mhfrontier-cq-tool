import { invoke } from "@tauri-apps/api";

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
