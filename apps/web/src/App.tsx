import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoadQuestTab } from "./tabs/LoadQuestTab";
import { MonstersTab } from "./tabs/MonstersTab";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoadQuestTab />} />
        <Route path="/monsters" element={<MonstersTab />} />
      </Route>
    </Routes>
  );
}

export default App;
