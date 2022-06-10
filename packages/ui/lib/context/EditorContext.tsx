import { useContext } from "react";
import { createContext } from "react";
import { GenQuestProp, MainQuestProp, Objective, QuestFile, QuestObjective, QuestTypeFlags } from "../utils";

interface EditorContextState {
  data?: QuestFile;
  uploadFile: {
    dragSupport: boolean;
    uploadFileContainerProps: () => React.HTMLAttributes<HTMLDivElement>;
    uploadFileInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
    isDragActive: boolean;
  },
  handleSaveQuest: () => void;
  onChangeData: (handler: (data: QuestFile) => QuestFile) => void;
}

interface EditorContextProps extends EditorContextState {
  children: React.ReactNode;
}

const context = createContext({} as EditorContextState);

export function EditorContextProvider({
  children,
  ...props
}: EditorContextProps) {
  return <context.Provider value={props}>{children}</context.Provider>;
}

export const useEditor = () => useContext(context);

// Hooks
export const useGenQuestProp = () => {
  const { data, onChangeData } = useEditor();

  const changeGenQuest = (handler: (data: GenQuestProp) => GenQuestProp) => {
    onChangeData((prev) => ({
      ...prev,
      gen_quest_prop: handler(prev.gen_quest_prop)
    }));
  };

  return { changeGenQuest, genQuestProp: data?.gen_quest_prop };
}

export const useQuestTypeFlag = () => {
  const { data, onChangeData } = useEditor();

  const changeQuestTypeFlags = (handler: (data: QuestTypeFlags) => QuestTypeFlags) => {
    onChangeData((prev) => ({
      ...prev,
      quest_type_flags: handler(prev.quest_type_flags)
    }));
  };

  return { changeQuestTypeFlags, questTypeFlag: data?.quest_type_flags };
}

export const useMainQuestProp = () => {
  const { questTypeFlag, changeQuestTypeFlags } = useQuestTypeFlag();

  const changeMainQuestProp = (handler: (data: MainQuestProp) => MainQuestProp) => {
    changeQuestTypeFlags((prev) => ({
      ...prev,
      main_quest_prop: handler(prev.main_quest_prop)
    }));
  };

  return { changeMainQuestProp, mainQuestProp: questTypeFlag?.main_quest_prop };
}

export const useQuestObjective = () => {
  const { mainQuestProp, changeMainQuestProp } = useMainQuestProp();

  const changeQuestObjective = (handler: (data: QuestObjective) => QuestObjective) => {
    changeMainQuestProp((prev) => ({
      ...prev,
      objectives: handler(prev.objectives)
    }));
  };

  return { changeQuestObjective, questObjectives: mainQuestProp?.objectives };
}