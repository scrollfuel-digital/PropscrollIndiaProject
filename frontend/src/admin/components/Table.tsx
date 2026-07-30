import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T, index: number) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyIcon?: React.ReactNode;
  emptyText?: string;
  keyExtractor: (row: T) => string;
  pageSize?: number;
}

const PAGE_SIZES = [5, 10, 20, 50];

export default function Table<T>({
  columns,
  data,
  loading,
  emptyIcon,
  emptyText = "No data found.",
  keyExtractor,
  pageSize: defaultPageSize = 10,
}: TableProps<T>) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);

  // Reset to page 1 when data or pageSize changes
  React.useEffect(() => { setPage(1); }, [data.length, pageSize]);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const from = data.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, data.length);
  const paginated = data.slice((safePage - 1) * pageSize, safePage * pageSize);

  // Page number buttons with ellipsis
  const buildPages = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (safePage > 3) pages.push("...");
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pages.push(i);
    if (safePage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const btnBase = "h-8 min-w-[32px] px-1 flex items-center justify-center rounded-lg text-sm font-semibold transition-all";

  // ── Skeleton ──
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3.5">
                    <div className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ── Empty ──
  if (data.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={col.width ? { width: col.width } : {}}
                  className="px-4 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-wide whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          {emptyIcon && <div className="text-gray-200">{emptyIcon}</div>}
          <p className="text-slate-400 text-sm">{emptyText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={col.width ? { width: col.width } : {}}
                  className="px-4 py-3 text-xs font-black text-slate-400 uppercase tracking-wide whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {paginated.map((row, idx) => (
              <tr key={keyExtractor(row)} className="hover:bg-[#008C99]/[0.02] transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render(row, (safePage - 1) * pageSize + idx)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Table Footer Pagination ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100 gap-3">
        {/* Left: rows per page + info */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Rows</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="text-xs font-semibold text-slate-600 border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#008C99] cursor-pointer"
            >
              {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <span className="text-xs text-slate-400">
            <span className="font-semibold text-slate-600">{from}–{to}</span> of{" "}
            <span className="font-semibold text-slate-600">{data.length}</span>
          </span>
        </div>

        {/* Right: page controls */}
        <div className="flex items-center gap-1">
          {/* First */}
          <button onClick={() => setPage(1)} disabled={safePage === 1}
            className={`${btnBase} text-slate-400 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed`}>
            <ChevronsLeft size={15} />
          </button>
          {/* Prev */}
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}
            className={`${btnBase} text-slate-400 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed`}>
            <ChevronLeft size={15} />
          </button>

          {/* Page numbers — hide on very small screens */}
          <div className="hidden xs:flex items-center gap-1">
            {buildPages().map((p, i) =>
              p === "..." ? (
                <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs select-none">…</span>
              ) : (
                <button key={p} onClick={() => setPage(p as number)}
                  className={`${btnBase} ${
                    safePage === p
                      ? "bg-[#008C99] text-white shadow-sm shadow-[#008C99]/30 min-w-[32px]"
                      : "text-slate-600 hover:bg-gray-200"
                  }`}>
                  {p}
                </button>
              )
            )}
          </div>

          {/* Mobile: just show current/total */}
          <span className="xs:hidden text-xs text-slate-500 px-2 font-semibold">{safePage}/{totalPages}</span>

          {/* Next */}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
            className={`${btnBase} text-slate-400 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed`}>
            <ChevronRight size={15} />
          </button>
          {/* Last */}
          <button onClick={() => setPage(totalPages)} disabled={safePage === totalPages}
            className={`${btnBase} text-slate-400 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed`}>
            <ChevronsRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
