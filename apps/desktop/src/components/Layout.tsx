import classnames from "classnames";
import {
  BsFillGeoFill,
  BsFillWalletFill,
  BsInfoCircle,
  BsMinecartLoaded,
  BsUmbrella,
  BsUpload,
  BsSave
} from "react-icons/bs";
import { SiMonster } from "react-icons/si";
import { GiAbdominalArmor, GiFishingLure } from "react-icons/gi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import React, { useContext, useMemo } from "react";
import {
  Layout as SharedLayout,
  Button,
  LayoutBody,
  LayoutNavbar,
  LayoutNavbarItem,
} from "ui";
import { QuestContext } from "../hooks/quest";

export function Layout() {
  let location = useLocation();
  const { questPath, onSaveQuest } = useContext(QuestContext);

  const saveQuest = () => {
    if (onSaveQuest) onSaveQuest();
  }

  const options = [
    { name: "Load Quest", icon: BsUpload, disabled: false, uri: "/" },
    { name: "Save Quest", icon: BsSave, onClick: saveQuest,  disabled: !questPath || false },
    { name: "Quest Information", icon: BsInfoCircle, disabled: !questPath || true },
    { name: "Monsters", icon: SiMonster, disabled: !questPath || false, uri: "/monsters" },
    { name: "Items", icon: BsFillWalletFill, disabled: !questPath || true },
    { name: "Gathering", icon: BsMinecartLoaded, disabled: !questPath || true },
    { name: "Map Data", icon: BsFillGeoFill, disabled: !questPath || true },
    { name: "Objects", icon: BsUmbrella, disabled: !questPath || true },
    { name: "Fishing", icon: GiFishingLure, disabled: !questPath || true },
    { name: "Forced Equipment", icon: GiAbdominalArmor, disabled: !questPath ||  true },
  ];

  console.log('layout render');

  return (
    <div className="w-screen  h-screen flex flex-row drop-shadow-md">
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
              <LayoutNavbarItem {...option} key={option.name} />
            )
          )}
        </LayoutNavbar>
        <LayoutBody title="">
          <Outlet />
        </LayoutBody>
    </div>
  );
}
