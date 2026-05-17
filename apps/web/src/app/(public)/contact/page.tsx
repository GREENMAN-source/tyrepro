import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[.9fr_1.1fr]">
      <section>
        <p className="text-sm font-semibold text-primary">Contact</p>
        <h1 className="mt-2 text-4xl font-black">Visit the shop or send an enquiry</h1>
        <div className="mt-8 space-y-4 text-sm text-muted-foreground">
          <p className="flex gap-3"><Phone className="h-5 w-5 text-primary" /> +91 98765 43210</p>
          <p className="flex gap-3"><Mail className="h-5 w-5 text-primary" /> sales@tyrepromotors.in</p>
          <p className="flex gap-3"><MapPin className="h-5 w-5 text-primary" /> Main Road, Bengaluru</p>
          <p>Open Monday to Saturday, 9:00 AM to 8:30 PM</p>
        </div>
        <div className="mt-8 overflow-hidden rounded-lg border">
          <iframe title="Google Maps" className="h-72 w-full" src="https://maps.google.com/maps?q=Bengaluru&t=&z=12&ie=UTF8&iwloc=&output=embed" />
        </div>
      </section>
      <form className="h-fit rounded-lg border p-6">
        <div className="grid gap-4">
          <Input placeholder="Name" />
          <Input placeholder="Phone" />
          <Input placeholder="Email" />
          <textarea className="min-h-36 rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="How can we help?" />
          <Button>Send message</Button>
        </div>
      </form>
    </main>
  );
}
