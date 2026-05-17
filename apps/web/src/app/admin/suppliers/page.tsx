import { DataTable } from "@/components/admin/data-table";

const rows = [
  { name: "Apollo Distributor South", gst: "29AABCA0000A1Z5", balance: "Rs. 2,40,000", orders: 12, status: "Active" },
  { name: "MRF Regional Depot", gst: "29AABCM0000A1Z6", balance: "Rs. 84,000", orders: 8, status: "Active" }
];

export default function SuppliersPage() {
  return <DataTable title="Supplier management" rows={rows} columns={[
    { key: "name", label: "Supplier" },
    { key: "gst", label: "GSTIN" },
    { key: "balance", label: "Outstanding" },
    { key: "orders", label: "Purchase orders" },
    { key: "status", label: "Status" }
  ]} />;
}
