import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { QuestFile } from "../utils";

interface EditorContextState {
  uploadFile: {
    dragSupport: boolean;
    uploadFileContainerProps: () => React.HTMLAttributes<HTMLDivElement>;
    uploadFileInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
    isDragActive: boolean;
  };
  handleSaveQuest: (data: QuestFile) => void;
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

  return (
    <context.Provider value={{ form, ...props }}>{children}</context.Provider>
  );
}

export const useEditor = () => useContext(context);
