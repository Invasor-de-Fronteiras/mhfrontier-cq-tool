import { useContext, useMemo, useState } from "react";
import { createContext } from "react";

export interface ToolState {
    tool: string;
    setTool: (value: string) => void;
    tools: string[];
}

interface ToolContextProps {
  children: React.ReactNode;
}

const context = createContext<ToolState>({} as ToolState);

export function ToolContextProvider({
  children,
}: ToolContextProps) {
  const [tool, setTool] = useState('QuestEditor');

  const tools = useMemo(() => ([
    'QuestEditor',
    'QuestlistEditor',
    'RemoteEditor',
  ]), []);
  
  return (
    <context.Provider value={{ tool, setTool, tools }}>{children}</context.Provider>
  );
}

export const useTool = () => useContext(context);

