import React, { useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
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
import logo from "./logo.svg";
import { QuestFile, monsters } from "./types/quest-file";
import "./index.css";
import {
  Layout,
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

function App() {
  const [result, setResult] = useState<QuestFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onReadFile = async () => {
    try {
      const path = await open({ multiple: false });
      if (!path) return;

      const response: string = await invoke("read_quest_file", {
        event: path,
      });

      const obj = JSON.parse(response);
      if (obj && obj.error) {
        setError(obj.error);
        return;
      }

      const quest: QuestFile = obj;
      setResult(quest);
      console.log("response ", response);
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <div className="w-screen  h-screen flex flex-row drop-shadow-md">
      <LayoutNavbar>
        {options.map((option) =>
          option.uri ? (
            // <Link to={option.uri} key={option.name}>
              <LayoutNavbarItem
                {...option}
                selected={option.uri === location.pathname}
                
              />
            // </Link>
          ) : (
            <LayoutNavbarItem {...option} key={option.name} />
          )
        )}
      </LayoutNavbar>
      <LayoutBody>
        <div>
          <label> EDITOR DE QUEST </label>
        </div>
        <div>
          <button onClick={onReadFile}>Select File</button>
        </div>
        {result && (
          <div>
            Monsters
            <ul>
              {result.large_monster_spawns.map((v) => (
                <li>
                  Id: {v.monster_id} Name: {monsters[v.monster_id]}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* <div>
            <button onClick={onReadFile}>Send</button>
          </div> */}
        {error && <div>error: {error}</div>}
      </LayoutBody>
    </div>
  );
}

export default App;
