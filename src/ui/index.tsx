import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { MapPositionTab } from "../tabs/develop/MapPosition";
import { ExportToQuestlistTab } from "../tabs/quest/ExportToQuestlistTab";
import { FlagsTab } from "../tabs/quest/FlagsTab";
import { ForcedEquipmentTab } from "../tabs/quest/ForcedEquipementTab";
import { LoadQuestTab } from "../tabs/quest/LoadQuestTab";
import { MonstersTab } from "../tabs/quest/MonstersTab";
import { QuestInfoTab } from "../tabs/quest/QuestInfoTab";
import { LoadQuestlistTab } from "../tabs/questlist/LoadQuestlistTab";
import { QuestlistTab } from "../tabs/questlist/QuestlistTab";
import { RemoteQuestTab } from "../tabs/remote/quest/RemoteQuestTab";
import { RemoteQuestlistTab } from "../tabs/remote/questlist/RemoteQuestlistTab";
import { RewardsTab } from "../tabs/quest/RewardsTab";
import { SmallMonsterTab } from "../tabs/quest/SmallMonsterTab";
import { QuestStringTab } from "../tabs/quest/StringsTab";
import { SupplyItemTab } from "../tabs/quest/SupplyItemTab";
import { ApplyTemplateTab } from "../tabs/template/TemplateTab";
import { UnknownTab } from "../tabs/quest/UnknownTab";
import { MenuProvider } from "./Menu/MenuContext";

export function Ui() {
  return (
    <Routes>
      <Route element={<MenuProvider><Layout /></MenuProvider>}>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="/quest" element={<LoadQuestTab />} />
        <Route path="/quest/monsters" element={<MonstersTab />} />
        <Route path="/quest/small-monsters" element={<SmallMonsterTab />} />
        <Route path="/quest/equipment" element={<ForcedEquipmentTab />} />
        <Route path="/quest/quest-info" element={<QuestInfoTab />} />
        <Route path="/quest/export-quest-info" element={<ExportToQuestlistTab />} />
        <Route path="/quest/map-position" element={<MapPositionTab />} />
        <Route path="/quest/strings" element={<QuestStringTab />} />
        <Route path="/quest/apply-templates" element={<ApplyTemplateTab />} />
        <Route path="/quest/flags" element={<FlagsTab />} />
        <Route path="/quest/rewards" element={<RewardsTab />} />
        <Route path="/quest/unknown" element={<UnknownTab />} />
        <Route path="/quest/supply-items" element={<SupplyItemTab />} />
        <Route path="/questlist" element={<QuestlistTab />} />
        <Route path="/questlist/load" element={<LoadQuestlistTab />} />
        <Route path="/remote/quests" element={<RemoteQuestTab />} />
        <Route path="/remote/questlist" element={<RemoteQuestlistTab />} />
      </Route>
    </Routes>
  );
}
