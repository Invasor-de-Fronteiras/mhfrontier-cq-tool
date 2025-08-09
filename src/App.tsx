import { Ui } from "./ui";
import { ToolContextProvider } from "./context/ToolContext";
import ConfigEditor from "./tools/ConfigEditor";
import { QuestEditorProvider } from "./context/QuestEditorContext";
import { QuestlistEditorProvider } from "./context/QuestlistEditorContext";
import { RemoteQuestProvider } from "./context/RemoteQuestContext";
import { RemoteQuestlistProvider } from "./context/RemoteQuestlistContext";

function App() {
  return (
    <ConfigEditor>
      <ToolContextProvider>
        <QuestEditorProvider>
          <QuestlistEditorProvider>
            <RemoteQuestProvider>
              <RemoteQuestlistProvider>
                <Ui />
              </RemoteQuestlistProvider>
            </RemoteQuestProvider>
          </QuestlistEditorProvider>
        </QuestEditorProvider>
      </ToolContextProvider>
    </ConfigEditor>
  );
}

export default App;
