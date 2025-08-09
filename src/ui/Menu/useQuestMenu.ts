import { BsFillAwardFill, BsFillGeoFill, BsFillWalletFill, BsInfoCircle, BsMinecartLoaded, BsQuestion, BsSave, BsUmbrella, BsUpload } from "react-icons/bs";
import { useQuestEditor } from "../../context/QuestEditorContext";
import { RiUploadCloudFill } from "react-icons/ri";
import { useConfig } from "../../context/ConfigContext";
import { FaFileExport } from "react-icons/fa";
import { VscSymbolString } from "react-icons/vsc";
import { SiMonster } from "react-icons/si";
import { GiAbdominalArmor, GiFishingLure } from "react-icons/gi";
import { IoMdFlag } from "react-icons/io";
import { FiRefreshCw } from "react-icons/fi";
import { HiTemplate } from "react-icons/hi";
import { Menu, MenuGroup } from "./types";

export const useQuestMenu = (): Menu => {
  const { isLoadedFile, insertOrUpdateQuest, reFrontier } = useQuestEditor();
  const { config, dbSelected } = useConfig();

  const groups: MenuGroup[] = [
    {
      name: "File",
      items: [
        { name: "Load Quest", icon: BsUpload, disabled: false, uri: "/quest" },
        {
          name: "Save Quest",
          icon: BsSave,
          isSubmit: true,
          disabled: !isLoadedFile,
        },
        {
          name: "Save and Upload",
          icon: RiUploadCloudFill,
          isSubmit: false,
          disabled: !isLoadedFile,
          onClick: insertOrUpdateQuest,
          hide: !config || !dbSelected
        },
        {
          name: "Export quest",
          icon: FaFileExport,
          isSubmit: false,
          disabled: !isLoadedFile,
          uri: '/quest/export-quest-info'
        },
      ],
    },
    {
      name: "Editor",
      items: [
        {
          name: "Quest Information",
          icon: BsInfoCircle,
          disabled: !isLoadedFile,
          uri: "/quest/quest-info",
        },
        {
          name: "Strings",
          icon: VscSymbolString,
          disabled: !isLoadedFile,
          uri: "/quest/strings",
        },
        {
          name: "Monsters",
          icon: SiMonster,
          disabled: !isLoadedFile,
          uri: "/quest/monsters",
        },
        {
          name: "Small Monsters",
          icon: SiMonster,
          disabled: !isLoadedFile,
          uri: "/quest/small-monsters",
        },
        {
          name: "Forced Equipment",
          icon: GiAbdominalArmor,
          disabled: !isLoadedFile,
          uri: "/quest/equipment",
        },
        {
          name: "Supply Items",
          icon: BsFillWalletFill,
          uri: "/quest/supply-items",
          disabled: !isLoadedFile,
        },
        {
          name: "Rewards",
          icon: BsFillAwardFill,
          disabled: !isLoadedFile,
          uri: "/quest/rewards"
        },
        {
          name: "Flags",
          icon: IoMdFlag,
          disabled: !isLoadedFile,
          uri: "/quest/flags"
        },
        {
          name: "Gathering",
          icon: BsMinecartLoaded,
          disabled: !isLoadedFile || true,
        },
        {
          name: "Map Data",
          icon: BsFillGeoFill,
          disabled: !isLoadedFile || true,
        },
        {
          name: "Objects",
          icon: BsUmbrella,
          disabled: !isLoadedFile || true,
        },
        {
          name: "Fishing",
          icon: GiFishingLure,
          disabled: !isLoadedFile || true,
        }
      ],
    },
    {
      name: "Advanced",
      items: [
        {
          name: "ReFrontier",
          icon: FiRefreshCw,
          disabled: false,
          onClick: reFrontier
        },
        {
          name: "Map Position",
          icon: BsFillGeoFill,
          uri: "/quest/map-position",
          disabled: false,
        },
        {
          name: "Templates",
          icon: HiTemplate,
          disabled: !isLoadedFile,
          uri: "/quest/apply-templates",
        },
        {
          name: "Unknown",
          icon: BsQuestion,
          uri: "/quest/unknown",
          disabled: !isLoadedFile,
        },
      ],
    },
  ];

  return {
    defaultPath: '/quest',
    groups
  }
}