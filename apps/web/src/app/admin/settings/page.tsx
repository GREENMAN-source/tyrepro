import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl rounded-lg border border-white/10 bg-white/[0.06] p-6 text-white">
      <h1 className="text-3xl font-black">Business settings</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Input className="border-white/10 bg-black/20 text-white" placeholder="Business name" defaultValue="TyrePro Motors" />
        <Input className="border-white/10 bg-black/20 text-white" placeholder="GST number" defaultValue="29ABCDE1234F1Z5" />
        <Input className="border-white/10 bg-black/20 text-white" placeholder="UPI ID" defaultValue="merchant@upi" />
        <Input className="border-white/10 bg-black/20 text-white" placeholder="Razorpay key" />
      </div>
      <Button className="mt-4">Save settings</Button>
    </div>
  );
}
