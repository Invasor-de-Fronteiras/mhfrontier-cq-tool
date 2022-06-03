import React from "react";
import { BsUpload } from "react-icons/bs";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoadQuestTab } from "./tabs/LoadQuestTab";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoadQuestTab />} />
      </Route>
    </Routes>
  );
}

export default App;
