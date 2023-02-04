import { ToolContextProvider, Ui } from "ui";
import ConfigEditor from "./ConfigEditor";
import QuestEditor from "./QuestEditor";
import QuestlistEditor from "./QuestlistEditor";
import RemoteQuest from "./RemoteQuest";
import RemoteQuestlist from "./RemoteQuestlist";

function App() {
  return (
    <ConfigEditor>
      <ToolContextProvider>
        <QuestEditor>
          <QuestlistEditor>
            <RemoteQuest>
              <RemoteQuestlist>
                <Ui />
              </RemoteQuestlist>
            </RemoteQuest>
          </QuestlistEditor>
        </QuestEditor>
      </ToolContextProvider>
    </ConfigEditor>
  );
}

export default App;
