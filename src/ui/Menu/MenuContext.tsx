import { useEffect, useMemo } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useTool } from "../../context/ToolContext";
import { Menu } from "./types";
import { useQuestMenu } from "./useQuestMenu";
import { useQuestlistMenu } from "./useQuestlistMenu";
import { useRemoteMenu } from "./useRemoteMenu";
import { useLocation, useNavigate } from "react-router-dom";

const context = createContext<Menu | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const { tool } = useTool();
  const questMenu = useQuestMenu();
  const questlistMenu = useQuestlistMenu();
  const remoteMenu = useRemoteMenu();
  const nav = useNavigate();

  const menu: Menu | null = useMemo(() => {
    if (tool === 'QuestEditor') {
      return questMenu;
    }

    if (tool === 'QuestlistEditor') {
      return questlistMenu;
    }

    if (tool === 'RemoteEditor') {
      return remoteMenu;
    }

    return null;
  }, [tool, questMenu, questlistMenu, remoteMenu]);

  useEffect(() => {
    if (menu) {
      nav(menu.defaultPath);
    }
  }, [tool]);

  return (
    <context.Provider value={menu}>
        {children}
    </context.Provider>
  );
}

export const useMenu = () => {
  const menuContext = useContext(context);
  return menuContext;
}

export const useCurrentMenuName = () => {
  const menu = useMenu();
  const location = useLocation();

  const currentMenu = useMemo(
    () =>
      menu?.groups.reduce<null | string>(
        (acc, group) => {
          if (acc) return acc;
          const option = group.items.find((option) => option.uri === location.pathname);
          return option?.name || null;
        },
        null
      ) ?? "Unknown",
    [location.pathname, menu]
  );

  return currentMenu;
}