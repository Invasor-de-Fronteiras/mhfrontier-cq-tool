import { Ui } from "./ui";
import { ToolContextProvider } from "./context/ToolContext";
import ConfigEditor from "./tools/ConfigEditor";
import RemoteQuestlist from "./tools/RemoteQuestlist";
import { QuestEditorProvider } from "./context/QuestEditorContext";
import { QuestlistEditorProvider } from "./context/QuestlistEditorContext";
import { RemoteQuestProvider } from "./context/RemoteQuestContext";

function App() {
  return (
    <ConfigEditor>
      <ToolContextProvider>
        <QuestEditorProvider>
          <QuestlistEditorProvider>
            <RemoteQuestProvider>
              <RemoteQuestlist>
                <Ui />
              </RemoteQuestlist>
            </RemoteQuestProvider>
          </QuestlistEditorProvider>
        </QuestEditorProvider>
      </ToolContextProvider>
    </ConfigEditor>
  );
}

export default App;
