import { IconType } from "react-icons/lib";

type AdminNavItemType = {
  selected?: boolean;
  icon?: IconType;
  label?: string;
};

export default function AdminNavItem({
  selected,
  icon: Icon,
  label,
}: AdminNavItemType) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-center gap-1 border-b-2 p-2 text-center transition hover:text-black ${
        selected
          ? "border-b-slate-800 text-black" // Styles for selected item
          : "border-transparent text-gray-500" // Styles for unselected item
      }`}
    >
      {Icon && <Icon size={20} />}
      <div className="break-normal text-center text-base">{label}</div>
    </div>
  );
}
