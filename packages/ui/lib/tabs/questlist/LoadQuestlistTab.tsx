import { Button, useQuestlistEditor } from "ui";

export function LoadQuestlistTab() {
  const { loadQuestlists, loadQuestlistsOld } = useQuestlistEditor();
  return (
    <div className="flex flex-col items-center justify-center mt-6 px-2">
      <div className="flex flex-col items-center justify-center p-6 border rounded w-full max-w-2xl">
        <h1 className="font-bold text-2xl text-center">
          MHFrontier Questlist Editor
        </h1>
        <p>Create and edit questlists for MHFrontier.</p>
        <div className="flex flex-col md:flex-row gap-6 mt-3 w-full">
          <Card
            buttonText="Load folder"
            title="Select a questlist folder from your machine."
            onClick={loadQuestlists}
          />
          <Card
            buttonText="Load folder (old)"
            title="Load old version of questlist."
            onClick={loadQuestlistsOld}
          />
          <Card
            buttonText="Create questlist"
            title="Create a new questlist files."
            buttonDisabled
          />
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  buttonText: string;
  onClick?: () => void;
  buttonDisabled?: boolean;
}

function Card({ title, buttonText, onClick, buttonDisabled }: CardProps) {
  return (
    <div className="border px-2 py-3 w-full max-w-lg items-center flex flex-col">
      <h3 className="text-center">{title}</h3>
      <div className="flex-1 p-3 w-full h-full max-h-40"></div>
      <Button type="button" onClick={onClick} disabled={buttonDisabled}>{buttonText}</Button>
    </div>
  );
}
