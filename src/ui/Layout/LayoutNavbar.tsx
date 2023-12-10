import classnames from "classnames";
import * as React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { VERSION } from "../../constants";
import { useLayout } from "./LayoutContext";

export function LayoutNavbar({ children }: { children: React.ReactNode }) {
  const { isOpen, onToggle } = useLayout();

  return (
    <nav
      className={classnames(
        "h-screen flex flex-col max-w-xs border-r border-t dark:border-slate-800 relative ",
        {
          "max-w-min": !isOpen,
          "z-20 md:z-auto fixed md:relative block": isOpen,
        }
      )}
    >
      <div className="border-b dark:border-slate-800 min-h-14 h-14 flex items-center justify-center text-center p-1">
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
      <ul className="w-full overflow-y-auto pt-3">{children}</ul>
    </nav>
  );
}