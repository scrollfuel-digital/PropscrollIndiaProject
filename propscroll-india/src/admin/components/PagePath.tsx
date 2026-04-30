import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";

interface PagePathProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  action?: React.ReactNode;
}

export default function PagePath({ title, subtitle, breadcrumbs, action }: PagePathProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
      <div className="space-y-1">
        <Breadcrumb items={breadcrumbs} />
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-800">{title}</h1>
          {subtitle && <p className="text-xs md:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <div className="flex items-center gap-2 flex-wrap">{action}</div>
      )}
    </div>
  );
}
