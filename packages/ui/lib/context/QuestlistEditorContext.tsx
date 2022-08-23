import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { QuestInfo, QuestlistFile } from "../utils";

interface QuestlistForm {
  questlists: QuestlistFile[];
}

interface QuestlistEditorContextState {
  addQuestFromFile: () => QuestInfo | null;
  loadQuestlists: () => void;
  handleSaveQuest: (data: QuestlistFile[]) => void;
  form: UseFormReturn<QuestlistForm>;
  isLoadedQuestlists: boolean;
}

interface QuestlistEditorContextProps extends Omit<QuestlistEditorContextState, "form"> {
  children: React.ReactNode;
  data?: QuestlistForm;
}

const context = createContext({} as QuestlistEditorContextState);

export function QuestlistEditorContextProvider({
  children,
  ...props
}: QuestlistEditorContextProps) {
  const form = useForm<QuestlistForm>({
    defaultValues: props.data,
  });

  useEffect(() => {
    form.reset(props.data);
  }, [props.data]);

  return (
    <context.Provider value={{ form, ...props }}>{children}</context.Provider>
  );
}

export const useQuestlistEditor = () => useContext(context);
