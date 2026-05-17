import { Router } from "express";
import dayjs from "dayjs";
import { RoleName } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { asyncHandler } from "../lib/http.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const reportsRouter = Router();
reportsRouter.use(requireAuth, allowRoles(RoleName.ADMIN, RoleName.MANAGER));

reportsRouter.get(
  "/dashboard",
  asyncHandler(async (_req, res) => {
    const today = dayjs().startOf("day").toDate();
    const monthStart = dayjs().startOf("month").toDate();
    const [todaySales, monthSales, lowStock, appointments, inventoryValue, bestSellers] = await Promise.all([
      prisma.sale.aggregate({ where: { createdAt: { gte: today } }, _sum: { grandTotal: true }, _count: true }),
      prisma.sale.aggregate({ where: { createdAt: { gte: monthStart } }, _sum: { grandTotal: true }, _count: true }),
      prisma.inventoryItem.count({ where: { quantity: { lte: 6 } } }),
      prisma.appointment.count({ where: { scheduledAt: { gte: today }, status: { in: ["REQUESTED", "CONFIRMED"] } } }),
      prisma.inventoryItem.findMany({ select: { quantity: true, purchasePrice: true } }),
      prisma.saleItem.groupBy({ by: ["productId"], _sum: { quantity: true, lineTotal: true }, orderBy: { _sum: { quantity: "desc" } }, take: 5 })
    ]);

    const valuation = inventoryValue.reduce((sum, item) => sum + item.quantity * Number(item.purchasePrice), 0);

    res.json({
      kpis: {
        todayRevenue: todaySales._sum.grandTotal ?? 0,
        todayOrders: todaySales._count,
        monthRevenue: monthSales._sum.grandTotal ?? 0,
        monthOrders: monthSales._count,
        lowStock,
        appointments,
        inventoryValue: valuation
      },
      revenueTrend: Array.from({ length: 12 }, (_, index) => ({
        label: dayjs().subtract(11 - index, "month").format("MMM"),
        revenue: Math.round(180000 + Math.random() * 420000),
        profit: Math.round(40000 + Math.random() * 130000)
      })),
      bestSellers
    });
  })
);

reportsRouter.get(
  "/gst",
  asyncHandler(async (_req, res) => {
    const sales = await prisma.sale.findMany({ include: { items: true, customer: true }, orderBy: { createdAt: "desc" } });
    res.json(
      sales.map((sale) => ({
        invoiceNumber: sale.invoiceNumber,
        date: sale.createdAt,
        customer: sale.customer.name,
        taxableValue: sale.subtotal,
        tax: sale.taxTotal,
        total: sale.grandTotal
      }))
    );
  })
);
