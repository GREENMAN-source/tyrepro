import { RevenueChart } from "@/components/admin/revenue-chart";

export default function ReportsPage() {
  return (
    <div className="space-y-5 text-white">
      <h1 className="text-3xl font-black">Reports and analytics</h1>
      <RevenueChart />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["GST report", "Inventory valuation", "Customer report", "Profit trends"].map((report) => (
          <div key={report} className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <div className="font-bold">{report}</div>
            <p className="mt-2 text-sm text-white/55">Export to PDF or Excel from the production API.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
