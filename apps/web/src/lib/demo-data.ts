import { BarChart3, Battery, Gauge, LifeBuoy, PackageCheck, ScanLine, ShieldCheck, Wrench } from "lucide-react";

export const brands = ["MRF", "Apollo", "CEAT", "Michelin", "Bridgestone", "Goodyear"];

export const products = [
  {
    id: "1",
    slug: "apollo-alnac-4g-185-65-r15",
    brand: "Apollo",
    model: "Alnac 4G",
    size: "185/65 R15",
    type: "Tubeless",
    vehicleType: "Hatchback",
    price: 5850,
    mrp: 6800,
    stock: 24,
    rating: "91H",
    warranty: "60 months",
    image: "https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "2",
    slug: "mrf-wanderer-sport-215-60-r17",
    brand: "MRF",
    model: "Wanderer Sport",
    size: "215/60 R17",
    type: "Tubeless",
    vehicleType: "SUV",
    price: 9450,
    mrp: 10900,
    stock: 12,
    rating: "96V",
    warranty: "72 months",
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "3",
    slug: "michelin-primacy-4-205-55-r16",
    brand: "Michelin",
    model: "Primacy 4",
    size: "205/55 R16",
    type: "Tubeless",
    vehicleType: "Sedan",
    price: 11200,
    mrp: 12999,
    stock: 8,
    rating: "91W",
    warranty: "60 months",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "4",
    slug: "bridgestone-dueler-235-65-r17",
    brand: "Bridgestone",
    model: "Dueler H/T",
    size: "235/65 R17",
    type: "Tubeless",
    vehicleType: "SUV",
    price: 12850,
    mrp: 14300,
    stock: 17,
    rating: "104H",
    warranty: "72 months",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80"
  }
];

export const services = [
  { name: "Wheel Alignment", slug: "wheel-alignment", price: 799, duration: "35 min", icon: Gauge, description: "Computerized alignment with camber, caster, and toe correction." },
  { name: "Wheel Balancing", slug: "wheel-balancing", price: 499, duration: "25 min", icon: ScanLine, description: "Precision balancing to reduce vibration and tyre wear." },
  { name: "Puncture Repair", slug: "puncture-repair", price: 199, duration: "15 min", icon: LifeBuoy, description: "Patch, plug, and valve inspection for tubeless tyres." },
  { name: "Nitrogen Filling", slug: "nitrogen-filling", price: 249, duration: "10 min", icon: PackageCheck, description: "Stable pressure fill for smoother running and better mileage." },
  { name: "Battery Replacement", slug: "battery-replacement", price: 999, duration: "30 min", icon: Battery, description: "Battery testing, fitment, and warranty registration." },
  { name: "Tyre Installation", slug: "tyre-installation", price: 699, duration: "40 min", icon: Wrench, description: "Mounting, balancing, valve replacement, and pressure calibration." }
];

export const dashboardKpis = [
  { label: "Today revenue", value: "Rs. 1.84L", trend: "+18%", icon: BarChart3 },
  { label: "Inventory value", value: "Rs. 42.7L", trend: "+6%", icon: PackageCheck },
  { label: "Open bookings", value: "27", trend: "+9", icon: Wrench },
  { label: "Low stock SKUs", value: "14", trend: "Review", icon: ShieldCheck }
];

export const revenueTrend = [
  { month: "Jan", revenue: 420000, profit: 118000 },
  { month: "Feb", revenue: 510000, profit: 146000 },
  { month: "Mar", revenue: 620000, profit: 182000 },
  { month: "Apr", revenue: 580000, profit: 154000 },
  { month: "May", revenue: 710000, profit: 214000 },
  { month: "Jun", revenue: 840000, profit: 238000 }
];

export const inventoryRows = [
  { sku: "APL-185-65-R15", product: "Apollo Alnac 4G", brand: "Apollo", batch: "B24-041", qty: 24, warehouse: "Main", age: "5 months", status: "In stock" },
  { sku: "MRF-215-60-R17", product: "MRF Wanderer Sport", brand: "MRF", batch: "B23-118", qty: 5, warehouse: "Main", age: "11 months", status: "Low stock" },
  { sku: "MIC-205-55-R16", product: "Michelin Primacy 4", brand: "Michelin", batch: "B24-022", qty: 8, warehouse: "Branch A", age: "6 months", status: "In stock" },
  { sku: "BST-235-65-R17", product: "Bridgestone Dueler", brand: "Bridgestone", batch: "B23-076", qty: 3, warehouse: "Main", age: "13 months", status: "Low stock" }
];
