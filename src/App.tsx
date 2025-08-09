import { Ui } from "./ui";
import { ToolContextProvider } from "./context/ToolContext";
import ConfigEditor from "./tools/ConfigEditor";
// import QuestEditor from "./tools/QuestEditor";
import QuestlistEditor from "./tools/QuestlistEditor";
import RemoteQuest from "./tools/RemoteQuest";
import RemoteQuestlist from "./tools/RemoteQuestlist";
import { QuestEditorProvider } from "./context/QuestEditorContext";

function App() {
  return (
    <ConfigEditor>
      <ToolContextProvider>
        <QuestEditorProvider>
          <QuestlistEditor>
            <RemoteQuest>
              <RemoteQuestlist>
                <Ui />
              </RemoteQuestlist>
            </RemoteQuest>
          </QuestlistEditor>
        </QuestEditorProvider>
      </ToolContextProvider>
    </ConfigEditor>
  );
}

export default App;
