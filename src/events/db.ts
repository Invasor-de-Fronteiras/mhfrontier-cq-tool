import { Config, DBConfig } from "../context/ConfigContext";
import { QuestDB, QuestDBQueryOptions, QuestInfo, QuestlistDB, QuestlistDBOptions, QuestlistDBQueryOptions, QuestlistDBWithInfo } from "../utils";
import { invokeEvent } from "./core";

interface ImportQuestlistPayload {
    db_config: DBConfig;
    filepath: string;
}

export const getConfig = async (): Promise<Config | null> => {
    return invokeEvent('get_config');
}

export const importQuestlists = async (payload: ImportQuestlistPayload): Promise<void> => {
    return invokeEvent('db_import_questlist', payload);
}

interface ImportQuestsPayload {
    db_config: DBConfig;
    folderpath: string;
}

export const importQuests = async (payload: ImportQuestsPayload): Promise<void> => {
    return invokeEvent('db_import_quests', payload);
}

interface DownloadQuestPayload {
    db_config: DBConfig;
    filepath: string;
    quest_id: number;
    period: string;
    season: number;
}

export const downloadQuest = async (payload: DownloadQuestPayload): Promise<boolean> => {
    await invokeEvent('db_download_quest', payload);
    return true;
}

interface GetQuestInfoPayload {
    db_config: DBConfig,
    quest_id: number;
    period: string;
    season: number;
}

export const getQuestInfo = async (payload: GetQuestInfoPayload): Promise<QuestlistDBWithInfo | null> => {
    return invokeEvent('db_get_questlist_info', payload);
}

export const getQuestInfoFromQuest = async (payload: GetQuestInfoPayload): Promise<QuestInfo | null> => {
    return invokeEvent('db_get_quest_info_from_quest', payload);
}


interface GetQuestsPayload {
    db_config: DBConfig;
    options: QuestDBQueryOptions;
}

export const getQuests = async (payload: GetQuestsPayload): Promise<QuestDB[]> => {
    return invokeEvent('db_get_quests', payload);
}

export const countQuests = async (payload: GetQuestsPayload): Promise<number> => {
    return invokeEvent('db_count_quests', payload);
}

interface InsertOrUpdateQuestPayload {
    db_config: DBConfig;
    quest_id: number;
    period: string;
    season: number;
    quest_filepath: string;
}

export const insertOrUpdateQuest = async (payload: InsertOrUpdateQuestPayload): Promise<void> => {
    return invokeEvent('db_insert_or_update_quest', payload);
}


interface GetQuestlistPayload {
    db_config: DBConfig;
    options: QuestlistDBQueryOptions;
}

export const getQuestlists = async (payload: GetQuestlistPayload): Promise<QuestlistDB[]> => {
    return invokeEvent('db_get_questlists', payload);
}

export const countQuestlist = async (payload: GetQuestlistPayload): Promise<number> => {
    return invokeEvent('db_count_questlist', payload);
}

interface InsertOrUpdateQuestlistPayload {
    db_config: DBConfig;
    quest_info: QuestInfo;
    options: QuestlistDBOptions;
}

export const insertOrUpdateQuestlist = async (payload: InsertOrUpdateQuestlistPayload): Promise<void> => {
    return invokeEvent('db_insert_or_update_questlist', payload);
}

interface UpdateQuestlistOptionsPayload {
    db_config: DBConfig;
    quest_id: number;
    period: string;
    season: number;
    options: QuestlistDBOptions;
}

export const updateQuestlistOptions = async (payload: UpdateQuestlistOptionsPayload): Promise<void> => {
    return invokeEvent('db_update_questlist_options', payload);
}