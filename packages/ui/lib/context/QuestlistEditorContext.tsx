import { useContext, useEffect, useMemo } from "react";
import { createContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { QuestInfo } from "../utils";

interface QuestlistForm {
  quests: QuestInfo[];
}

interface QuestlistEditorContextState {
  addQuestFromFile: () => QuestInfo | null;
  loadQuestlists: () => void;
  handleSaveQuestlist: (data: QuestInfo[]) => void;
  questlistSubmit: () => void;
  form: UseFormReturn<QuestlistForm>;
  isLoadedQuestlists: boolean;
}

interface QuestlistEditorContextProps extends Omit<QuestlistEditorContextState, "questlistSubmit" | "form"> {
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

  const value = useMemo(() => ({
    form,
    questlistSubmit: () => {
      form.handleSubmit((data) => props.handleSaveQuestlist(data.quests))();
    },
    ...props
  }), [form, props]);

  return (
    <context.Provider value={value}>{children}</context.Provider>
  );
}

export const useQuestlistEditor = () => useContext(context);
