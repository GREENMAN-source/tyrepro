import { DataTable } from "@/components/admin/data-table";

const rows = [
  { po: "PO-2026-P91KD", supplier: "Apollo Distributor South", items: 48, total: "Rs. 2,76,000", status: "Received" },
  { po: "PO-2026-M82LA", supplier: "MRF Regional Depot", items: 32, total: "Rs. 3,04,000", status: "Partially paid" },
  { po: "PO-2026-C73QF", supplier: "CEAT North Hub", items: 20, total: "Rs. 1,18,000", status: "Ordered" }
];

export default function PurchasesPage() {
  return <DataTable title="Purchase orders and receiving" rows={rows} columns={[
    { key: "po", label: "PO number" },
    { key: "supplier", label: "Supplier" },
    { key: "items", label: "Items" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" }
  ]} />;
}
