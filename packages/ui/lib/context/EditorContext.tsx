import { useContext } from "react";
import { createContext } from "react";
import { QuestFile } from "../utils";

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