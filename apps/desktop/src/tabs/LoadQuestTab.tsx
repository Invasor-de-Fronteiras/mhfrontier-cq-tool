import { useCallback, useContext, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { Dropzone } from "../components/Dropzone";
import { QuestFile } from "../types/quest-file";
import { QuestContext } from "../hooks/quest";
// import { maps } from "../utils";

export function LoadQuestTab() {
  const { onLoadQuest } = useContext(QuestContext);

  // const [result, setResult] = useState<QuestFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onReadFile = async () => {
    try {
      const path = await open({ multiple: false });
      if (!path) return;

      const response: string = await invoke("read_quest_file", {
        event: path,
      });

      const quest = JSON.parse(response);
      if (quest && quest.error) {
        setError(quest.error);
        return;
      }

      if (onLoadQuest) onLoadQuest(quest as QuestFile);
      // setResult(quest);
      console.log("response ", response);
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 px-2">
      <div className="flex flex-col items-center justify-center p-6 border rounded w-full max-w-2xl">
        <h1 className="font-bold text-2xl text-center">
          MHFrontier Custom Quest Editor
        </h1>
        <p>Create and edit custom quests for MHFrontier.</p>
        <div className="flex flex-col md:flex-row gap-6 mt-3 w-full">
          <Card
            buttonText="Load file content"
            title="Select a quest file from your machine."
            buttonDisabled
          >
            <Dropzone onClick={onReadFile} />
          </Card>
          {/* <Card
            buttonText="Edit template"
            title="Use an our template."
            buttonDisabled
          >
            <legend className="font-normal mb-2">Select a template</legend>
            <select
              className="border w-full p-2 disabled:cursor-not-allowed"
              disabled
            >
              <option>Select a template</option>
              {maps.map((map) => (
                <option key={map}>{map}</option>
              ))}
            </select>
          </Card> */}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  buttonText: string;
  buttonDisabled?: boolean;
  children: React.ReactNode;
}

function Card({ title, buttonText, buttonDisabled, children }: CardProps) {
  return (
    <div className="border px-2 py-3 w-full max-w-lg items-center flex flex-col">
      <h3 className="text-center">{title}</h3>
      <div className="flex-1 p-3 w-full h-full max-h-40">{children}</div>
      <button className="btn" disabled={buttonDisabled}>
        {buttonText}
      </button>
    </div>
  );
}
