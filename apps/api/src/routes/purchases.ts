import { Router } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import { RoleName } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { asyncHandler, validate } from "../lib/http.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const purchasesRouter = Router();
purchasesRouter.use(requireAuth, allowRoles(RoleName.ADMIN, RoleName.MANAGER));

const purchaseSchema = z.object({
  supplierId: z.string(),
  status: z.string().default("RECEIVED"),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1),
      unitPrice: z.number(),
      gstRate: z.number()
    })
  )
});

purchasesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const purchases = await prisma.purchase.findMany({
      include: { supplier: true, items: { include: { product: true } }, payments: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(purchases);
  })
);

purchasesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const input = validate(purchaseSchema, req.body);
    const items = input.items.map((item) => {
      const taxable = item.quantity * item.unitPrice;
      const tax = taxable * (item.gstRate / 100);
      return { ...item, lineTotal: taxable + tax };
    });
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxTotal = items.reduce((sum, item) => sum + item.lineTotal - item.quantity * item.unitPrice, 0);
    const grandTotal = subtotal + taxTotal;

    const purchase = await prisma.purchase.create({
      data: {
        supplierId: input.supplierId,
        poNumber: `PO-${new Date().getFullYear()}-${nanoid(8).toUpperCase()}`,
        subtotal,
        taxTotal,
        grandTotal,
        status: input.status,
        items: { create: items }
      },
      include: { supplier: true, items: { include: { product: true } } }
    });

    res.status(201).json(purchase);
  })
);
