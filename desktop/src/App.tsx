import React, { useMemo, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { Layout, LoadQuestTab, MonstersTab } from '@editor/components';
import logo from './logo.svg';
import { QuestFile, monsters } from './types/quest-file';
// import './App.css';
import './index.css'

import { Route, Routes } from "react-router-dom";
// import { Layout } from "./components/Layout";
// import { LoadQuestTab } from "./tabs/LoadQuestTab";
// import { MonstersTab } from "./tabs/MonstersTab";

function App() {
  return (
    <Layout>
      <MonstersTab />
    </Layout>
  );
}

function AppTest() {
  const [result, setResult] = useState<QuestFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onReadFile = async () => {
    try {
      const path = await open({ multiple: false });
      if (!path) return;

      const response: string = await invoke('read_quest_file', {
        event: path,
      });

      const obj = JSON.parse(response);
      if (obj && obj.error) {
        setError(obj.error);
        return;
      }

      const quest: QuestFile = obj;
      setResult(quest);
      console.log('response ', response);
    } catch (error) {
      console.log('error ', error)
    }
  }

  return (
    <div className="App">
      <div className="App-header">
          <div>
            <label> EDITOR DE QUEST </label>
          </div>
          <MonstersTab />
          <div>
            <button onClick={onReadFile}>Select File</button>
          </div>
          {result && <div>
              Monsters
              <ul>
                {result.large_monster_spawns.map(v => <li>Id: {v.monster_id} Name: {monsters[v.monster_id]}</li>)}
              </ul>
          </div>}
          {/* <div>
            <button onClick={onReadFile}>Send</button>
          </div> */}
          {error && <div>error: {error}</div>}
      </div>
    </div>
  );
}

export default App;
