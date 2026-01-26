import { PencilIcon, TrashIcon } from "lucide-react";

type CategoryProps = {
  icon: string;
  categoryName: string;
  type: "income" | "expense";
  default?: boolean;
};

export default function Category({ icon, categoryName, type }: CategoryProps) {
  return (
    <div className="inline-flex flex-col gap-2 w-80 bg-slate-400/20 shadow-xl px-6 py-4 rounded-lg">
      <span className="text-xl font-semibold">
        {icon} {categoryName}
      </span>

      <div className="-mx-6 h-px bg-slate-400"></div>
      <div className="flex justify-end items-center gap-3">
        <label
          className={`text-sm py-0.5 px-1 rounded-md border ${type === "income" ? "bg-green-300 border-green-500" : "bg-red-300 border-red-500"}`}
        >
          {type}
        </label>
        <PencilIcon size={20} className="text-blue-700 hover:text-blue-800" />
        <TrashIcon size={20} className="text-red-700 hover:text-red-800" />
      </div>
    </div>
  );
}
