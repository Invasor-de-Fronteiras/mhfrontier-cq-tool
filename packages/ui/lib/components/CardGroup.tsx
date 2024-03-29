import classNames from "classnames";
import React from "react";

interface GroupCardProps {
  title: string;
  children: React.ReactNode;
  contentClass?: string;
  className?: string;
}

export const GroupCard: React.FC<GroupCardProps> = ({ title, className, contentClass, children }) => (
  <div className={classNames("border rounded px-2 py-3 flex flex-col w-full", className)}>
    <div className="px-2 py-1">
      <div className="font-bold text-xl dark:text-white">{title}</div>
    </div>
    <div className={classNames("px-2 py-2 flex flex-row flex-wrap", contentClass)}>{children}</div>
  </div>
);
