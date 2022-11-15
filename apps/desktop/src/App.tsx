import { Ui } from "ui";
import ConfigEditor from "./ConfigEditor";
import QuestEditor from "./QuestEditor";
import QuestlistEditor from "./QuestlistEditor";

function App() {
  return (
    <ConfigEditor>
      <QuestEditor>
        <QuestlistEditor>
          <Ui />
        </QuestlistEditor>
      </QuestEditor>
    </ConfigEditor>
  );
}

export default App;
