import { DataTable } from "@/components/admin/data-table";

const rows = [
  { time: "10:30 AM", customer: "Ravi Kumar", service: "Wheel Alignment", vehicle: "KA 01 AB 1234", status: "Confirmed" },
  { time: "12:00 PM", customer: "Anika Rao", service: "Tyre Installation", vehicle: "KA 05 ZX 8831", status: "Requested" }
];

export default function AppointmentsPage() {
  return <DataTable title="Appointment booking center" rows={rows} columns={[
    { key: "time", label: "Time" },
    { key: "customer", label: "Customer" },
    { key: "service", label: "Service" },
    { key: "vehicle", label: "Vehicle" },
    { key: "status", label: "Status" }
  ]} />;
}
