import Image from "next/image";
import { Award, BadgeCheck, Handshake, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <section className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold text-primary">About us</p>
          <h1 className="mt-2 text-4xl font-black">A modern tyre business with old-school accountability</h1>
          <p className="mt-5 leading-8 text-muted-foreground">
            TyrePro Motors has served city commuters, commercial fleets, and performance car owners for more than 15 years. The workshop combines authorized dealer supply, trained technicians, and transparent digital records.
          </p>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-lg">
          <Image src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1400&q=85" alt="Workshop team" fill className="object-cover" />
        </div>
      </section>
      <section className="mt-12 grid gap-4 md:grid-cols-4">
        {([
          ["15+ years", "Experience", Award],
          ["6 brands", "Authorized dealer network", Handshake],
          ["28 people", "Workshop and counter team", Users],
          ["ISO ready", "Documented service process", BadgeCheck]
        ] as const).map(([value, label, Icon]) => (
          <div key={label} className="rounded-lg border p-5">
            <Icon className="mb-4 h-6 w-6 text-primary" />
            <div className="text-2xl font-black">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </section>
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {["Mission", "Certifications", "Brand partnerships"].map((title) => (
          <div key={title} className="rounded-lg bg-muted p-6">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Deliver safer rides through genuine products, precise fitment, transparent pricing, and data-backed vehicle service history.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
