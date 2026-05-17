export default function NotificationsPage() {
  const rows = ["Low stock: MRF Wanderer Sport has 5 units", "New appointment from Ravi Kumar", "Payment reminder due for INV-2026-A19K2", "Tyre replacement reminder ready for Anika Rao"];
  return (
    <div className="space-y-4 text-white">
      <h1 className="text-3xl font-black">Notification center</h1>
      {rows.map((row) => <div key={row} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">{row}</div>)}
    </div>
  );
}
