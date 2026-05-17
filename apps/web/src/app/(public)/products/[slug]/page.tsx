import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug) ?? products[0];
  const specs = [
    ["Brand", product.brand],
    ["Model", product.model],
    ["Size", product.size],
    ["Width", product.size.split("/")[0]],
    ["Aspect ratio", "65"],
    ["Rim size", "15"],
    ["Speed rating", product.rating],
    ["Load index", product.rating.replace(/\D/g, "")],
    ["Warranty", product.warranty],
    ["Manufacturing date", "2024 Q4"]
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden rounded-lg border">
          <Image src={product.image} alt={product.model} fill className="object-cover" />
        </div>
        <section>
          <div className="text-sm font-semibold text-primary">{product.brand}</div>
          <h1 className="mt-2 text-4xl font-black">{product.model}</h1>
          <div className="mt-3 flex items-center gap-2 text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
            <span className="text-sm text-muted-foreground">128 reviews</span>
          </div>
          <p className="mt-5 leading-7 text-muted-foreground">
            Premium tubeless tyre with stable grip, low cabin noise, and reinforced sidewall support for Indian road conditions.
          </p>
          <div className="mt-6 flex items-end gap-3">
            <div className="text-4xl font-black">{formatCurrency(product.price)}</div>
            <div className="pb-1 text-muted-foreground line-through">{formatCurrency(product.mrp)}</div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {specs.map(([label, value]) => (
              <div key={label} className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="font-semibold">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg"><ShoppingCart className="h-4 w-4" /> Add to sale enquiry</Button>
            <Button asChild size="lg" variant="outline"><Link href="/appointment">Book installation</Link></Button>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-lg bg-muted p-4 text-sm">
            <ShieldCheck className="h-5 w-5 text-primary" /> Stock verified with barcode-ready SKU and batch tracking.
          </div>
        </section>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-black">Similar products</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {products.map((item) => (
            <Link key={item.id} href={`/products/${item.slug}`} className="rounded-lg border p-4 hover:shadow-glass">
              <div className="font-semibold">{item.brand} {item.model}</div>
              <div className="text-sm text-muted-foreground">{item.size}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
