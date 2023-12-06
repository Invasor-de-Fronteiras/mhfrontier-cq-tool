import { IconType } from "react-icons";

export interface Menu {
    defaultPath: string;
    groups: MenuGroup[];
}

export interface MenuGroup {
    name: string;
    items: MenuItem[];
}

export interface MenuItem {
    name: string;
    icon: IconType;
    uri?: string;
    disabled?: boolean;
    hide?: boolean;
    onClick?: () => void;
    isSubmit?: boolean;
    type?: boolean;  
}
