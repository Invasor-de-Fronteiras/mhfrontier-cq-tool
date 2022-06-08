import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { MapPositionTab } from "./tabs/develop/MapPosition";
import { LoadQuestTab } from "./tabs/LoadQuestTab";
import { MonstersTab } from "./tabs/MonstersTab";
import { UnknownTab } from "./tabs/UnknownTab";

export function Ui() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoadQuestTab />} />
        <Route path="/monsters" element={<MonstersTab />} />
        <Route path="/map-position" element={<MapPositionTab />} />
        <Route path="/unknown" element={<UnknownTab />} />
      </Route>
    </Routes>
  );
}

