import { SelectOption } from "../components/Select";

export enum ObjectiveType {
    Nothing = 0,
    Hunt = 1,
    Capture = 257,
    Slay = 513,
    Damage = 32772,
    Slay_or_Damage = 98308,
    Slay_All = 262144,
    Slay_Total = 131072,
    Deliver = 2,
    Break_Part = 16388,
    Deliver_Flag = 4098,
    Esoteric_Action = 16
}

export const objective_options: SelectOption[] = Object.entries(ObjectiveType)
    .filter(([, value]) => typeof value === 'number')
    .map(([label, value]) => ({
        label,
        value: value as number,
    }));