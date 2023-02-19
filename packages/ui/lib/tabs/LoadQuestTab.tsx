import { Button, useEditor } from "ui";
import { Dropzone } from "../components/Dropzone";
import { maps } from "../utils";

export function LoadQuestTab() {
  const { loadQuest } = useEditor();

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
            onClick={() => loadQuest()}
          >
            <Dropzone />
          </Card>
          <Card
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
                <option key={map.id}>{map.name}</option>
              ))}
            </select>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  buttonText: string;
  children: React.ReactNode;
  buttonDisabled?: boolean;
  onClick?: () => void;
}

function Card({ title, buttonText, onClick, buttonDisabled, children }: CardProps) {
  return (
    <div className="border px-2 py-3 w-full max-w-lg items-center flex flex-col">
      <h3 className="text-center">{title}</h3>
      <div className="flex-1 p-3 w-full h-full max-h-40">{children}</div>
      <Button type="button" onClick={onClick} disabled={buttonDisabled}>{buttonText}</Button>
    </div>
  );
}
