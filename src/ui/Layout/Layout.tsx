import { useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTool } from "../../context/ToolContext";
import { useConfig } from "../../context/ConfigContext";
import { Select } from "../../components/Select";
import { LayoutProvider } from "./LayoutContext";
import { LayoutNavbar } from "./LayoutNavbar";
import { LayoutNavbarGroup } from "./LayoutNavbarGroup";
import { LayoutNavbarItem } from "./LayoutNavbarItem";
import { LayoutNavbarItemButton } from "./LayoutNavbarItemButton";
import { LayoutBody } from "./LayoutBody";
import { useCurrentMenuName, useMenu } from "../Menu/MenuContext";

export function Layout() {
  const { tool, setTool, tools } = useTool();
  const { config, dbSelected, setDBSelected } = useConfig();

  const menu = useMenu();
  const currentMenuName = useCurrentMenuName();

  const toolsOptions = useMemo(() =>
    tools.map(v => ({
      value: v,
      label: v
    })
  ), [tools]);

  const seletedTool = useMemo(() => toolsOptions.find(v => v.value === tool), [tools, tool]);

  return (
    <LayoutProvider>
      <LayoutNavbar>
        <h4 className="px-3 font-semibold text-gray-600 dark:text-white">Tool</h4>
        <Select options={toolsOptions} className="w-full m-0 p-4" value={seletedTool} onChange={(item) => setTool(item?.value as string)} />
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
        {menu?.groups.map((group) => (
          <LayoutNavbarGroup name={group.name} key={group.name}>
            {group.items.filter(v => !v.hide).map((option) =>
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
      <LayoutBody title={currentMenuName}>
        <Outlet />
      </LayoutBody>
    </LayoutProvider>
  );
}
