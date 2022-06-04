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
    <div className="flex items-center justify-center mt-6 h-full">
      <CLayout>
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
      </CLayout>
    </div>
  );
}

export function CLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full max-w-6xl  max-h-6xl flex flex-row drop-shadow-md">
      {children}
    </div>
  );
}

interface LayoutNavbarItemProps {
  name: string;
  icon: IconType;
  disabled?: boolean;
  selected?: boolean;
}

function LayoutNavbarItem({
  name,
  disabled,
  selected,
  ...props
}: LayoutNavbarItemProps) {
  return (
    <div
      key={name}
      className={classnames(
        "w-full font-semibold flex flex-row items-center cursor-pointer p-2 m-2 border-white border rounded",
        {
          "bg-emerald-300 text-emerald-700 cursor-default": selected,
          "opacity-75 cursor-not-allowed": disabled,
          "hover:bg-emerald-300 hover:text-emerald-700": !disabled,
        }
      )}
    >
      <props.icon className="mr-2" />
      <span>{name}</span>
    </div>
  );
}

function LayoutNavbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-xs bg-white border-r border-y border-l rounded-y rounded-l">
      <div className="border-b h-14 flex items-center justify-center">
        <h2 className="font-semibold">MHFrontier CQ Editor</h2>
      </div>
      <nav className="w-full max-w-max">{children}</nav>
    </div>
  );
}

function LayoutBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-full border-y border-r rounded-y rounded-r p-3">
      {children}
    </div>
  );
}
