import { useContext } from "react";
import { createContext } from "react";
import { QuestInfo, QuestlistDB, QuestlistDBOptions, QuestlistDBQueryOptions, QuestlistDBWithInfo } from "../utils";

interface RemoteQuestlistContextState {
  getQuestlists: (options: QuestlistDBQueryOptions) => Promise<QuestlistDB[]>;
  countQuestlists: (options: QuestlistDBQueryOptions) => Promise<number>;
  getQuestInfo: (quest_id: number, period: string, season: number) => Promise<QuestlistDBWithInfo | null>;
  insertOrUpdateQuestlist: (quest_info: QuestInfo, options: QuestlistDBOptions) => Promise<void>;
  importQuestlists: () => Promise<void>;
  updateQuestlistOptions: (quest_id: number, period: string, season: number, options: QuestlistDBOptions) => Promise<void>;
}

interface RemoteQuestlistContextProps extends RemoteQuestlistContextState {
  children: React.ReactNode;
}

const context = createContext({} as RemoteQuestlistContextState);

export function RemoteQuestlistContextProvider({
  children,
  ...props
}: RemoteQuestlistContextProps) {
  return (
    <context.Provider value={props}>{children}</context.Provider>
  );
}

export const useRemoteQuestlist = () => useContext(context);
