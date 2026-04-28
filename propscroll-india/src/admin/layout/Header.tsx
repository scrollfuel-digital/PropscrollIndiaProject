import { Bell, User } from "lucide-react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-slate-500 hover:text-slate-800">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
            <User size={16} className="text-teal-600" />
          </div>
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
