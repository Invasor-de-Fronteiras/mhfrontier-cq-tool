import React from 'react';
import classNames from "classnames";
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
// import { Link, Outlet, useLocation } from "react-router-dom";
import { IconType } from "react-icons";

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

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // <div className="flex items-center justify-center mt-6 h-full">
      <div className="w-full h-screen flex flex-row drop-shadow-md ">
        <div className="w-full max-w-xs bg-white border-r border-y border-l rounded-y rounded-l">
          <div className="border-b h-14 flex items-center justify-center">
            <h2 className="font-semibold">MHFrontier CQ Editor</h2>
          </div>
          <nav className="w-full max-w-max">
            {options.map((option) =>
              option.uri ? (
                // <Link to={option.uri} key={option.name}>
                  <NavbarItem {...option} selected={option.uri === location.pathname} />
                // </Link>
              ) : (
                <NavbarItem {...option} key={option.name} />
              )
            )}
          </nav>
        </div>
        <div className="bg-white w-full border-y border-r rounded-y rounded-r overflow-auto">
          <div className="flex flex-col m-3">
            {children}
          </div>
        </div>
      </div>
    // </div>
  );
}

interface Option {
  name: string;
  icon: IconType;
  disabled?: boolean;
  selected?: boolean;
}

function NavbarItem({ name, disabled, selected, ...props }: Option) {
  return (
    <div
      key={name}
      className={classNames(
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
