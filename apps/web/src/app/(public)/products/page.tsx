"use client";

import Image from "next/image";
import Link from "next/link";
import { Grid2X2, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { products, brands } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Catalog</p>
          <h1 className="mt-2 text-4xl font-black">Find tyres by size, vehicle, and brand</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon"><Grid2X2 className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><List className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search SKU, model, size" />
          </div>
          <div className="space-y-3">
            <Select><option>All brands</option>{brands.map((brand) => <option key={brand}>{brand}</option>)}</Select>
            <Select><option>Vehicle type</option><option>Hatchback</option><option>Sedan</option><option>SUV</option><option>Truck</option></Select>
            <Select><option>Tyre size</option><option>185/65 R15</option><option>205/55 R16</option><option>215/60 R17</option></Select>
            <Select><option>Tube type</option><option>Tubeless</option><option>Tube</option></Select>
            <Select><option>Season</option><option>All weather</option><option>Highway</option><option>Performance</option></Select>
            <Input placeholder="Min price" />
            <Input placeholder="Max price" />
          </div>
        </aside>
        <section>
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing 24 tyres</span>
            <Select className="w-48"><option>Sort by relevance</option><option>Price low to high</option><option>Newest manufacturing date</option></Select>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.concat(products).map((product, index) => (
              <Link href={`/products/${product.slug}`} key={`${product.id}-${index}`} className="overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:shadow-glass">
                <div className="relative h-48">
                  <Image src={product.image} alt={product.model} fill className="object-cover" />
                  <span className="absolute right-3 top-3 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">{product.stock} in stock</span>
                </div>
                <div className="p-5">
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                  <h2 className="mt-1 font-bold">{product.model}</h2>
                  <p className="mt-1 text-sm">{product.size} | {product.type} | {product.rating}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="font-black">{formatCurrency(product.price)}</div>
                      <div className="text-xs text-muted-foreground line-through">{formatCurrency(product.mrp)}</div>
                    </div>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
