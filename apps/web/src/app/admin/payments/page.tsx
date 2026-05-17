import { DataTable } from "@/components/admin/data-table";

const rows = [
  { ref: "pay_RZP_1182", customer: "Ravi Kumar", method: "UPI", amount: "Rs. 20,000", status: "Paid" },
  { ref: "cash_8892", customer: "Anika Rao", method: "Cash", amount: "Rs. 12,700", status: "Paid" },
  { ref: "card_3372", customer: "Sharma Logistics", method: "Card", amount: "Rs. 1,18,000", status: "Paid" }
];

export default function PaymentsPage() {
  return <DataTable title="Payment tracking and refunds" rows={rows} columns={[
    { key: "ref", label: "Transaction" },
    { key: "customer", label: "Customer" },
    { key: "method", label: "Method" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" }
  ]} />;
}
