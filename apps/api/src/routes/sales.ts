import { Router } from "express";
import { z } from "zod";
import { PaymentStatus, RoleName } from "@prisma/client";
import { nanoid } from "nanoid";
import { prisma } from "../db/prisma.js";
import { asyncHandler, validate } from "../lib/http.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const salesRouter = Router();
salesRouter.use(requireAuth, allowRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.STAFF));

const saleSchema = z.object({
  customerId: z.string(),
  employeeId: z.string().optional(),
  discountTotal: z.number().default(0),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1),
      unitPrice: z.number(),
      discount: z.number().default(0),
      gstRate: z.number()
    })
  )
});

salesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const sales = await prisma.sale.findMany({
      include: { customer: true, items: { include: { product: true } }, payments: true },
      orderBy: { createdAt: "desc" },
      take: 50
    });
    res.json(sales);
  })
);

salesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const input = validate(saleSchema, req.body);
    const calculated = input.items.map((item) => {
      const taxable = item.quantity * item.unitPrice - (item.discount ?? 0);
      const taxAmount = taxable * (item.gstRate / 100);
      return { ...item, taxAmount, lineTotal: taxable + taxAmount };
    });
    const subtotal = calculated.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxTotal = calculated.reduce((sum, item) => sum + item.taxAmount, 0);
    const grandTotal = calculated.reduce((sum, item) => sum + item.lineTotal, 0) - (input.discountTotal ?? 0);

    const sale = await prisma.sale.create({
      data: {
        invoiceNumber: `INV-${new Date().getFullYear()}-${nanoid(8).toUpperCase()}`,
        customerId: input.customerId,
        employeeId: input.employeeId,
        subtotal,
        discountTotal: input.discountTotal,
        taxTotal,
        grandTotal,
        paymentStatus: PaymentStatus.PENDING,
        notes: input.notes,
        items: { create: calculated },
        invoice: { create: {} }
      },
      include: { customer: true, items: { include: { product: true } }, invoice: true }
    });

    res.status(201).json(sale);
  })
);

salesRouter.post(
  "/:id/payments",
  asyncHandler(async (req, res) => {
    const input = validate(
      z.object({
        amount: z.number(),
        method: z.enum(["CASH", "CARD", "UPI", "RAZORPAY", "BANK_TRANSFER"]),
        transactionId: z.string().optional(),
        reference: z.string().optional()
      }),
      req.body
    );
    const payment = await prisma.payment.create({ data: { ...input, saleId: String(req.params.id), status: "PAID" } });
    const sale = await prisma.sale.findUnique({ where: { id: String(req.params.id) }, include: { payments: true } });
    if (sale) {
      const paid = sale.payments.reduce((sum, row) => sum + Number(row.amount), 0) + input.amount;
      await prisma.sale.update({
        where: { id: String(req.params.id) },
        data: { paymentStatus: paid >= Number(sale.grandTotal) ? "PAID" : "PARTIAL" }
      });
    }
    res.status(201).json(payment);
  })
);
