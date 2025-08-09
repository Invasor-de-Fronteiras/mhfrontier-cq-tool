import * as React from "react";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useQuestEditor } from "../../context/QuestEditorContext";

export interface LayoutContextState {
  isOpen: boolean;
  onToggle: () => void;
}

const context = createContext({} as LayoutContextState);

export const useLayout = () => {
  const layoutContext = useContext(context);
  return layoutContext;
}
export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const { form, handleSaveQuest } = useQuestEditor();

  return (
    <context.Provider value={{ isOpen, onToggle: () => setIsOpen(!isOpen) }}>
      <form
        className="w-full h-full flex flex-row dark:bg-[#282a36] dark:text-zinc-400"
        onSubmit={form.handleSubmit((data) => {
          handleSaveQuest(data);
        })}
      >
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 md:hidden z-10"
          />
        )}

        {children}
      </form>
    </context.Provider>
  );
}