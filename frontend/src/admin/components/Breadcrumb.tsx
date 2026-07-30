import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="text-slate-400 hover:text-[#008C99] transition-colors flex items-center"
      >
        <Home size={14} />
      </button>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="text-slate-300" />
          {item.path && i < items.length - 1 ? (
            <button
              onClick={() => navigate(item.path!)}
              className="text-slate-400 hover:text-[#008C99] transition-colors font-medium"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-700 font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
