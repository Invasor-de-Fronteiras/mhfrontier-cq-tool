import {
  BsFillGeoFill,
  BsFillWalletFill,
  BsInfoCircle,
  BsMinecartLoaded,
  BsSave,
  BsUmbrella,
  BsUpload,
} from "react-icons/bs";
import { SiMonster } from "react-icons/si";
import { GiAbdominalArmor, GiFishingLure } from "react-icons/gi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEditor } from "./context/EditorContext";

import {
  Layout as SharedLayout,
  LayoutBody,
  LayoutNavbar,
  LayoutNavbarItem,
  LayoutNavbarGroup,
} from "ui";
import { useMemo } from "react";

export function Layout() {
  const location = useLocation();
  const { data, handleSaveQuest } = useEditor();

  const groups = useMemo(
    () => [
      {
        name: "File",
        options: [
          { name: "Load Quest", icon: BsUpload, disabled: false, uri: "/" },
          {
            name: "Save Quest",
            icon: BsSave,
            onClick: handleSaveQuest,
            disabled: !data,
          },
        ],
      },
      {
        name: "Editor",
        options: [
          {
            name: "Quest Information",
            icon: BsInfoCircle,
            disabled: !data || true,
          },
          {
            name: "Monsters",
            icon: SiMonster,
            disabled: !data,
            uri: "/monsters",
          },
          { name: "Items", icon: BsFillWalletFill, disabled: !data || true },
          {
            name: "Gathering",
            icon: BsMinecartLoaded,
            disabled: !data || true,
          },
          { name: "Map Data", icon: BsFillGeoFill, disabled: !data || true },
          { name: "Objects", icon: BsUmbrella, disabled: !data || true },
          { name: "Fishing", icon: GiFishingLure, disabled: !data || true },
          {
            name: "Forced Equipment",
            icon: GiAbdominalArmor,
            disabled: !data || true,
          },
        ],
      },
    ],
    [data, handleSaveQuest]
  );

  let route = useMemo(
    () =>
      groups.reduce<null | string>(
        (acc, group) =>
          acc ??
          // @ts-ignore 
          group.options.find((option) => option.uri === location.pathname)
            ?.name,
        null
      ) ?? "Unknown",
    [location.pathname, groups]
  );

  return (
    <SharedLayout>
      <LayoutNavbar>
        {groups.map((group) => (
          <LayoutNavbarGroup name={group.name}>
            {group.options.map((option) =>
              option.uri && !option.disabled ? (
                <Link to={option.uri} key={option.name}>
                  <LayoutNavbarItem {...option} />
                </Link>
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
