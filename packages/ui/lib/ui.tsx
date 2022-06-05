import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { LoadQuestTab } from "./tabs/LoadQuestTab";
import { MonstersTab } from "./tabs/MonstersTab";

export function Ui() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoadQuestTab />} />
        <Route path="/monsters" element={<MonstersTab />} />
      </Route>
    </Routes>
  );
}

