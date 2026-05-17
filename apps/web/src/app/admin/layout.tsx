import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-shell min-h-screen">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AdminTopbar />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
