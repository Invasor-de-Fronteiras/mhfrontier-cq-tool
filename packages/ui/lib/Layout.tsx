import {
  BsFillGeoFill,
  BsFillWalletFill,
  BsFillAwardFill,
  BsInfoCircle,
  BsMinecartLoaded,
  BsSave,
  BsUmbrella,
  BsUpload,
  BsQuestion,
} from "react-icons/bs";
import { SiMonster } from "react-icons/si";
import { IoMdFlag } from "react-icons/io";
import { GiAbdominalArmor, GiFishingLure } from "react-icons/gi";
import { FiRefreshCw } from "react-icons/fi";
import { HiTemplate } from "react-icons/hi";
import { RiUploadCloudFill } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa";
import { VscSymbolString } from "react-icons/vsc";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEditor } from "./context/EditorContext";

import {
  Layout as SharedLayout,
  LayoutBody,
  LayoutNavbar,
  LayoutNavbarItem,
  LayoutNavbarItemButton,
  LayoutNavbarGroup,
  Select,
  useQuestlistEditor,
  useTool,
  useConfig
} from "ui";
import { useEffect, useMemo } from "react";
import { IconType } from "react-icons";

interface NavbarItem {
  name: string;
  icon: IconType;
  uri?: string;
  disabled?: boolean;
  hide?: boolean;
  onClick?: () => void;
  isSubmit?: boolean;
  type?: boolean;
}

interface NavbarGroup {
  name: string;
  options: NavbarItem[];
}

export function Layout() {
  const location = useLocation();
  const nav = useNavigate();
  const { isLoadedFile, handleSaveQuest, insertOrUpdateQuest, reFrontier } = useEditor();
  const { isLoadedQuestlists, questlistSubmit } = useQuestlistEditor();
  const { tool, setTool } = useTool();
  const { config, dbSelected, setDBSelected } = useConfig();

  useEffect(() => {
    if (tool === 'QuestEditor') {
      nav('/');
    } else {
      nav('/questlist-load');
    }
  }, [tool]);

  const groups = useMemo<NavbarGroup[]>(
    () => {
      if (tool === 'QuestEditor') return [
        {
          name: "File",
          options: [
            { name: "Load Quest", icon: BsUpload, disabled: false, uri: "/" },
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
              uri: 'export-quest-info'
            },
          ],
        },
        {
          name: "Editor",
          options: [
            {
              name: "Quest Information",
              icon: BsInfoCircle,
              disabled: !isLoadedFile,
              uri: "/quest-info",
            },
            {
              name: "Strings",
              icon: VscSymbolString,
              disabled: !isLoadedFile,
              uri: "/strings",
            },
            {
              name: "Monsters",
              icon: SiMonster,
              disabled: !isLoadedFile,
              uri: "/monsters",
            },
            {
              name: "Small Monsters",
              icon: SiMonster,
              disabled: !isLoadedFile,
              uri: "/small-monsters",
            },
            {
              name: "Forced Equipment",
              icon: GiAbdominalArmor,
              disabled: !isLoadedFile,
              uri: "/equipment",
            },
            {
              name: "Supply Items",
              icon: BsFillWalletFill,
              uri: "/supply-items",
              disabled: !isLoadedFile,
            },
            {
              name: "Rewards",
              icon: BsFillAwardFill,
              disabled: !isLoadedFile,
              uri: "/rewards"
            },
            {
              name: "Flags",
              icon: IoMdFlag,
              disabled: !isLoadedFile,
              uri: "/flags"
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
          options: [
            {
              name: "ReFrontier",
              icon: FiRefreshCw,
              disabled: false,
              onClick: reFrontier
            },
            {
              name: "Map Position",
              icon: BsFillGeoFill,
              uri: "/map-position",
              disabled: false,
            },
            {
              name: "Templates",
              icon: HiTemplate,
              disabled: !isLoadedFile,
              uri: "/apply-templates",
            },
            {
              name: "Unknown",
              icon: BsQuestion,
              uri: "/unknown",
              disabled: !isLoadedFile,
            },
          ],
        },
      ];

      if (tool === 'QuestlistEditor') return [
        {
          name: "File",
          options: [
            { name: "Load Questlist", icon: BsUpload, disabled: false, uri: "/questlist-load" },
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
          options: [
            {
              name: "Questlist",
              icon: BsInfoCircle,
              disabled: !isLoadedQuestlists,
              uri: "/questlist",
            }
          ]
        }
      ];

      if (tool === 'RemoteEditor') return [
        {
          name: "Remote Editor",
          options: [
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

      return [];
    },
    [isLoadedFile, handleSaveQuest, questlistSubmit, tool, isLoadedQuestlists]
  );

  const route = useMemo(
    () =>
      groups.reduce<null | string>(
        (acc, group) => {
          if (acc) return acc;
          const option = group.options.find((option) => option.uri === location.pathname);
          return option?.name || null;
        },
        null
      ) ?? "Unknown",
    [location.pathname, groups]
  );

  const tools = useMemo(() => ([
    { value: 'QuestEditor', label: 'QuestEditor' },
    { value: 'QuestlistEditor', label: 'QuestlistEditor' },
    { value: 'RemoteEditor', label: 'RemoteEditor' },
  ]), []);

  const seletedTool = useMemo(() => tools.find(v => v.value === tool), [tools, tool]);

  return (
    <SharedLayout>
      <LayoutNavbar>
        <h4 className="px-3 font-semibold text-gray-600 dark:text-white">Tool</h4>
        <Select options={tools} className="w-full m-0 p-4" value={seletedTool} onChange={(item) => setTool(item?.value as string)} />
        {config?.dbs && <>
          <h4 className="px-3 font-semibold text-gray-600 dark:text-white">Database</h4>
          <Select
            options={config.dbs}
            className="w-full m-0 p-4"
            value={dbSelected}
            getOptionLabel={item => item.name}
            getOptionValue={item => item.name}
            onChange={(item) => setDBSelected(item)}
          />
        </>}
        {groups.map((group) => (
          <LayoutNavbarGroup name={group.name} key={group.name}>
            {group.options.filter(v => !v.hide).map((option) =>
              option.uri && !option.disabled ? (
                <Link to={option.uri} key={option.name}>
                  <LayoutNavbarItem {...option} />
                </Link>
              ) : (option.onClick || option.isSubmit) ? (
                <LayoutNavbarItemButton {...option} key={option.name} />
              ) : (
                <LayoutNavbarItem {...option} key={option.name} />
              )
            )}
          </LayoutNavbarGroup>
        ))}
      </LayoutNavbar>
      <LayoutBody title={route}>
        <Outlet />
      </LayoutBody>
    </SharedLayout>
  );
}
