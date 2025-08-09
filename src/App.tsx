import { Ui } from "./ui";
import { ToolContextProvider } from "./context/ToolContext";
import ConfigEditor from "./tools/ConfigEditor";
import RemoteQuest from "./tools/RemoteQuest";
import RemoteQuestlist from "./tools/RemoteQuestlist";
import { QuestEditorProvider } from "./context/QuestEditorContext";
import { QuestlistEditorProvider } from "./context/QuestlistEditorContext";

function App() {
  return (
    <ConfigEditor>
      <ToolContextProvider>
        <QuestEditorProvider>
          <QuestlistEditorProvider>
            <RemoteQuest>
              <RemoteQuestlist>
                <Ui />
              </RemoteQuestlist>
            </RemoteQuest>
          </QuestlistEditorProvider>
        </QuestEditorProvider>
      </ToolContextProvider>
    </ConfigEditor>
  );
}

export default App;
