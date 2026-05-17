import { DataTable } from "@/components/admin/data-table";

const rows = [
  { invoice: "INV-2026-A19K2", customer: "Ravi Kumar", items: 4, total: "Rs. 31,400", paid: "Rs. 20,000", status: "Partial" },
  { invoice: "INV-2026-B84QP", customer: "Sharma Logistics", items: 12, total: "Rs. 1,18,000", paid: "Rs. 1,18,000", status: "Paid" },
  { invoice: "INV-2026-C21ZM", customer: "Anika Rao", items: 2, total: "Rs. 12,700", paid: "Rs. 0", status: "Pending" }
];

export default function SalesPage() {
  return <DataTable title="Sales orders and returns" rows={rows} columns={[
    { key: "invoice", label: "Invoice" },
    { key: "customer", label: "Customer" },
    { key: "items", label: "Items" },
    { key: "total", label: "Total" },
    { key: "paid", label: "Paid" },
    { key: "status", label: "Status" }
  ]} />;
}
