/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from "classnames";
import React, { useMemo } from "react";
import { Control, Path, useController } from "react-hook-form";
import { useEditor } from "../context/EditorContext";
import { QuestFile } from "../utils";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";

interface BitFlag {
    label: string;
    bitValue: number;
}

interface BitFlagsProps {
  label?: string;
  className?: string;
  value: number;
  onChange: (value: number) => void;
  options: BitFlag[];
}

function sliceArray<T>(arr: T[], chunkSize: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const wrapOnChange = (onChange: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
}

const checkBit = (value: number, bitValue: number): boolean => (bitValue & value) > 0;

interface BitFlagProps {
    label: string;
    bitValue: number;
    value: number;
    onChange: (value: number) => void;
}

export function BitFlag({ label, bitValue, value, onChange }: BitFlagProps) {
    const checked = useMemo(() => checkBit(value, bitValue), [value]);

    const onChangBit = (check: boolean) => {
        if (check) {
            onChange(value | bitValue);
            return;
        }

        onChange(value & (value - bitValue));
    }

    return <Checkbox
        name={label}
        label={label}
        value={checked}
        onChange={onChangBit}
    />;
}

export function BitFlags({
  className,
  label,
  value,
  onChange,
  options
}: BitFlagsProps) {
    const [pageOne, ...pages] = useMemo<BitFlag[][]>(() => {
        const result = sliceArray([{ label: 'all', bitValue: 0 },  ...options], 4);
        result[0].shift();
        return result;
    }, [options]);
    const allFlags = useMemo(() => {
        return options.reduce<number>((acc, cur) => acc + cur.bitValue, 0);
    }, [options]);
    const all = useMemo(() => (allFlags & value) === allFlags, [value, allFlags]);

    const onChangeAll = (check: boolean) => {
        if (check) {
            onChange(value | allFlags);
            return;
        }

        onChange(value & (value - allFlags));
    }

    return (
        <div className={classNames("flex flex-row flex-wrap", className)}>
            <div className="right-0 mr-4 flex">
                <Input
                    label={label}
                    type="number"
                    value={value}
                    onChange={wrapOnChange(onChange)}
                />
            </div>
            <div className="right-0 mt-3 mr-4">
                <Checkbox name="All" label="All" value={all} onChange={onChangeAll} />
                {pageOne.map(v => 
                    <BitFlag
                        key={v.bitValue}
                        label={v.label}
                        bitValue={v.bitValue}
                        value={value}
                        onChange={onChange}
                    />
                )}
            </div>
            {pages.map((items, i) => 
                <div key={i} className="right-0 mt-3 mr-4">
                    {items.map(v => 
                        <BitFlag
                            key={v.bitValue}
                            label={v.label}
                            bitValue={v.bitValue}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                </div>
            )}
            
        </div>
    );
}

interface BitFlagsFieldProps<T = QuestFile> extends Omit<BitFlagsProps, 'value' | 'onChange'> {
  /**
   * Path reference to the value in the form data.
   */
  name: Path<T>;
  // @ts-ignore
  control?: Control<T>;
}

export function BitFlagsField<T>({
    name,
    control,
    ...props
}: BitFlagsFieldProps<T>) {
    const { form } = useEditor();
    const { field } = useController({
        // @ts-ignore
        name,
        // @ts-ignore
        control: control ?? form.control,
    });

    return <BitFlags
        {...props}
        value={field.value as number} 
        onChange={field.onChange}
    />;
}
