import { useContext } from "react";
import { createContext } from "react";
import { QuestDB, QuestDBQueryOptions, QuestInfo } from "../utils";

interface RemoteQuestContextState {
  getQuests: (options: QuestDBQueryOptions) => Promise<QuestDB[]>;
  countQuests: (options: QuestDBQueryOptions) => Promise<number>;
  getQuestInfoFromQuest: (quest_id: number, period: string, season: number) => Promise<QuestInfo | null>;
  uploadQuest: () => Promise<void>;
  downloadQuest: (quest_id: number, period: string, season: number) => Promise<void>;
}

interface RemoteQuestContextProps extends RemoteQuestContextState {
  children: React.ReactNode;
}

const context = createContext({} as RemoteQuestContextState);

export function RemoteQuestContextProvider({
  children,
  ...props
}: RemoteQuestContextProps) {
  return (
    <context.Provider value={props}>{children}</context.Provider>
  );
}

export const useRemoteQuest = () => useContext(context);
