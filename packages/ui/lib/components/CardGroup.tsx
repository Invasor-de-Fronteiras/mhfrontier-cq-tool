import React from "react";

interface GroupCardProps {
  title: string;
  children: React.ReactNode;
}

export const GroupCard: React.FC<GroupCardProps> = ({ title, children }) => (
  <div className="drop-shadow-sm border rounded px-2 py-3 flex flex-col w-full ">
    <div className="px-2 py-1">
      <div className="font-bold text-xl">{title}</div>
    </div>
    <div className="px-2 py-2 flex flex-row flex-wrap">{children}</div>
  </div>
);
