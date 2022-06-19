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
import { GiAbdominalArmor, GiFishingLure } from "react-icons/gi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEditor } from "./context/EditorContext";

import {
  Layout as SharedLayout,
  LayoutBody,
  LayoutNavbar,
  LayoutNavbarItem,
  LayoutNavbarItemSubmitButton,
  LayoutNavbarGroup,
} from "ui";
import { useMemo } from "react";

export function Layout() {
  const location = useLocation();
  const { isLoadedFile, handleSaveQuest } = useEditor();

  const groups = useMemo(
    () => [
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
            name: "Monsters",
            icon: SiMonster,
            disabled: !isLoadedFile,
            uri: "/monsters",
          },
          {
            name: "Items",
            icon: BsFillWalletFill,
            disabled: !isLoadedFile || true,
          },
          {
            name: "Rewards",
            icon: BsFillAwardFill,
            disabled: !isLoadedFile,
            uri: "/rewards"
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
          },
          {
            name: "Forced Equipment",
            icon: GiAbdominalArmor,
            disabled: !isLoadedFile || true,
          },
        ],
      },
      {
        name: "Advanced",
        options: [
          {
            name: "Map Position",
            icon: BsFillGeoFill,
            uri: "/map-position",
            disabled: false,
          },
          {
            name: "Unknown",
            icon: BsQuestion,
            uri: "/unknown",
            disabled: !isLoadedFile,
          },
        ],
      },
    ],
    [isLoadedFile, handleSaveQuest]
  );

  const route = useMemo(
    () =>
      groups.reduce<null | string>(
        (acc, group) =>
          acc ??
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          <LayoutNavbarGroup name={group.name} key={group.name}>
            {group.options.map((option) =>
              option.uri && !option.disabled ? (
                <Link to={option.uri} key={option.name}>
                  <LayoutNavbarItem {...option} />
                </Link>
              ) : "isSubmit" in option && option.isSubmit ? (
                <LayoutNavbarItemSubmitButton {...option} key={option.name} />
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
