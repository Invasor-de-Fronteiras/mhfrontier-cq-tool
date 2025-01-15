import type { IconType } from "react-icons";
import classnames from "classnames";
import { useLocation } from "react-router-dom";
import { useLayout } from "./LayoutContext";

interface LayoutNavbarItemPropsButton {
  name: string;
  icon: IconType;
  uri?: string;
  disabled?: boolean;
  onClick?: () => void;
  isSubmit?: boolean;
  type?: boolean;
}

export function LayoutNavbarItemButton({
  name,
  disabled,
  uri,
  icon: Icon,
  isSubmit,
  onClick,
}: LayoutNavbarItemPropsButton) {
  const { isOpen } = useLayout();
  const location = useLocation();
  const isSelected = location.pathname === uri;

  return (
    <li key={name}>
      <button
        type={isSubmit ? 'submit' : 'button'}
        className={classnames(
          "font-semibold flex flex-row items-center p-2 m-2 rounded gap-3",
          {
            "bg-emerald-300 text-emerald-700 cursor-default dark:text-white":
              isSelected,
            "opacity-30": disabled,
            "hover:bg-emerald-300 hover:text-emerald-700 cursor-pointer":
              !disabled,
          }
        )}
        onClick={onClick}
      >
        <Icon size={16} />
        {isOpen && <span>{name}</span>}
      </button>
    </li>
  );
}