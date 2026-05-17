import { DataTable } from "@/components/admin/data-table";

const rows = [
  { name: "Ravi Kumar", phone: "+91 90000 11111", vehicles: 2, purchases: "Rs. 86,400", reminder: "Due in 18 days" },
  { name: "Sharma Logistics", phone: "+91 90000 22222", vehicles: 14, purchases: "Rs. 7,84,000", reminder: "Fleet review" },
  { name: "Anika Rao", phone: "+91 90000 33333", vehicles: 1, purchases: "Rs. 22,900", reminder: "Tyre rotation" }
];

export default function CustomersPage() {
  return <DataTable title="Customer and vehicle CRM" rows={rows} columns={[
    { key: "name", label: "Customer" },
    { key: "phone", label: "Phone" },
    { key: "vehicles", label: "Vehicles" },
    { key: "purchases", label: "Purchase history" },
    { key: "reminder", label: "Reminder" }
  ]} />;
}
