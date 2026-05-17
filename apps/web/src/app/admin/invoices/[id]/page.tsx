import { Download, Mail, Printer, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-4xl text-white">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Invoice {id.toUpperCase()}</h1>
          <p className="text-sm text-white/55">GST-ready printable invoice with QR payment support.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 bg-white/5 text-white"><Printer className="h-4 w-4" /> Print</Button>
          <Button variant="outline" className="border-white/10 bg-white/5 text-white"><Download className="h-4 w-4" /> PDF</Button>
          <Button variant="outline" className="border-white/10 bg-white/5 text-white"><Mail className="h-4 w-4" /> Email</Button>
          <Button><Send className="h-4 w-4" /> WhatsApp</Button>
        </div>
      </div>
      <section className="rounded-lg bg-white p-8 text-neutral-950">
        <div className="flex justify-between gap-6 border-b pb-6">
          <div>
            <h2 className="text-2xl font-black">TyrePro Motors</h2>
            <p className="text-sm text-neutral-600">GSTIN: 29ABCDE1234F1Z5</p>
            <p className="text-sm text-neutral-600">Main Road, Bengaluru</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-bold">Tax Invoice</p>
            <p>INV-2026-A19K2</p>
            <p>16 May 2026</p>
          </div>
        </div>
        <div className="grid gap-6 py-6 md:grid-cols-2">
          <div><p className="text-xs text-neutral-500">Bill to</p><p className="font-bold">Ravi Kumar</p><p>KA 01 AB 1234</p></div>
          <div><p className="text-xs text-neutral-500">Payment</p><p className="font-bold">UPI partial payment</p><p>Balance due: Rs. 11,400</p></div>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-y text-left"><th className="py-3">Product</th><th>Qty</th><th>Rate</th><th>GST</th><th className="text-right">Total</th></tr></thead>
          <tbody><tr className="border-b"><td className="py-3">Apollo Alnac 4G 185/65 R15</td><td>4</td><td>Rs. 5,850</td><td>18%</td><td className="text-right">Rs. 27,612</td></tr></tbody>
        </table>
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_260px]">
          <div className="grid h-32 w-32 place-items-center rounded-md border text-xs text-neutral-500">UPI QR</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>Rs. 23,400</span></div>
            <div className="flex justify-between"><span>GST</span><span>Rs. 4,212</span></div>
            <div className="flex justify-between"><span>Fitment</span><span>Rs. 3,788</span></div>
            <div className="flex justify-between border-t pt-2 text-lg font-black"><span>Total</span><span>Rs. 31,400</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}
