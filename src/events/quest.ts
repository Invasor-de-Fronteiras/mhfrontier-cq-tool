import { prepareQuest } from "../utils/prepare";
import { QuestFile, QuestInfo } from "../utils";
import { invokeEvent } from "./core";

interface ExportQuestInfoPayload {
  filepath: string,
  quest_info: QuestInfo
}

export const exportQuestInfo = async (payload: ExportQuestInfoPayload): Promise<void> => {
  await invokeEvent<ExportQuestInfoPayload, void>(
    'export_quest_info',
    payload
  );
}

export const readQuest = async (path: string): Promise<QuestFile> => {
  return invokeEvent<string, QuestFile>(
    'read_quest_file',
    path
  );
};

export interface SaveQuestPayload {
  filepath: string;
  quest: QuestFile;
}

export const saveQuest = async (data: SaveQuestPayload) => {
  const quest: QuestFile = prepareQuest(data.quest);
  const payload: SaveQuestPayload = { filepath: data.filepath, quest };

  await invokeEvent(
    'save_quest_file',
    payload
  );
};

export const readQuestInfo = async (path: string): Promise<QuestInfo> => {
  return invokeEvent<string, QuestInfo>(
    'read_questinfo',
    path
  );
}