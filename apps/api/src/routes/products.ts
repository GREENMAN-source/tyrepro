import { Router } from "express";
import { z } from "zod";
import { RoleName } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { asyncHandler, validate } from "../lib/http.js";
import { getPagination, paginated } from "../lib/pagination.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const productsRouter = Router();

const productSchema = z.object({
  sku: z.string().min(2),
  barcode: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(5),
  brandId: z.string(),
  categoryId: z.string(),
  vehicleType: z.string(),
  tubeType: z.string(),
  seasonalType: z.string(),
  size: z.string(),
  width: z.number().int(),
  aspectRatio: z.number().int(),
  rimSize: z.number().int(),
  speedRating: z.string(),
  loadIndex: z.string(),
  warrantyMonths: z.number().int(),
  manufacturingDate: z.coerce.date(),
  mrp: z.number(),
  sellingPrice: z.number(),
  gstRate: z.number(),
  imageUrls: z.array(z.string()).default([])
});

productsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page, pageSize, skip, take } = getPagination(req.query);
    const search = String(req.query.search ?? "");
    const where = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" as const } },
                { sku: { contains: search, mode: "insensitive" as const } },
                { size: { contains: search, mode: "insensitive" as const } }
              ]
            }
          : {},
        req.query.brand ? { brand: { name: String(req.query.brand) } } : {},
        req.query.vehicleType ? { vehicleType: String(req.query.vehicleType) } : {},
        req.query.size ? { size: String(req.query.size) } : {},
        req.query.tubeType ? { tubeType: String(req.query.tubeType) } : {},
        req.query.seasonalType ? { seasonalType: String(req.query.seasonalType) } : {}
      ]
    };
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { brand: true, category: true, inventory: true },
        skip,
        take,
        orderBy: { createdAt: "desc" }
      }),
      prisma.product.count({ where })
    ]);
    res.json(paginated(items, total, page, pageSize));
  })
);

productsRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const product = await prisma.product.findUnique({
      where: { slug: String(req.params.slug) },
      include: { brand: true, category: true, inventory: { include: { warehouse: true } } }
    });
    res.json(product);
  })
);

productsRouter.post(
  "/",
  requireAuth,
  allowRoles(RoleName.ADMIN, RoleName.MANAGER),
  asyncHandler(async (req, res) => {
    const input = validate(productSchema, req.body);
    const product = await prisma.product.create({ data: input });
    res.status(201).json(product);
  })
);
