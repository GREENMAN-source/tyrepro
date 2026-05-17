import { Router } from "express";
import { z } from "zod";
import { RoleName } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { asyncHandler, validate } from "../lib/http.js";
import { getPagination, paginated } from "../lib/pagination.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const inventoryRouter = Router();
inventoryRouter.use(requireAuth, allowRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.STAFF));

const inventorySchema = z.object({
  productId: z.string(),
  warehouseId: z.string(),
  batchNumber: z.string(),
  quantity: z.number().int().min(0),
  lowStockLevel: z.number().int().min(0).default(6),
  purchasePrice: z.number(),
  sellingPrice: z.number(),
  supplierId: z.string().optional(),
  manufacturedAt: z.coerce.date(),
  expiresAt: z.coerce.date().optional(),
  locationCode: z.string().optional()
});

inventoryRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page, pageSize, skip, take } = getPagination(req.query);
    const search = String(req.query.search ?? "");
    const where = search
      ? {
          OR: [
            { batchNumber: { contains: search, mode: "insensitive" as const } },
            { product: { name: { contains: search, mode: "insensitive" as const } } },
            { product: { sku: { contains: search, mode: "insensitive" as const } } }
          ]
        }
      : {};
    const [items, total] = await Promise.all([
      prisma.inventoryItem.findMany({
        where,
        include: { product: { include: { brand: true } }, warehouse: true },
        skip,
        take,
        orderBy: { updatedAt: "desc" }
      }),
      prisma.inventoryItem.count({ where })
    ]);
    res.json(paginated(items, total, page, pageSize));
  })
);

inventoryRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const input = validate(inventorySchema, req.body);
    const item = await prisma.inventoryItem.create({
      data: {
        ...input,
        movements: { create: { type: "PURCHASE", quantity: input.quantity, note: "Opening stock" } }
      }
    });
    res.status(201).json(item);
  })
);

inventoryRouter.patch(
  "/:id/adjust",
  asyncHandler(async (req, res) => {
    const input = validate(z.object({ quantity: z.number().int(), note: z.string().optional() }), req.body);
    const item = await prisma.inventoryItem.update({
      where: { id: String(req.params.id) },
      data: {
        quantity: { increment: input.quantity },
        movements: { create: { type: "ADJUSTMENT", quantity: input.quantity, note: input.note } }
      }
    });
    res.json(item);
  })
);

inventoryRouter.get(
  "/low-stock",
  asyncHandler(async (_req, res) => {
    const items = await prisma.inventoryItem.findMany({
      where: { quantity: { lte: 6 } },
      include: { product: { include: { brand: true } }, warehouse: true }
    });
    res.json(items);
  })
);
