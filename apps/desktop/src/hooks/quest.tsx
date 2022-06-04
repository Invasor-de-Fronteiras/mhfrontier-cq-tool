import React, { ReactNode, useCallback, useState } from 'react';
import { QuestFile } from '../types/quest-file';

interface QuestContextValue {
    quest?: QuestFile | null;
    onLoadQuest?: (value: QuestFile) => void;
    onCloseQuest?: () => void;
}

interface QuestProviderProps {
    children?: ReactNode;
}

export const QuestContext = React.createContext<QuestContextValue>({});

export const QuestProvider: React.FC<QuestProviderProps> = ({
    children
}) => {
    const [quest, setQuest] = useState<QuestFile | null>(null);

    const onCloseQuest = useCallback(() => {
        setQuest(null);
    }, []);

    const onLoadQuest = useCallback((value: QuestFile) => {
        setQuest(value);
    }, []);

    return <QuestContext.Provider value={{
        quest,
        onCloseQuest,
        onLoadQuest
    }}>
        {children}
    </QuestContext.Provider>;
}