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
} from "ui";
import { useMemo } from "react";

export function Layout() {
  const location = useLocation();
  const { data, handleSaveQuest } = useEditor();

  const options = useMemo(
    () => [
      { name: "Load Quest", icon: BsUpload, disabled: false, uri: "/" },
      {
        name: "Save Quest",
        icon: BsSave,
        onClick: handleSaveQuest,
        disabled: !data,
      },
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
      { name: "Gathering", icon: BsMinecartLoaded, disabled: !data || true },
      { name: "Map Data", icon: BsFillGeoFill, disabled: !data || true },
      { name: "Objects", icon: BsUmbrella, disabled: !data || true },
      { name: "Fishing", icon: GiFishingLure, disabled: !data || true },
      {
        name: "Forced Equipment",
        icon: GiAbdominalArmor,
        disabled: !data || true,
      },
    ],
    [data, handleSaveQuest]
  );

  let route = useMemo(
    () =>
      options.find((option) => option.uri === location.pathname)?.name ??
      "Unknown",
    [location.pathname, options]
  );

  return (
    <SharedLayout>
      <LayoutNavbar>
        {options.map((option) =>
          option.uri && !option.disabled ? (
            <Link to={option.uri} key={option.name}>
              <LayoutNavbarItem
                {...option}
                selected={option.uri === location.pathname}
              />
            </Link>
          ) : (
            <LayoutNavbarItem {...option} key={option.name}  />
          )
        )}
      </LayoutNavbar>
      <LayoutBody title={route}>
        <Outlet />
      </LayoutBody>
    </SharedLayout>
  );
}
