import * as React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../useTheme";
import { useLayout } from "./LayoutContext";

export function LayoutBody({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const { isOpen, onToggle } = useLayout();

  return (
    <div className="flex-1 overflow-x-auto border-t flex flex-col h-screen rounded-y rounded-r dark:border-slate-800">
      <div className="border-b dark:border-slate-800 h-14 flex items-center  px-4">
        <div
          className="p-2 border-2 rounded hover:border-emerald-500 hover:text-emerald-500 cursor-pointer md:hidden "
          onClick={onToggle}
        >
          {isOpen ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
        </div>
        <h2 className="font-semibold text-center flex-1 dark:text-slate-200">
          {title}
        </h2>
        <div
          className="p-2 border cursor-pointer text-black dark:text-white"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </div>
      </div>
      <div className="px-3 pt-3 pb-20 h-full max-h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}
