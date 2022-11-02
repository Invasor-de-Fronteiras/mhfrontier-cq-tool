import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { MapPositionTab } from "./tabs/develop/MapPosition";
import { FlagsTab } from "./tabs/FlagsTab";
import { ForcedEquipmentTab } from "./tabs/ForcedEquipementTab";
import { LoadQuestTab } from "./tabs/LoadQuestTab";
import { MonstersTab } from "./tabs/MonstersTab";
import { QuestInfoTab } from "./tabs/QuestInfoTab";
import { LoadQuestlistTab } from "./tabs/questlist/LoadQuestlistTab";
import { QuestlistTab } from "./tabs/questlist/QuestlistTab";
import { RewardsTab } from "./tabs/RewardsTab";
import { QuestStringTab } from "./tabs/StringsTab";
import { SupplyItemTab } from "./tabs/SupplyItemTab";
import { ApplyTemplateTab } from "./tabs/template/TemplateTab";
import { UnknownTab } from "./tabs/UnknownTab";

export function Ui() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoadQuestTab />} />
        <Route path="/monsters" element={<MonstersTab />} />
        <Route path="/equipment" element={<ForcedEquipmentTab />} />
        <Route path="/quest-info" element={<QuestInfoTab />} />
        <Route path="/map-position" element={<MapPositionTab />} />
        <Route path="/strings" element={<QuestStringTab />} />
        <Route path="/apply-templates" element={<ApplyTemplateTab />} />
        <Route path="/flags" element={<FlagsTab />} />
        <Route path="/rewards" element={<RewardsTab />} />
        <Route path="/unknown" element={<UnknownTab />} />
        <Route path="/supply-items" element={<SupplyItemTab />} />
        <Route path="/questlist-load" element={<LoadQuestlistTab />} />
        <Route path="/questlist" element={<QuestlistTab />} />
      </Route>
    </Routes>
  );
}
