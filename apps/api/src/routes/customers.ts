import { Router } from "express";
import { z } from "zod";
import { RoleName } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { asyncHandler, validate } from "../lib/http.js";
import { getPagination, paginated } from "../lib/pagination.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const customersRouter = Router();
customersRouter.use(requireAuth, allowRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.STAFF));

const customerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  gstNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional()
});

customersRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page, pageSize, skip, take } = getPagination(req.query);
    const search = String(req.query.search ?? "");
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { phone: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } }
          ]
        }
      : {};
    const [items, total] = await Promise.all([
      prisma.customer.findMany({ where, include: { vehicles: true, sales: true }, skip, take, orderBy: { createdAt: "desc" } }),
      prisma.customer.count({ where })
    ]);
    res.json(paginated(items, total, page, pageSize));
  })
);

customersRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const input = validate(customerSchema, req.body);
    const customer = await prisma.customer.create({ data: input });
    res.status(201).json(customer);
  })
);

customersRouter.post(
  "/:id/vehicles",
  asyncHandler(async (req, res) => {
    const input = validate(
      z.object({
        registrationNumber: z.string(),
        make: z.string(),
        model: z.string(),
        year: z.number().int().optional(),
        vehicleType: z.string(),
        tyreSize: z.string(),
        lastServiceDate: z.coerce.date().optional(),
        nextReminderDate: z.coerce.date().optional()
      }),
      req.body
    );
    const vehicle = await prisma.vehicle.create({ data: { ...input, customerId: String(req.params.id) } });
    res.status(201).json(vehicle);
  })
);
