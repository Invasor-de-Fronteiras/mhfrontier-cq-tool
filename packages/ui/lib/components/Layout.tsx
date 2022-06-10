import type { IconType } from "react-icons";
import classnames from "classnames";
import * as React from "react";
import { createContext, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useContext } from "react";
import { VERSION } from "../constants";
import { useLocation } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../useTheme";
import { useEditor } from "../context/EditorContext";

interface ContextState {
  isOpen: boolean;
  onToggle: () => void;
}

const context = createContext({} as ContextState);

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const { form, handleSaveQuest } = useEditor();

  return (
    <context.Provider value={{ isOpen, onToggle: () => setIsOpen(!isOpen) }}>
      <form
        className="w-full h-full flex flex-row overflow-auto dark:bg-[#0f0f10] dark:text-zinc-400"
        onSubmit={form.handleSubmit(handleSaveQuest)}
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

interface LayoutNavbarItemProps {
  name: string;
  icon: IconType;
  uri?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: boolean;
}

export function LayoutNavbarItem({
  name,
  disabled,
  uri,
  icon: Icon,
  ...props
}: LayoutNavbarItemProps) {
  const { isOpen } = useContext(context);
  const location = useLocation();
  const isSelected = location.pathname === uri;

  return (
    <li key={name}>
      <div
        className={classnames(
          "font-semibold flex flex-row items-center p-2 m-2 rounded gap-3",
          {
            "bg-emerald-300 text-emerald-700 cursor-default dark:text-white":
              isSelected,
            "opacity-30": disabled,
            "hover:bg-emerald-300 hover:text-emerald-700 cursor-pointer":
              !disabled,
          }
        )}
        {...props}
      >
        <Icon size={16} />
        {isOpen && <span>{name}</span>}
      </div>
    </li>
  );
}

export function LayoutNavbarItemSubmitButton({
  name,
  disabled,
  uri,
  icon: Icon,
}: LayoutNavbarItemProps) {
  const { isOpen } = useContext(context);
  const location = useLocation();
  const isSelected = location.pathname === uri;

  return (
    <li key={name}>
      <button
        type="submit"
        className={classnames(
          "font-semibold flex flex-row items-center p-2 m-2 rounded gap-3",
          {
            "bg-emerald-300 text-emerald-700 cursor-default dark:text-white":
              isSelected,
            "opacity-30": disabled,
            "hover:bg-emerald-300 hover:text-emerald-700 cursor-pointer":
              !disabled,
          }
        )}
      >
        <Icon size={16} />
        {isOpen && <span>{name}</span>}
      </button>
    </li>
  );
}

export function LayoutNavbarGroup({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const { isOpen } = useContext(context);

  return (
    <>
      {isOpen && (
        <h4 className="px-3 font-semibold text-gray-600 dark:text-white">
          {name}
        </h4>
      )}
      <ul
        className={classnames({
          "border-l-2 border-slate-100 dark:border-slate-800 ml-3": isOpen,
        })}
      >
        {children}
      </ul>
      {!isOpen && (
        <div
          className={
            "border-b border-slate-100 dark:border-slate-800 mx-2 last:border-none"
          }
        />
      )}
    </>
  );
}

export function LayoutNavbar({ children }: { children: React.ReactNode }) {
  const { isOpen, onToggle } = useContext(context);

  return (
    <nav
      className={classnames(
        "w-full h-screen max-w-xs border-r border-t dark:border-slate-800 md:block ",
        {
          "max-w-min": !isOpen,
          "z-20 md:z-auto fixed md:relative block": isOpen,
        }
      )}
    >
      <div className="border-b dark:border-slate-800 h-14 flex items-center justify-center text-center p-1">
        {isOpen && (
          <h2 className="font-semibold flex-1 text-center dark:text-white">
            MHFrontier CQ Editor ({VERSION})
          </h2>
        )}
        <div
          className="p-2 border-2 rounded hover:border-emerald-500 hover:text-emerald-500 cursor-pointer"
          onClick={onToggle}
        >
          {isOpen ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
        </div>
      </div>
      <ul className="w-full max-w-max pt-3">{children}</ul>
    </nav>
  );
}

export function LayoutBody({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const { isOpen, onToggle } = useContext(context);

  return (
    <div className="w-full h-full border-t rounded-y rounded-r dark:border-slate-800">
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
