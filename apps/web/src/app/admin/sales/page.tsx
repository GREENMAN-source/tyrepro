"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { apiFetch } from "@/lib/api";

interface SaleResponse {
  id: string;
  invoiceNumber: string;
  customer: {
    name: string;
  };
  items: Array<{
    quantity: number;
  }>;
  grandTotal: string | number;
  payments: Array<{
    amount: string | number;
  }>;
  paymentStatus: string;
}

export default function SalesPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<SaleResponse[]>("/sales")
      .then((data) => {
        const formattedRows = data.map((sale) => {
          const itemsCount = sale.items.reduce((sum, item) => sum + Number(item.quantity), 0);
          const totalPaid = sale.payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
          return {
            invoice: sale.invoiceNumber,
            customer: sale.customer?.name || "Unknown",
            items: itemsCount,
            total: `Rs. ${Number(sale.grandTotal).toLocaleString()}`,
            paid: `Rs. ${totalPaid.toLocaleString()}`,
            status: sale.paymentStatus,
          };
        });
        setRows(formattedRows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load sales");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-white">
        <div className="text-lg">Loading sales data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-red-400">
        <div className="text-lg">{error}</div>
      </div>
    );
  }

  return (
    <DataTable
      title="Sales orders and returns"
      rows={rows}
      columns={[
        { key: "invoice", label: "Invoice" },
        { key: "customer", label: "Customer" },
        { key: "items", label: "Items" },
        { key: "total", label: "Total" },
        { key: "paid", label: "Paid" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
