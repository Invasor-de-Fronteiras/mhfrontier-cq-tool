import classnames from "classnames";
import {
  BsFillGeoFill,
  BsFillWalletFill,
  BsInfoCircle,
  BsMinecartLoaded,
  BsUmbrella,
  BsUpload,
} from "react-icons/bs";
import { SiMonster } from "react-icons/si";
import { GiAbdominalArmor, GiFishingLure } from "react-icons/gi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import React from "react";
import {
  Layout as SharedLayout,
  Button,
  LayoutBody,
  LayoutNavbar,
  LayoutNavbarItem,
} from "ui";

const options = [
  { name: "Load Quest", icon: BsUpload, disabled: false, uri: "/" },
  { name: "Quest Information", icon: BsInfoCircle, disabled: true },
  { name: "Monsters", icon: SiMonster, disabled: false, uri: "/monsters" },
  { name: "Items", icon: BsFillWalletFill, disabled: true },
  { name: "Gathering", icon: BsMinecartLoaded, disabled: true },
  { name: "Map Data", icon: BsFillGeoFill, disabled: true },
  { name: "Objects", icon: BsUmbrella, disabled: true },
  { name: "Fishing", icon: GiFishingLure, disabled: true },
  { name: "Forced Equipment", icon: GiAbdominalArmor, disabled: true },
];

export function Layout() {
  let location = useLocation();
  console.log(location);

  return (
    <div className="w-screen  h-screen flex flex-row drop-shadow-md">
        <LayoutNavbar>
          {options.map((option) =>
            option.uri ? (
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
        <LayoutBody>
          <Outlet />
        </LayoutBody>
    </div>
  );
}
