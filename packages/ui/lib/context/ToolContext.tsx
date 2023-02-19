import { useContext, useState } from "react";
import { createContext } from "react";

export interface ToolState {
    tool: string;
    setTool: (value: string) => void;
}

interface ToolContextProps {
  children: React.ReactNode;
}

const context = createContext<ToolState>({} as ToolState);

export function ToolContextProvider({
  children,
}: ToolContextProps) {
  const [tool, setTool] = useState('QuestEditor');
  
  return (
    <context.Provider value={{ tool, setTool }}>{children}</context.Provider>
  );
}

export const useTool = () => useContext(context);

