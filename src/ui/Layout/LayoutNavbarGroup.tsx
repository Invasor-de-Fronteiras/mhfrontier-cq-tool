import classnames from "classnames";
import * as React from "react";
import { useLayout } from "./LayoutContext";

export function LayoutNavbarGroup({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const { isOpen } = useLayout();

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