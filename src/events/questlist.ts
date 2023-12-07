import { prepareQuest } from "../utils/prepare";
import { QuestFile, QuestInfo, QuestlistFile } from "../utils";
import { invokeEvent } from "./core";

interface SaveQuestlistPayload {
  folder: string;
  questlists: QuestlistFile[];
}

export const saveQuestlist = async (payload: SaveQuestlistPayload): Promise<void> => {
  await invokeEvent<SaveQuestlistPayload, void>(
    'save_all_questlists',
    payload
  );
}

export const readQuestlist = async (path: string): Promise<QuestlistFile[]> => {
  return invokeEvent<string, QuestlistFile[]>(
    'read_all_questlist',
    path
  );
}

export const readQuestInfo = async (path: string): Promise<QuestInfo> => {
  return invokeEvent<string, QuestInfo>(
    'read_questinfo',
    path
  );
}
