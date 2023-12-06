import { BsInfoCircle, BsSave, BsUpload } from "react-icons/bs";
import { Menu, MenuGroup } from "./types";
import { useQuestlistEditor } from "../../context/QuestlistEditorContext";

export const useQuestlistMenu = (): Menu => {
  const { isLoadedQuestlists, questlistSubmit } = useQuestlistEditor();

  const groups: MenuGroup[] = [
    {
      name: "File",
      items: [
        { name: "Load Questlist", icon: BsUpload, disabled: false, uri: "/questlist/load" },
        {
          name: "Save Questlist",
          icon: BsSave,
          isSubmit: false,
          disabled: !isLoadedQuestlists,
          onClick: questlistSubmit
        }
      ],
    },
    {
      name: "Questlist Editor",
      items: [
        {
          name: "Questlist",
          icon: BsInfoCircle,
          disabled: !isLoadedQuestlists,
          uri: "/questlist",
        }
      ]
    }
  ];

  return {
    defaultPath: '/questlist/load',
    groups
  }
}