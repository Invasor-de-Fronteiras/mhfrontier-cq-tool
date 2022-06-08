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

interface ContextState {
  isOpen: boolean;
  onToggle: () => void;
}

const context = createContext({} as ContextState);

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <context.Provider value={{ isOpen, onToggle: () => setIsOpen(!isOpen) }}>
      <div className="w-full h-full flex flex-row drop-shadow-md">
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="h-full left-0 fixed top-0 w-full z-10 bg-black opacity-50 md:h-auto md:left-auto md:static md:top-auto md:w-auto md:z-auto"
          />
        )}
        {children}
      </div>
    </context.Provider>
  );
}

interface LayoutNavbarItemProps {
  name: string;
  icon: IconType;
  uri?: string;
  disabled?: boolean;
  onClick?: () => void;
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
    <li
      key={name}
      className={classnames(
        "font-semibold flex flex-row items-center p-2 m-2 border-white border rounded gap-3",
        {
          "bg-emerald-300 text-emerald-700 cursor-default": isSelected,
          "opacity-30": disabled,
          "hover:bg-emerald-300 hover:text-emerald-700 cursor-pointer":
            !disabled,
        }
      )}
      {...props}
    >
      <Icon size={16} />
      {isOpen && <span>{name}</span>}
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
      {isOpen && <h4 className="px-3 font-semibold text-gray-600">{name}</h4>}
      <ul className="border-l-2 ml-3">{children}</ul>
      {!isOpen && (
        <div className="border-b border-gray-400 mx-2 last:border-none" />
      )}
    </>
  );
}

export function LayoutNavbar({ children }: { children: React.ReactNode }) {
  const { isOpen, onToggle } = useContext(context);

  return (
    <nav
      className={classnames(
        "w-full h-full max-w-xs bg-white border-r border-y border-l rounded-y rounded-l",
        { "max-w-min": !isOpen },
        { "z-20 md:z-auto fixed md:relative": isOpen }
      )}
    >
      <div className="border-b h-14 flex items-center justify-center text-center p-1">
        {isOpen && (
          <h2 className="font-semibold flex-1 text-center">
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

  return (
    <div className="bg-white w-full h-full border-y border-r rounded-y rounded-r">
      <div className="border-b h-14 flex items-center">
        <h2 className="font-semibold text-center flex-1">{title}</h2>
        <div className="p-2 mr-4 border cursor-pointer bg-white text-black dark:bg-black dark:text-white" onClick={toggleTheme}>
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </div>
      </div>
      <div className="px-3 pt-3 pb-20 h-full max-h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}
