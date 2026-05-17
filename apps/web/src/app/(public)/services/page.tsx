import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Services</p>
        <h1 className="mt-2 text-4xl font-black">Workshop menu with transparent pricing</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.slug} className="rounded-lg border p-6 transition hover:-translate-y-1 hover:shadow-glass">
            <service.icon className="mb-4 h-7 w-7 text-primary" />
            <h2 className="text-xl font-bold">{service.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <div className="font-black">{formatCurrency(service.price)}</div>
                <div className="text-xs text-muted-foreground">{service.duration}</div>
              </div>
              <Button asChild><Link href="/appointment">Book</Link></Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
