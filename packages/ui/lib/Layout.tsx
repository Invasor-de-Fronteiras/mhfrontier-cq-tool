import { IconType } from "react-icons";

// type IconType = (props: {
//   children?: React.ReactNode;
//   size?: string | number;
//   color?: string;
//   title?: string;
// }) => JSX.Element;

import classnames from "classnames";
import * as React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full max-w-6xl  max-h-6xl flex flex-row drop-shadow-md">
      {children}
    </div>
  );
}

interface LayoutNavbarItemProps {
  name: string;
  icon: IconType;
  disabled?: boolean;
  selected?: boolean;
}

export function LayoutNavbarItem({
  name,
  disabled,
  selected,
  ...props
}: LayoutNavbarItemProps) {
  return (
    <div
      key={name}
      className={classnames(
        "w-full font-semibold flex flex-row items-center cursor-pointer p-2 m-2 border-white border rounded",
        {
          "bg-emerald-300 text-emerald-700 cursor-default": selected,
          "opacity-75 cursor-not-allowed": disabled,
          "hover:bg-emerald-300 hover:text-emerald-700": !disabled,
        }
      )}
    >
      <props.icon className="mr-2" />
      <span>{name}</span>
    </div>
  );
}

export function LayoutNavbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-xs bg-white border-r border-y border-l rounded-y rounded-l">
      <div className="border-b h-14 flex items-center justify-center">
        <h2 className="font-semibold">MHFrontier CQ Editor</h2>
      </div>
      <nav className="w-full max-w-max">{children}</nav>
    </div>
  );
}

export function LayoutBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-full border-y border-r rounded-y rounded-r p-3">
      {children}
    </div>
  );
}
