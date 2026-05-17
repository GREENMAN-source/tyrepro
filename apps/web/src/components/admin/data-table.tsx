import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Column<T> = {
  key: keyof T;
  label: string;
};

export function DataTable<T extends Record<string, string | number>>({ title, rows, columns }: { title: string; rows: T[]; columns: Column<T>[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.06] p-4 text-white shadow-glass">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
            <Input className="w-64 border-white/10 bg-black/20 pl-9 text-white" placeholder="Search" />
          </div>
          <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">Filter</Button>
          <Button>New</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/56">
              {columns.map((column) => (
                <th key={String(column.key)} className="px-3 py-3 font-medium">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-white/5">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-3 py-3">{row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-white/50">
        <span>Showing 1-{rows.length} of 128</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white">Previous</Button>
          <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white">Next</Button>
        </div>
      </div>
    </section>
  );
}
