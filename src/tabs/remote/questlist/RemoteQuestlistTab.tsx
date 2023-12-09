import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Button } from "../../../components/Button";
import { GroupCard } from "../../../components/CardGroup";
import { Input } from "../../../components/Input";
import { Pagination } from "../../../components/Pagination";
import { Select } from "../../../components/Select";
import { useRemoteQuestlist } from "../../../context/RemoteQuestlistContext";
import { PERIOD, periodToString, QuestlistDB, QuestlistDBQueryOptions, quest_category, SEASON, seasonToNumber } from "../../../utils";
import { RemoteQuestlistEdit } from "./RemoteQuestlistEdit";
import { RemoteQuestlistTable } from "./RemoteQuestlistTable";


function reorder(list: QuestlistDB[], startIndex: number, endIndex: number): QuestlistDB[] {
    const result = Array.from(list).sort((a, b) => a.position - b.position);
    result.forEach((v, i) => {
        v.position = i;
    });

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    result.forEach((v, i) => {
        v.position = i;
    });
    return result;
}

export function RemoteQuestlistTab() {
    const { countQuestlists, getQuestlists, updateQuestlistOptions, importQuestlists } = useRemoteQuestlist();
    const [quests, setQuests] = useState<QuestlistDB[]>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage] = useState<number>(10);
    const [totalQuests, setTotalQuests] = useState<number>(0);
    const [query, setQuery] = useState<QuestlistDBQueryOptions>({});
    const [quest, setQuest] = useState<QuestlistDB | null>(null);

    useEffect(() => {
        countQuestlists(query)
            .then(v => {
                setTotalQuests(v);
            });
    }, [query]);

    useEffect(() => {
        if (totalQuests <= 0) {
            setQuests([]);
            return;
        } 

        getQuestlists({
            ...query,
            page: page - 1,
            per_page: perPage
        })
            .then(v => {
                setQuests(v);
            });
    }, [totalQuests, page]);

    const refresh = async () => {
        const newTotalQuest = await countQuestlists(query);

        if (newTotalQuest !== totalQuests) {
            setTotalQuests(newTotalQuest);
            return;
        }

        const result = await getQuestlists({
            ...query,
            page: page - 1,
            per_page: perPage
        });

        setQuests(result);
    }

    const onSearch = (key: keyof QuestlistDBQueryOptions, value?: string | number | null | boolean) => {
        if (value === null || value === undefined || value === '') {
            const { ...data } = query;
            delete data[key];
            return setQuery(data);
        }
        setQuery({ ...query, [key]: value });
    }

    const onInputChange = useCallback((key: keyof QuestlistDBQueryOptions) => (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onSearch(key, `%${e.target.value}%`);
    }, [onSearch]);

    const onInputNumberChange = useCallback((key: keyof QuestlistDBQueryOptions) => (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onSearch(key, e.target.value ? parseInt(e.target.value, 10) : null);
    }, [onSearch]);

    const getAllCategoryQuests = async (category: number, categoryPerPage = 100): Promise<QuestlistDB[]> => {
        const allQuests: QuestlistDB[] = [];

        const totalCategoryQuests = await countQuestlists({ category });
        const totalCategoryPages = Math.ceil(totalCategoryQuests / categoryPerPage);

        for (let i=0;i < totalCategoryPages; i+=1) {
            const pageQuests = await getQuestlists({ category, page: i, per_page: categoryPerPage });
            allQuests.push(...pageQuests);
        }

        return allQuests;
    }

    const saveCategoryQuestsOrder = async (categoryQuests: QuestlistDB[]): Promise<void> => {
        for (let i=0;i < categoryQuests.length; i+=1) {
            const current = categoryQuests[i];
            await updateQuestlistOptions(
                current.quest_id,
                periodToString(current.period),
                seasonToNumber(current.season),
                {
                    enable: current.enable,
                    only_dev: current.only_dev,
                    position: current.position,
                }
            );
        }
    }

    const onChangePosition = async (category: number, current: number, destination: number) => {
        const allQuests: QuestlistDB[] = await getAllCategoryQuests(category);

        const items = reorder(
            allQuests,
            current,
            destination === -1 ? quests.length - 1 : destination
        );

        await saveCategoryQuestsOrder(items);
        await refresh();
    }

    const onReorder = async () => {
        const { category } = query;
        if (!category) {
            toast.error(`You need select a category to reorder`);
            return;
        }

        const allQuests: QuestlistDB[] = await getAllCategoryQuests(category);
        const items = allQuests.sort((a, b) => a.position - b.position);
        items.forEach((v, i) => {
            v.position = i;
        });

        await saveCategoryQuestsOrder(items);
        await refresh();
        toast.success(`Reorder quests completed`);
    }

    return (
        <div className="flex flex-row flex-wrap gap-2">
            <GroupCard title="Control">
                <Select
                    label="Category"
                    options={quest_category}
                    isClearable
                    onChange={v => onSearch('category', v?.value)}
                />
                <div className="justify-center items-center flex pt-6">
                    <Button type="button" onClick={onReorder} > Reorder</Button>
                </div>
                <div className="justify-center items-center flex pt-6">
                    <Button type="button" onClick={importQuestlists} >Import questlist</Button>
                </div>
            </GroupCard>
            <GroupCard title="Filters">
                <Input
                    label="Title"
                    type="text"
                    onBlur={onInputChange('title')}
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
                    label="Enable"
                    options={[
                        { label: "Only Enable", value: true },
                        { label: "Only Disable", value: false },
                    ]}
                    isClearable
                    onChange={v => onSearch('enable', v?.value)}
                />
                <Select
                    label="Dev quests"
                    options={[
                        { label: "Show Dev quests", value: true },
                        { label: "Show not dev quests", value: false },
                    ]}
                    isClearable
                    onChange={v => onSearch('only_dev', v?.value)}
                />
            </GroupCard>
            <GroupCard title="Quests">
                <Pagination
                    page={page}
                    onChangePage={setPage}
                    total={totalQuests}
                    perPage={perPage}
                    className="w-full justify-center mb-8"
                />
                <RemoteQuestlistTable
                    quests={quests}
                    onRefresh={refresh}
                    onEditQuestlist={setQuest}
                    onChangePosition={onChangePosition}
                />
            </GroupCard>
            
            {quest !== null && (
                <div className="absolute right-0 top-0 overflow-y-auto h-full">
                    <RemoteQuestlistEdit
                        quest={quest}
                        key={quest.quest_id}
                        onRefresh={refresh}
                        onClose={() => setQuest(null)}
                    />
                </div>
            )}
        </div>
    );
}
