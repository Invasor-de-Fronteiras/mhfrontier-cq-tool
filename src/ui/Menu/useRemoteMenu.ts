import { BsInfoCircle } from "react-icons/bs";
import { Menu, MenuGroup } from "./types";

export const useRemoteMenu = (): Menu => {

  const groups: MenuGroup[] = [
    {
      name: "Remote Editor",
      items: [
        {
          name: "Quests",
          icon: BsInfoCircle,
          disabled: false,
          uri: "/remote/quests",
        },
        {
          name: "Questlist",
          icon: BsInfoCircle,
          disabled: false,
          uri: "/remote/questlist",
        },
      ]
    }
  ];

  return {
    defaultPath: '/remote/quests',
    groups
  }
}