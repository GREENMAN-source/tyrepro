import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
        <div>
          <div className="mb-3 text-2xl font-black">TyrePro Motors</div>
          <p className="max-w-sm text-sm leading-6 text-neutral-300">
            Premium tyre retail, installation, alignment, billing, and fleet-ready service operations.
          </p>
        </div>
        <div className="space-y-3 text-sm text-neutral-300">
          <div className="font-semibold text-white">Visit</div>
          <p className="flex gap-2"><MapPin className="h-4 w-4" /> Main Road, Bengaluru</p>
          <p className="flex gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</p>
          <p className="flex gap-2"><Mail className="h-4 w-4" /> sales@tyrepromotors.in</p>
        </div>
        <div className="space-y-3 text-sm text-neutral-300">
          <div className="font-semibold text-white">Shop</div>
          <Link href="/products" className="block hover:text-white">Tyres</Link>
          <Link href="/services" className="block hover:text-white">Services</Link>
          <Link href="/appointment" className="block hover:text-white">Appointment</Link>
        </div>
        <div className="space-y-3 text-sm text-neutral-300">
          <div className="font-semibold text-white">Social</div>
          <div className="flex gap-3">
            <Instagram className="h-5 w-5" />
            <Facebook className="h-5 w-5" />
            <Linkedin className="h-5 w-5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
