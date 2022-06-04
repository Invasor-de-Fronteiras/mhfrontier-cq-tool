import React, { useMemo, useState } from "react";

import { QuestFile, monsters } from "./types/quest-file";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from './components/Layout';
import { LoadQuestTab } from './tabs/LoadQuestTab';
import { MonstersTab } from './tabs/MonstersTab';
import { QuestProvider } from "./hooks/quest";

function App() {
  

  

  return (
    <QuestProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoadQuestTab />} />
          <Route path="/monsters" element={<MonstersTab />} />
        </Route>
      </Routes>
    </QuestProvider>
    // <div className="w-screen  h-screen flex flex-row drop-shadow-md">
    //   <LayoutNavbar>
    //     {options.map((option) =>
    //       option.uri ? (
    //         // <Link to={option.uri} key={option.name}>
    //           <LayoutNavbarItem
    //             {...option}
    //             selected={option.uri === location.pathname}

    //           />
    //         // </Link>
    //       ) : (
    //         <LayoutNavbarItem {...option} key={option.name} />
    //       )
    //     )}
    //   </LayoutNavbar>
    //   <LayoutBody>
    //     <div>
    //       <label> EDITOR DE QUEST </label>
    //     </div>
    //     <div>
    //       <button onClick={onReadFile}>Select File</button>
    //     </div>
    //     {result && (
    //       <div>
    //         Monsters
    //         <ul>
    //           {result.large_monster_spawns.map((v) => (
    //             <li>
    //               Id: {v.monster_id} Name: {monsters[v.monster_id]}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     )}
    //     {/* <div>
    //         <button onClick={onReadFile}>Send</button>
    //       </div> */}
    //     {error && <div>error: {error}</div>}
    //   </LayoutBody>
    // </div>
  );
}

export default App;
