import { useMemo, useState } from "react";

import { QuestInfo, QuestlistEditorContextProvider, QuestlistFile } from "ui";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { toast } from 'react-toastify';
import { getConfig, importQuestlists } from "./events";

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
  const data = useMemo(() => ({ quests: quests || [] }), [quests]);

  const handleSaveQuestlist = async (values: QuestInfo[]) => {
    if (!questlistPath || !values) return;
    const folder = await open({ multiple: false, directory: true }) as string;
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

    const payload: SaveQuestlistPayload = {
      folder,
      questlists
    };

    const response: string = await invoke("save_all_questlists", {
      event: JSON.stringify(payload),
    });

    const resData = JSON.parse(response);
    if (resData?.error) {
      toast.error(`Failed to save questlists: ${resData.error}`);
      return;
    }

    toast.success('Successfully saved questlist!');
  };

  const loadQuestlists = async () => {
    try {
      const path = await open({ multiple: false, directory: true });
      if (!path) return;

      const response: string = await invoke("read_all_questlist", {
        event: path,
      });

      const questlists = JSON.parse(response);
      if (questlists && questlists.error) {
        toast.error(`Failed to read file: ${questlists.error}`);
        return;
      }

      setQuests((questlists as QuestlistFile[]).reduce<QuestInfo[]>((acc, cur) => {
        acc.push(...cur.quests);
        return acc;
      }, []));
      setQuestlistPath(path as string);
      toast.success('Quest file read successfully!');
    } catch (error) {
      console.error("error ", error);
    }
  };

  const loadQuestlistsOld = async () => {
    try {
      const path = await open({ multiple: false, directory: true });
      if (!path) return;

      const response: string = await invoke("read_all_questlist_old", {
        event: path,
      });

      const questlists = JSON.parse(response);
      if (questlists && questlists.error) {
        toast.error(`Failed to read file: ${questlists.error}`);
        return;
      }

      setQuests((questlists as QuestlistFile[]).reduce<QuestInfo[]>((acc, cur) => {
        acc.push(...cur.quests);
        return acc;
      }, []));
      setQuestlistPath(path as string);
      toast.success('Quest file read successfully!');
    } catch (error) {
      console.error("error ", error);
    }
  };

  const getQuestFromFile = async (path: string): Promise<QuestInfo | null> => {
    try {
      const response: string = await invoke("read_questinfo", {
        event: path,
      });

      const questInfo = JSON.parse(response);
      if (questInfo && questInfo.error) {
        toast.error(`Failed to read file: ${questInfo.error}`);
        return null;
      }
      toast.success('Quest file read successfully!');
      return questInfo;
    } catch (error) {
      console.error("error ", error);
    }
    return null;
  }

  const onImportQuestlists = async (): Promise<void> => {
    try {
      const config = await getConfig();
      if (
        !config ||
        (!config.dbs || config.dbs.length === 0)
      ) {
        return;
      }
  
      const path = await open({ multiple: false, directory: true });
      if (!path) return;

      await importQuestlists({
        db_config: config.dbs[0],
        filepath: path as string
      });

      toast.success('Quest file read successfully!');
    } catch (error) {
      toast.error(`Failed to read file: ${error}`);
    }
  }

  const getQuests = async (): Promise<QuestInfo[]> => {
    try {
      const path = await open({ multiple: true });
      if (!path) return [];
      const paths = Array.isArray(path) ? path : [path];
      const quests: QuestInfo[] = [];
      for (let i=0; i < paths.length; i+=1) {
        const quest = await getQuestFromFile(paths[i]);
        if (quest) quests.push(quest);
      }

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
      loadQuestlistsOld={loadQuestlistsOld}
      getQuestFromFile={getQuests}
      importQuestlists={onImportQuestlists}
    >
      {children}
    </QuestlistEditorContextProvider>
  );
}

export default QuestlistEditor;
