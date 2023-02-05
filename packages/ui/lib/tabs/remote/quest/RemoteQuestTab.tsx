import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { GroupCard } from "../../../components/CardGroup";
import { Input } from "../../../components/Input";
import { Pagination } from "../../../components/Pagination";
import { Select } from "../../../components/Select";
import { useConfig } from "../../../context/ConfigContext";
import { useRemoteQuest } from "../../../context/RemoteQuestContext";
import { PERIOD, QuestDB, QuestDBQueryOptions, SEASON } from "../../../utils";
import { item_options } from "../../../utils/items";
import { AddQuestToList } from "./AddQuestToList";
import { RemoteQuestTable } from "./RemoteQuestTable";

export function RemoteQuestTab() {
    const { countQuests, getQuests, uploadQuests } = useRemoteQuest();
    const { dbSelected } = useConfig();
    const [quests, setQuests] = useState<QuestDB[]>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage] = useState<number>(10);
    const [totalQuests, setTotalQuests] = useState<number>(0);
    const [query, setQuery] = useState<QuestDBQueryOptions>({});
    const [quest, setQuest] = useState<QuestDB | null>(null);

    useEffect(() => {
        countQuests(query)
            .then(v => {
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
            per_page: perPage
        })
            .then(v => {
                setQuests(v);
            });
    }, [totalQuests, page]);

    useEffect(() => {
        setQuery({});
    }, [dbSelected]);

    const uploadQuestFromFile = async () => {
        await uploadQuests();

        setTotalQuests(totalQuests + 1);
    }

    const onSearch = (key: keyof QuestDBQueryOptions, value: any) => {
        if (value === null || value === '') {
            const { ...data } = query;
            delete data[key];
            return setQuery(data);
        }
        setQuery({ ...query, [key]: value });
    }

    const onInputChange = useCallback((key: keyof QuestDBQueryOptions) => (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onSearch(key, `%${e.target.value}%`);
    }, [onSearch]);

    const onInputNumberChange = useCallback((key: keyof QuestDBQueryOptions) => (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onSearch(key, parseInt(e.target.value, 10));
    }, [onSearch]);

    return (
        <div className="flex flex-row flex-wrap gap-2">
            <GroupCard title="Control">
                <Button type="button" onClick={uploadQuestFromFile} > Upload quest from file</Button>
            </GroupCard>
            <GroupCard title="Filters">
                <Input
                    label="Title"
                    type="text"
                    onBlur={onInputChange('title')}
                />
                <Input
                    label="Main Objective"
                    type="text"
                    onBlur={onInputChange('main_objective')}
                />
                <Input
                    label="Sub A"
                    type="text"
                    onBlur={onInputChange('sub_a_objective')}
                />
                <Input
                    label="Sub B"
                    type="text"
                    onBlur={onInputChange('sub_b_objective')}
                />
                <Input
                    label="Quest Id"
                    type="number"
                    onBlur={onInputNumberChange('quest_id')}
                />
                <Select
                    label="Period"
                    options={[
                        { label: "Day", value: PERIOD.DAY },
                        { label: "Night", value: PERIOD.NIGHT },
                    ]}
                    isClearable
                    onChange={v => onSearch('period', v?.value)}
                />
                <Select
                    label="Season"
                    options={[
                        { label: "Warm", value: SEASON.WARM },
                        { label: "Cold", value: SEASON.COLD },
                        { label: "Breed", value: SEASON.BREED },
                    ]}
                    isClearable
                    onChange={v => onSearch('season', v?.value)}
                />
                <Select
                    label="Reward 1"
                    options={item_options}
                    isClearable
                    onChange={v => onSearch('reward_item1', v?.value)}
                />
                <Select
                    label="Reward 2"
                    options={item_options}
                    isClearable
                    onChange={v => onSearch('reward_item2', v?.value)}
                />
                <Select
                    label="Reward 3"
                    options={item_options}
                    isClearable
                    onChange={v => onSearch('reward_item3', v?.value)}
                />
            </GroupCard>
            <GroupCard title="Quests">
                {/* <QuestlistTable questlistIndex={selected} query={query} onEdit={setSelected} /> */}
                <Pagination
                    page={page}
                    onChangePage={setPage}
                    total={totalQuests}
                    perPage={perPage}
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
