import { useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import { GroupCard } from "../../components/CardGroup";
import { Input } from "../../components/Input";
import { useQuestlistEditor } from "../../context/QuestlistEditorContext";
import { QuestInfoEdit } from "./QuestInfoEdit";
import { QuestInfoRow } from "./QuestlistRow";
import { QuestlistTable } from "./QuestlistTable";

export function QuestlistTab() {
    const { form } = useQuestlistEditor();
    const [selected, setSelected] = useState<null | number>(null);
    const [query, setQuery] = useState<Partial<QuestInfoRow>>({});
    const quests = useWatch({ control: form.control, name: 'quests' });

    const onSearch = useCallback((key: keyof QuestInfoRow, value: string ) => {
        console.log('search: ', key, value);
        if (value === null || value === '') {
            const { ...data } = query;
            delete data[key];
            return setQuery(data);
        }
        setQuery({ ...query, [key]: value });
    }, [query, setQuery]);

    const onInputChange = useCallback((key: keyof QuestInfoRow) => (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onSearch(key, e.target.value);
    }, [onSearch]);

    console.log('query: ', query);

    if (selected !== null) return <QuestInfoEdit questIndex={selected} onClose={() => setSelected(null)} />;

    return (
        <div className="flex flex-row flex-wrap gap-2">
            <GroupCard title="Filters">
                <Input
                    label="Title"
                    type="text"
                    // value={query.title || ''}
                    onBlur={onInputChange('title')}
                />
                Total: {quests.length}
            </GroupCard>
            <GroupCard title="Quests">
                <QuestlistTable questlistIndex={selected} query={query} onEdit={setSelected} />
            </GroupCard>
        </div>
    );
}
