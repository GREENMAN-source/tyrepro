"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { brands, products, services } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85"
          alt="Premium car in tyre service bay"
          fill
          priority
          className="object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/20" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl content-center gap-10 px-4 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur">
              <Star className="h-4 w-4 text-yellow-300" /> Authorized multi-brand tyre experts
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">TyrePro Motors</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">
              Premium tyres, precision alignment, GST billing, service reminders, and fleet-ready support from one modern automotive counter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/products">Shop tyres <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20"><Link href="/appointment">Book service</Link></Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="self-end">
            <div className="glass rounded-lg p-4 shadow-glass">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[["12k+", "Tyres sold"], ["4.8/5", "Reviews"], ["38 min", "Avg service"]].map(([value, label]) => (
                  <div key={label} className="rounded-md bg-white/10 p-4">
                    <div className="text-2xl font-black">{value}</div>
                    <div className="text-xs text-white/60">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">Featured brands</p>
            <h2 className="text-3xl font-black">Trusted tyre partners</h2>
          </div>
          <Button asChild variant="outline"><Link href="/products">View catalog</Link></Button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {brands.map((brand) => (
            <div key={brand} className="rounded-lg border bg-card p-5 text-center font-bold shadow-sm transition hover:-translate-y-1 hover:shadow-glass">
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">Best sellers</p>
              <h2 className="text-3xl font-black">Fast-moving tyres in stock</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden transition hover:-translate-y-1 hover:shadow-glass">
                <div className="relative h-44">
                  <Image src={product.image} alt={product.model} fill className="object-cover" />
                </div>
                <CardContent className="pt-5">
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                  <h3 className="mt-1 font-bold">{product.model}</h3>
                  <div className="mt-2 text-sm">{product.size} | {product.rating}</div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-black">{formatCurrency(product.price)}</span>
                    <Button asChild size="sm"><Link href={`/products/${product.slug}`}>Details</Link></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 md:grid-cols-3">
        {([
          ["Same-day fitment", Clock],
          ["GST-ready invoices", ShieldCheck],
          ["Fleet analytics", TrendingUp]
        ] as const).map(([title, Icon]) => (
          <div key={title} className="rounded-lg border p-6">
            <Icon className="mb-4 h-7 w-7 text-primary" />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Transparent pricing, certified technicians, and service records that stay attached to every vehicle.</p>
          </div>
        ))}
      </section>

      <section className="bg-neutral-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <p className="text-sm font-semibold text-red-300">Services</p>
            <h2 className="text-3xl font-black">Workshop services customers can book online</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href="/appointment" className="rounded-lg border border-white/10 bg-white/[0.06] p-5 transition hover:bg-white/10">
                <service.icon className="mb-4 h-6 w-6 text-red-300" />
                <div className="font-bold">{service.name}</div>
                <p className="mt-2 text-sm text-white/60">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold text-primary">Why choose us</p>
          <h2 className="mt-2 text-3xl font-black">Built for retail counters, fleets, and family cars</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Authorized brands", "Barcode stock control", "Payment QR on invoice", "Service reminders"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border p-4">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-5 md:grid-cols-3">
            {["Clean billing and fast fitting.", "They remembered my next tyre change.", "Best fleet service dashboard we have used."].map((quote, index) => (
              <Card key={quote}>
                <CardContent className="pt-5">
                  <div className="mb-3 flex text-yellow-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                  <p className="text-sm leading-6 text-muted-foreground">{quote}</p>
                  <div className="mt-4 font-semibold">Customer {index + 1}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-lg bg-primary p-8 text-primary-foreground md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black">Get seasonal offers and service reminders</h2>
            <p className="mt-2 text-white/80">Subscribe for tyre deals, alignment camps, and replacement alerts.</p>
          </div>
          <form className="mt-5 flex max-w-md gap-2 md:mt-0">
            <input className="h-11 flex-1 rounded-md px-3 text-neutral-900 outline-none" placeholder="Email address" />
            <Button variant="secondary">Subscribe</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
