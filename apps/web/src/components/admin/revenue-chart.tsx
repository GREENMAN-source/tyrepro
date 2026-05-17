"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueTrend } from "@/lib/demo-data";

export function RevenueChart() {
  return (
    <div className="h-80 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-white shadow-glass">
      <div className="mb-4">
        <h2 className="font-semibold">Revenue and profit trend</h2>
        <p className="text-sm text-white/50">Monthly performance with GST-ready sales totals</p>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <AreaChart data={revenueTrend}>
          <defs>
            <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
          <XAxis dataKey="month" stroke="rgba(255,255,255,.45)" />
          <YAxis stroke="rgba(255,255,255,.45)" />
          <Tooltip contentStyle={{ background: "#10131b", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8 }} />
          <Area type="monotone" dataKey="revenue" stroke="#ef4444" fill="url(#revenue)" />
          <Area type="monotone" dataKey="profit" stroke="#facc15" fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
