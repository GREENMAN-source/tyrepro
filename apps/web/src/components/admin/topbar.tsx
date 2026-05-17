"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/72 px-4 py-3 text-white backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="relative max-w-xl flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
          <Input className="border-white/10 bg-white/8 pl-9 text-white placeholder:text-white/40" placeholder="Search invoices, customers, SKUs, vehicles" />
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>
    </header>
  );
}
