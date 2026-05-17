"use client";

import { CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { services } from "@/lib/demo-data";

export default function AppointmentPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[.8fr_1.2fr]">
      <section>
        <p className="text-sm font-semibold text-primary">Appointment</p>
        <h1 className="mt-2 text-4xl font-black">Book a tyre or service slot</h1>
        <p className="mt-5 leading-8 text-muted-foreground">
          Choose a service, share vehicle details, and the admin dashboard will receive a booking notification.
        </p>
      </section>
      <form
        className="rounded-lg border p-6 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          toast.success("Booking request submitted");
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Select required><option value="">Select service</option>{services.map((service) => <option key={service.slug}>{service.name}</option>)}</Select>
          <Input type="datetime-local" required />
          <Input placeholder="Full name" required />
          <Input placeholder="Phone number" required />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Registration number" />
          <Input placeholder="Vehicle make" />
          <Input placeholder="Vehicle model" />
          <Input placeholder="Vehicle type" />
          <Input placeholder="Tyre size, e.g. 185/65 R15" />
        </div>
        <textarea className="mt-4 min-h-28 w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Notes" />
        <Button className="mt-4" size="lg"><CalendarCheck className="h-4 w-4" /> Confirm booking</Button>
      </form>
    </main>
  );
}
