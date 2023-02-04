import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { GroupCard } from "../../../components/CardGroup";
import { Pagination } from "../../../components/Pagination";
import { useRemoteQuest } from "../../../context/RemoteQuestContext";
import { QuestDB, QuestDBQueryOptions } from "../../../utils";
import { AddQuestToList } from "./AddQuestToList";
import { RemoteQuestTable } from "./RemoteQuestTable";

export function RemoteQuestTab() {
    const { countQuests, getQuests, uploadQuest } = useRemoteQuest();
    const [quests, setQuests] = useState<QuestDB[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalQuests, setTotalQuests] = useState<number>(0);
    const [query, setQuery] = useState<QuestDBQueryOptions>({});
    const [quest, setQuest] = useState<QuestDB | null>(null);

    useEffect(() => {
        countQuests(query)
            .then(v => {
                console.log('totalQuests: ', totalQuests);
                setTotalQuests(v);
            });
    }, [query]);

    useEffect(() => {
        if (totalQuests <= 0) {
            setQuests([]);
            return;
        } 

        getQuests({
            ...query,
            page: page - 1,
            per_page: 15
        })
            .then(v => {
                setQuests(v);
            });
    }, [totalQuests, page]);

    const uploadQuestFromFile = async () => {
        await uploadQuest();

        setTotalQuests(totalQuests + 1);
    }

    return (
        <div className="flex flex-row flex-wrap gap-2">
            <GroupCard title="Control">
                <Button type="button" onClick={uploadQuestFromFile} > Upload quest from file</Button>
            </GroupCard>
            <GroupCard title="Filters">
            </GroupCard>
            <GroupCard title="Quests">
                {/* <QuestlistTable questlistIndex={selected} query={query} onEdit={setSelected} /> */}
                <Pagination
                    page={page}
                    onChangePage={setPage}
                    total={totalQuests}
                    perPage={10}
                    className="w-full justify-center mb-8"
                />
                <RemoteQuestTable quests={quests} onAddToQuestlist={setQuest} />
            </GroupCard>
            
            {quest !== null && (
                <div className="absolute right-0 top-0 overflow-y-auto h-full">
                    <AddQuestToList
                        quest={quest}
                        key={quest.quest_id}
                        onClose={() => setQuest(null)}
                    />
                </div>
            )}
        </div>
    );
}
