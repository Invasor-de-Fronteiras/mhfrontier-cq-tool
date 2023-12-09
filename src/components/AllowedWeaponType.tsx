/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from "classnames";
import React, { useMemo } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";

interface AllowedWeaponTypeProps {
  label?: string;
  className?: string;
  value: number;
  onChange: (value: number) => void;
  msFlag: number;
  onChangeMSFlag: (value: number) => void;
}

const wrapOnChange = (onChange: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
}

const checkBit = (value: number, bitValue: number): boolean => (bitValue & value) > 0;

const weaponTypeBit = {
    GS: 1,
    HBG: 2,
    Hammer: 4,
    Lance: 8,
    SNS: 16,
    LBG: 32,
    DS: 64,
    LS: 128,
    HH: 256,
    GL: 512,
    Bow: 1024,
    tonfa: 2048,
    SA: 4096,
}

export function AllowedWeaponType({
  className,
  value,
  onChange,
  msFlag,
  onChangeMSFlag
}: AllowedWeaponTypeProps) {
    const ms = useMemo(() => msFlag === 64, [msFlag]);
    

    const onChangeMS = (check: boolean) => {
        onChangeMSFlag(check ? 64 : 0);
    }

    const weapon = useMemo(() => ({
        GS: checkBit(value, 1),
        HBG: checkBit(value, 2),
        Hammer: checkBit(value, 4),
        Lance: checkBit(value, 8),
        SNS: checkBit(value, 16),
        LBG: checkBit(value, 32),
        DS: checkBit(value, 64),
        LS: checkBit(value, 128),
        HH: checkBit(value, 256),
        GL: checkBit(value, 512),
        Bow: checkBit(value, 1024),
        tonfa: checkBit(value, 2048),
        SA: checkBit(value, 4096),
        All: (8191 & value) === 8191
    }), [value]);

    const onChangeWeapon = (type: keyof (typeof weaponTypeBit)) => (check: boolean) => {
        const bitValue = weaponTypeBit[type];
        if (check) {
            onChange(value | bitValue);
            return;
        }

        onChange(value & (65535 - bitValue));
    }

    const onChangeAllWeapon = (check: boolean) => {
        if (check) {
            onChange(value | 8191);
            return;
        }

        onChange(value & (65535 - 8191));
    }

    return (
        <div className={classNames("px-2 py-2 flex flex-row flex-wrap", className)}>
            <div className="right-0 mt-3 mr-4">
                <Input
                    label="Weapon types disabled"
                    type="number"
                    value={value}
                    onChange={wrapOnChange(onChange)}
                />
            </div>
            <div className="right-0 mt-3 mr-4">
                <Input
                    label="Ms Flag"
                    type="number"
                    value={msFlag}
                    onChange={wrapOnChange(onChangeMSFlag)}
                />
            </div>
            <div className="right-0 mt-3 mr-4">
                <Checkbox name="All" label="All" value={weapon.All} onChange={onChangeAllWeapon} />
                <Checkbox name="GS" label="GS" value={weapon.GS} onChange={onChangeWeapon('GS')} />
                <Checkbox name="LS" label="LS" value={weapon.LS} onChange={onChangeWeapon('LS')} />
                <Checkbox name="SNS" label="SNS" value={weapon.SNS} onChange={onChangeWeapon('SNS')} />
                <Checkbox name="DS" label="DS" value={weapon.DS} onChange={onChangeWeapon('DS')} />
            </div>
            <div className="right-0 mt-3 mr-4">
                <Checkbox name="Hammer" label="Hammer" value={weapon.Hammer} onChange={onChangeWeapon('Hammer')} />
                <Checkbox name="HH" label="HH" value={weapon.HH} onChange={onChangeWeapon('HH')} />
                <Checkbox name="Lance" label="Lance" value={weapon.Lance} onChange={onChangeWeapon('Lance')} />
                <Checkbox name="GL" label="GL" value={weapon.GL} onChange={onChangeWeapon('GL')} />
                <Checkbox name="SA" label="SA" value={weapon.SA} onChange={onChangeWeapon('SA')} />
            </div>
            <div className="right-0 mt-3 mr-4">
                <Checkbox name="tonfa" label="tonfa" value={weapon.tonfa} onChange={onChangeWeapon('tonfa')} />
                <Checkbox name="LBG" label="LBG" value={weapon.LBG} onChange={onChangeWeapon('LBG')} />
                <Checkbox name="HBG" label="HBG" value={weapon.HBG} onChange={onChangeWeapon('HBG')} />
                <Checkbox name="Bow" label="Bow" value={weapon.Bow} onChange={onChangeWeapon('Bow')} />
            </div>
            <div className="right-0 mt-3 mr-4">
                <Checkbox name="MS" label="MS" value={ms} onChange={onChangeMS} />
            </div>
        </div>
    );
}

interface AllowedWeaponTypeFieldProps<T extends FieldValues> extends Omit<AllowedWeaponTypeProps, 'value' | 'onChange' | 'msFlag' | 'onChangeMSFlag'> {
  /**
   * Path reference to the value in the form data.
   */
  name: Path<T>;
  msFlag: Path<T>;
  control: Control<T>;
}

export function AllowedWeaponTypeField<T extends FieldValues>({
    name,
    msFlag,
    control,
    ...props
}: AllowedWeaponTypeFieldProps<T>) {
    const { field } = useController({
        name,
        control
    });

    const { field: msField } = useController({
        name: msFlag,
        control,
    });

    return <AllowedWeaponType
        {...props}
        value={field.value as number} 
        onChange={field.onChange}
        msFlag={msField.value as number}
        onChangeMSFlag={msField.onChange}
    />;
}
