import { DataTable } from "@/components/admin/data-table";

const rows = [
  { code: "EMP-001", name: "Neeraj", role: "Manager", sales: "Rs. 4.2L", attendance: "Present" },
  { code: "EMP-002", name: "Fatima", role: "Staff", sales: "Rs. 1.8L", attendance: "Present" }
];

export default function EmployeesPage() {
  return <DataTable title="Employee management" rows={rows} columns={[
    { key: "code", label: "Code" },
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "sales", label: "Sales tracked" },
    { key: "attendance", label: "Attendance" }
  ]} />;
}
