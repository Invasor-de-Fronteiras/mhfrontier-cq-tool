import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { QuestFile, QuestInfo } from "../utils";

interface EditorContextState {
  uploadFile: {
    dragSupport: boolean;
    uploadFileContainerProps: () => React.HTMLAttributes<HTMLDivElement>;
    uploadFileInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
    isDragActive: boolean;
  };
  handleSaveQuest: (data: QuestFile) => void;
  handleExportQuestInfo: (data: QuestInfo) => void;
  insertOrUpdateQuest: (data: QuestFile) => Promise<void>;
  reFrontier?: () => void;
  loadQuest: (filepath?: string) => Promise<void>;
  form: UseFormReturn<QuestFile>;
  isLoadedFile: boolean;
}

interface EditorContextProps extends Omit<EditorContextState, "form"> {
  children: React.ReactNode;
  data?: QuestFile;
}

const context = createContext({} as EditorContextState);

export function EditorContextProvider({
  children,
  ...props
}: EditorContextProps) {
  const form = useForm<QuestFile>({
    defaultValues: props.data,
  });

  useEffect(() => {
    form.reset(props.data);
  }, [props.data]);

  const insertOrUpdateQuest = async () => {
    const values = form.getValues();
    props.insertOrUpdateQuest(values);
  }

  return (
    <context.Provider value={{ form, ...props, insertOrUpdateQuest }}>{children}</context.Provider>
  );
}

export const useEditor = () => useContext(context);
