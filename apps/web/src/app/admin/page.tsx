import { DataTable } from "@/components/admin/data-table";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { dashboardKpis, inventoryRows } from "@/lib/demo-data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-5 text-white">
      <div>
        <h1 className="text-3xl font-black">Operations dashboard</h1>
        <p className="mt-1 text-sm text-white/55">Sales, inventory, appointments, payments, and alerts in one view.</p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-glass">
            <div className="flex items-center justify-between">
              <kpi.icon className="h-5 w-5 text-red-300" />
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{kpi.trend}</span>
            </div>
            <div className="mt-5 text-3xl font-black">{kpi.value}</div>
            <div className="text-sm text-white/55">{kpi.label}</div>
          </div>
        ))}
      </section>
      <RevenueChart />
      <DataTable
        title="Low stock and ageing watchlist"
        rows={inventoryRows}
        columns={[
          { key: "sku", label: "SKU" },
          { key: "product", label: "Product" },
          { key: "brand", label: "Brand" },
          { key: "batch", label: "Batch" },
          { key: "qty", label: "Qty" },
          { key: "warehouse", label: "Warehouse" },
          { key: "age", label: "Tyre age" },
          { key: "status", label: "Status" }
        ]}
      />
    </div>
  );
}
