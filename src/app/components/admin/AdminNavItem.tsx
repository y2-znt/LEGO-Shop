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
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-black transition cursor-pointer ${
        selected
          ? "border-b-slate-800 text-black" // Styles for selected item
          : "border-transparent text-gray-500" // Styles for unselected item
      }`}
    >
      {Icon && <Icon size={20} />}
      <div className="text-base text-center break-normal">{label}</div>
    </div>
  );
}
