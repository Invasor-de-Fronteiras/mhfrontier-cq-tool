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
import { Outlet } from "react-router-dom";

const options = [
  { name: "Load Quest", icon: BsUpload },
  { name: "Quest Information", icon: BsInfoCircle },
  { name: "Monsters", icon: SiMonster },
  { name: "Items", icon: BsFillWalletFill },
  { name: "Gathering", icon: BsMinecartLoaded },
  { name: "Map Data", icon: BsFillGeoFill },
  { name: "Objects", icon: BsUmbrella },
  { name: "Fishing", icon: GiFishingLure },
  { name: "Forced Equipment", icon: GiAbdominalArmor },
];

export function Layout() {
    const currentPage = "Load Quest";

  return (
    <div className="flex items-center justify-center mt-6 h-full">
      <div className="w-full h-full max-w-6xl  max-h-6xl flex flex-row drop-shadow-md">
        <div className="w-full max-w-xs bg-white border-r border-y border-l rounded-y rounded-l">
          <div className="border-b h-14 flex items-center justify-center">
            <h2 className="font-semibold">MHFrontier CQ Editor</h2>
          </div>
          <ul className="w-full max-w-max">
            {options.map((option) => (
              <li
                key={option.name}
                className={classNames(
                  "w-full font-semibold flex flex-row items-center cursor-pointer p-2 m-2 border-white border rounded hover:bg-emerald-300 hover:text-emerald-700",
                  {
                    "bg-emerald-300 text-emerald-700 cursor-default":
                      option.name === currentPage,
                  }
                )}
              >
                <option.icon className="mr-2" />
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white w-full border-y border-r rounded-y rounded-r">
          <div className="flex flex-col m-3">
            {/* <h1 className="font-bold text-2xl text-center">
              MHFrontier Custom Quest Editor
            </h1>
            <p>Create and edit custom quests for MHFrontier.</p> */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
