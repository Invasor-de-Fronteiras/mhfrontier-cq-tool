import { useMemo, useState } from "react";

import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';
import { QuestInfo, QuestlistFile } from "../utils";
import { QuestlistEditorContextProvider } from "../context/QuestlistEditorContext";
import events from "../events";

interface SaveQuestlistPayload {
  folder: string;
  questlists: QuestlistFile[];
}

interface QuestlistEditorProps {
    children: React.ReactNode;
}

function QuestlistEditor({ children }: QuestlistEditorProps) {
  const [questlistPath, setQuestlistPath] = useState<string | null>(null);
  const [quests, setQuests] = useState<QuestInfo[] | undefined>(undefined);
  const [lastQuestlistFolder, setLastQuestlistFolder] = useState<string | undefined>(undefined);
  const [lastQuestFolder, setlastQuestFolder] = useState<string | undefined>(undefined);
  const data = useMemo(() => ({ quests: quests || [] }), [quests]);

  const handleSaveQuestlist = async (values: QuestInfo[]) => {
    if (!questlistPath || !values) return;
    const folder = await open({ multiple: false, directory: true, defaultPath: lastQuestlistFolder }) as string;
    if (!folder) return;

    const data = [...values];
    const questlists: QuestlistFile[] = [];

    let i = 0;
    while (data.length > 0) {
      const items = data.splice(0, 42);

      questlists.push({
        filename: `list_${i}`,
        offset: i,
        quests: items
      });

      i += 42;
    }

    try {
      await events.questlist.saveQuestlist({
        folder,
        questlists
      });

      toast.success('Successfully saved questlist!');
    } catch(err) {
      toast.error(`Failed to save questlists: ${err}`);
    }
  };

  const loadQuestlists = async () => {
    const path = await open({ multiple: false, directory: true, defaultPath: lastQuestlistFolder });
    if (!path) return;
    
    try {
      const questlists = await events.questlist.readQuestlist(path as string);
      setQuests((questlists as QuestlistFile[]).reduce<QuestInfo[]>((acc, cur) => {
        acc.push(...cur.quests);
        return acc;
      }, []));

      setLastQuestlistFolder(path as string);
      setQuestlistPath(path as string);
      toast.success('Questlist read successfully!');
    } catch (error) {
      toast.error(`Failed to read file: ${error}`);
    }
  };

  const getQuestFromFile = async (path: string): Promise<QuestInfo | null> => {
    try {
      const questInfo = await events.questlist.readQuestInfo(path);
      toast.success('Quest file read successfully!');
      return questInfo;
    } catch (error) {
      toast.error(`Failed to read file: ${error}`);
    }
    return null;
  }

  const getQuestsFromFile = async (): Promise<QuestInfo[]> => {
    try {
      const path = await open({ multiple: true, defaultPath: lastQuestFolder });
      if (!path) return [];
      const paths = Array.isArray(path) ? path : [path];
      const quests: QuestInfo[] = [];
      for (let i=0; i < paths.length; i+=1) {
        const quest = await getQuestFromFile(paths[i]);
        if (quest) quests.push(quest);
      }

      setlastQuestFolder(paths[0].substring(0, paths[0].lastIndexOf("\\")));
      return quests;
    } catch (error) {
      console.error("error ", error);
    }
    return [];
  }

  return (
    <QuestlistEditorContextProvider
      data={data}
      handleSaveQuestlist={handleSaveQuestlist}
      isLoadedQuestlists={!!quests}
      loadQuestlists={loadQuestlists}
      getQuestsFromFile={getQuestsFromFile}
    >
      {children}
    </QuestlistEditorContextProvider>
  );
}

export default QuestlistEditor;
