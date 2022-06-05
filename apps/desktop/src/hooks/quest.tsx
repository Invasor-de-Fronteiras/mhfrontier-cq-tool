import { invoke } from '@tauri-apps/api/tauri';
import React, { ReactNode, useState } from 'react';
import { QuestFile, QuestFileHeader, LargeMonsterPointers, LargeMonsterSpawn, MapInfo } from 'ui';

interface QuestContextValue {
    questPath?: string | null,
    largeMonsterSpawns: LargeMonsterSpawn[] | null,
    mapInfo: MapInfo | null,
    setLargeMonsterSpawns: (value: LargeMonsterSpawn[]) => void,
    questFileHeader: QuestFileHeader | null,
    setQuestFileHeader: (value: QuestFileHeader) => void,
    largeMonsterPointer: LargeMonsterPointers | null,
    setLargeMonsterPointer: (value: LargeMonsterPointers) => void,
    onLoadQuest?: (value: QuestFile, filepath: string) => void;
    onSaveQuest?: () => void;
    onCloseQuest?: () => void;
}

interface QuestProviderProps {
    children?: ReactNode;
}

interface SaveQuestPayload {
    filepath: string,
    quest: QuestFile
}

export const QuestContext = React.createContext<Partial<QuestContextValue>>({});

export const QuestProvider: React.FC<QuestProviderProps> = ({
    children
}) => {
    const [questPath, setQuestPath] = useState<string | null>(null);
    const [questFileHeader, setQuestFileHeader] = useState<QuestFileHeader | null>(null);
    const [mapInfo, setMapInfo] = useState<MapInfo | null>(null);
    const [largeMonsterSpawns, setLargeMonsterSpawns] = useState<LargeMonsterSpawn[] | null>(null);
    const [largeMonsterPointer, setLargeMonsterPointer] = useState<LargeMonsterPointers | null>(null);

    const onCloseQuest = () => {
        setQuestPath(null);
        setLargeMonsterSpawns(null);
        setLargeMonsterPointer(null);
        setQuestFileHeader(null);
        setMapInfo(null);
    };

    const onLoadQuest = (quest: QuestFile, filepath: string) => {
        setQuestPath(filepath);
        setLargeMonsterSpawns(quest.large_monster_spawns);
        setLargeMonsterPointer(quest.large_monster_pointers);
        setQuestFileHeader(quest.header);
        setMapInfo(quest.map_info);
        console.log('onload');
    };

    const onSaveQuest = async () => {
        console.log('save quest: ',largeMonsterSpawns);
        if (!questPath || !questFileHeader || !mapInfo ||!largeMonsterSpawns || !largeMonsterPointer) return;

        const quest: QuestFile = {
            header: questFileHeader,
            map_info: mapInfo,
            large_monster_pointers: largeMonsterPointer,
            large_monster_spawns: largeMonsterSpawns,
            large_monster_ids: largeMonsterSpawns.map(v => v.monster_id),
        }


        const payload: SaveQuestPayload = { filepath: questPath, quest };

        const response: string = await invoke("save_quest_file", {
            event: JSON.stringify(payload),
        });

        console.log('response: ', response);

        const data = JSON.parse(response);
        if (data && data.error) {
            console.log('error: ', data.error);
            return;
        }

        
    };

    console.log('context: ', largeMonsterSpawns)
    return <QuestContext.Provider value={{
        questPath,
        largeMonsterSpawns,
        mapInfo,
        setLargeMonsterSpawns,
        questFileHeader,
        setQuestFileHeader,
        largeMonsterPointer,
        setLargeMonsterPointer,
        onCloseQuest,
        onLoadQuest,
        onSaveQuest
    }}>
        {children}
    </QuestContext.Provider>;
}