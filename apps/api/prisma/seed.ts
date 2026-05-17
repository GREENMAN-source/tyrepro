import bcrypt from "bcryptjs";
import { PrismaClient, RoleName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = await Promise.all(
    Object.values(RoleName).map((name) =>
      prisma.role.upsert({
        where: { name },
        update: {},
        create: { name }
      })
    )
  );

  const adminRole = roles.find((role) => role.name === RoleName.ADMIN)!;
  const staffRole = roles.find((role) => role.name === RoleName.STAFF)!;

  await prisma.user.upsert({
    where: { email: "admin@tyrepro.local" },
    update: {},
    create: {
      name: "TyrePro Admin",
      email: "admin@tyrepro.local",
      phone: "+919876543210",
      passwordHash: await bcrypt.hash("Admin@12345", 12),
      roleId: adminRole.id,
      employee: {
        create: {
          employeeCode: "EMP-ADMIN",
          designation: "Owner",
          joiningDate: new Date("2020-01-01")
        }
      }
    }
  });

  await prisma.user.upsert({
    where: { email: "staff@tyrepro.local" },
    update: {},
    create: {
      name: "Workshop Staff",
      email: "staff@tyrepro.local",
      phone: "+919876543211",
      passwordHash: await bcrypt.hash("Staff@12345", 12),
      roleId: staffRole.id,
      employee: {
        create: {
          employeeCode: "EMP-002",
          designation: "Service Advisor",
          joiningDate: new Date("2023-05-01")
        }
      }
    }
  });

  const [mainWarehouse, branchWarehouse] = await Promise.all([
    prisma.warehouse.upsert({ where: { code: "MAIN" }, update: {}, create: { name: "Main Store", code: "MAIN", address: "Main Road, Bengaluru" } }),
    prisma.warehouse.upsert({ where: { code: "BR-A" }, update: {}, create: { name: "Branch A", code: "BR-A", address: "Ring Road, Bengaluru" } })
  ]);

  const category = await prisma.category.upsert({
    where: { slug: "passenger-tyres" },
    update: {},
    create: { name: "Passenger Tyres", slug: "passenger-tyres" }
  });

  const brandNames = ["Apollo", "MRF", "Michelin", "Bridgestone", "CEAT", "Goodyear"];
  const brands = await Promise.all(
    brandNames.map((name) => prisma.brand.upsert({ where: { name }, update: {}, create: { name } }))
  );

  const supplier = await prisma.supplier.create({
    data: {
      name: "Apollo Distributor South",
      phone: "+919900011122",
      email: "orders@apollo-south.example",
      gstNumber: "29AABCA0000A1Z5",
      address: "Industrial Area, Bengaluru"
    }
  });

  const apollo = brands.find((brand) => brand.name === "Apollo")!;
  const mrf = brands.find((brand) => brand.name === "MRF")!;
  const michelin = brands.find((brand) => brand.name === "Michelin")!;

  const products = [
    {
      sku: "APL-185-65-R15",
      barcode: "890000000101",
      name: "Apollo Alnac 4G 185/65 R15",
      slug: "apollo-alnac-4g-185-65-r15",
      brandId: apollo.id,
      size: "185/65 R15",
      width: 185,
      aspectRatio: 65,
      rimSize: 15,
      sellingPrice: 5850,
      mrp: 6800,
      quantity: 24
    },
    {
      sku: "MRF-215-60-R17",
      barcode: "890000000102",
      name: "MRF Wanderer Sport 215/60 R17",
      slug: "mrf-wanderer-sport-215-60-r17",
      brandId: mrf.id,
      size: "215/60 R17",
      width: 215,
      aspectRatio: 60,
      rimSize: 17,
      sellingPrice: 9450,
      mrp: 10900,
      quantity: 5
    },
    {
      sku: "MIC-205-55-R16",
      barcode: "890000000103",
      name: "Michelin Primacy 4 205/55 R16",
      slug: "michelin-primacy-4-205-55-r16",
      brandId: michelin.id,
      size: "205/55 R16",
      width: 205,
      aspectRatio: 55,
      rimSize: 16,
      sellingPrice: 11200,
      mrp: 12999,
      quantity: 8
    }
  ];

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: {
        sku: product.sku,
        barcode: product.barcode,
        name: product.name,
        slug: product.slug,
        description: "Premium tubeless tyre with strong grip, efficient braking, and stable ride quality.",
        brandId: product.brandId,
        categoryId: category.id,
        vehicleType: product.rimSize >= 17 ? "SUV" : "Passenger Car",
        tubeType: "Tubeless",
        seasonalType: "All weather",
        size: product.size,
        width: product.width,
        aspectRatio: product.aspectRatio,
        rimSize: product.rimSize,
        speedRating: "H",
        loadIndex: "91",
        warrantyMonths: 60,
        manufacturingDate: new Date("2024-10-01"),
        mrp: product.mrp,
        sellingPrice: product.sellingPrice,
        gstRate: 18,
        imageUrls: ["https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=900&q=80"]
      }
    });

    await prisma.inventoryItem.upsert({
      where: {
        productId_warehouseId_batchNumber: {
          productId: created.id,
          warehouseId: product.rimSize >= 17 ? branchWarehouse.id : mainWarehouse.id,
          batchNumber: "B24-041"
        }
      },
      update: {},
      create: {
        productId: created.id,
        warehouseId: product.rimSize >= 17 ? branchWarehouse.id : mainWarehouse.id,
        batchNumber: "B24-041",
        quantity: product.quantity,
        lowStockLevel: 6,
        purchasePrice: product.sellingPrice * 0.72,
        sellingPrice: product.sellingPrice,
        supplierId: supplier.id,
        manufacturedAt: new Date("2024-10-01"),
        locationCode: "R1-A2"
      }
    });
  }

  const customer = await prisma.customer.upsert({
    where: { phone: "+919000011111" },
    update: {},
    create: {
      name: "Ravi Kumar",
      phone: "+919000011111",
      email: "ravi@example.com",
      city: "Bengaluru",
      vehicles: {
        create: {
          registrationNumber: "KA01AB1234",
          make: "Hyundai",
          model: "Creta",
          year: 2021,
          vehicleType: "SUV",
          tyreSize: "215/60 R17",
          lastServiceDate: new Date("2026-04-20"),
          nextReminderDate: new Date("2026-07-20")
        }
      }
    }
  });

  const service = await prisma.service.upsert({
    where: { slug: "wheel-alignment" },
    update: {},
    create: {
      name: "Wheel Alignment",
      slug: "wheel-alignment",
      description: "Computerized alignment with camber, caster, and toe correction.",
      basePrice: 799,
      durationMinutes: 35,
      icon: "Gauge"
    }
  });

  await prisma.appointment.create({
    data: {
      customerId: customer.id,
      serviceId: service.id,
      scheduledAt: new Date("2026-05-18T10:30:00+05:30"),
      status: "CONFIRMED",
      notes: "Check front-left pull"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
