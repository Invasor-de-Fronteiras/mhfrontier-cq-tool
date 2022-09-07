import { Ui } from "ui";
import QuestEditor from "./QuestEditor";
import QuestlistEditor from "./QuestlistEditor";

function App() {
  return (
    <QuestEditor>
      <QuestlistEditor>
        <Ui />
      </QuestlistEditor>
    </QuestEditor>
  );
}

export default App;
