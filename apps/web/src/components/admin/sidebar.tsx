import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3, Bell, Calendar, CreditCard, FileText,
  LayoutDashboard, Package, Settings, ShoppingCart,
  Truck, Users, Wrench
} from "lucide-react";

const items: Array<[string, string, LucideIcon]> = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Inventory", "/admin/inventory", Package],
  ["Sales", "/admin/sales", ShoppingCart],
  ["Purchases", "/admin/purchases", Truck],
  ["Invoices", "/admin/invoices/demo", FileText],
  ["Customers", "/admin/customers", Users],
  ["Suppliers", "/admin/suppliers", Truck],
  ["Appointments", "/admin/appointments", Calendar],
  ["Payments", "/admin/payments", CreditCard],
  ["Reports", "/admin/reports", BarChart3],
  ["Employees", "/admin/employees", Wrench],
  ["Notifications", "/admin/notifications", Bell],
  ["Settings", "/admin/settings", Settings]
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-black/28 p-4 text-white backdrop-blur-xl lg:block">
      <Link href="/admin" className="mb-8 flex items-center gap-3 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-primary font-black">TP</span>
        <div>
          <div className="font-black">TyrePro Suite</div>
          <div className="text-xs text-white/55">ERP Control Center</div>
        </div>
      </Link>

      <nav className="space-y-1">
        {items.map(([label, href, Icon]) => (
          <Link
            key={href as string}
            href={href as any}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}