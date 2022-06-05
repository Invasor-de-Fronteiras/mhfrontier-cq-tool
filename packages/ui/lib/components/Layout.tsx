import type { IconType } from "react-icons";
import classnames from "classnames";
import * as React from "react";
import { createContext, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useContext } from "react";

const context = createContext({ isOpen: false, onToggle: () => {} });

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <context.Provider value={{ isOpen, onToggle: () => setIsOpen(!isOpen) }}>
      <div className="w-full h-full flex flex-row drop-shadow-md sm:absolute">
        {children}
      </div>
    </context.Provider>
  );
}

interface LayoutNavbarItemProps {
  name: string;
  icon: IconType;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export function LayoutNavbarItem({
  name,
  disabled,
  selected,
  icon: Icon,
  ...props
}: LayoutNavbarItemProps) {
  const { isOpen } = useContext(context);

  return (
    <div
      key={name}
      className={classnames(
        "font-semibold flex flex-row items-center cursor-pointer p-2 m-2 border-white border rounded gap-3",
        {
          "bg-emerald-300 text-emerald-700 cursor-default": selected,
          "opacity-75 cursor-not-allowed": disabled,
          "hover:bg-emerald-300 hover:text-emerald-700": !disabled,
        }
      )}
      {...props}
    >
      <Icon size={16} />
      {isOpen && <span>{name}</span>}
    </div>
  );
}

export function LayoutNavbar({ children }: { children: React.ReactNode }) {
  const { isOpen, onToggle } = useContext(context);

  return (
    <div
      className={classnames(
        "w-full max-w-xs bg-white border-r border-y border-l rounded-y rounded-l",
        { "max-w-min": !isOpen }
      )}
    >
      <div className="border-b h-14 flex items-center justify-center text-center p-1">
        {isOpen && (
          <h2 className="font-semibold flex-1 text-center">
            MHFrontier CQ Editor
          </h2>
        )}
        <div
          className="p-2 border-2 rounded hover:border-emerald-500 hover:text-emerald-500 cursor-pointer"
          onClick={onToggle}
        >
          {isOpen ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
        </div>
      </div>
      <nav className="w-full max-w-max">{children}</nav>
    </div>
  );
}

export function LayoutBody({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="bg-white w-full border-y border-r rounded-y rounded-r">
      <div className="border-b h-14 flex items-center justify-center">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
