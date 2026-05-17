import { Router } from "express";
import { z } from "zod";
import { RoleName } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { asyncHandler, validate } from "../lib/http.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const operationsRouter = Router();

operationsRouter.get(
  "/services",
  asyncHandler(async (_req, res) => {
    res.json(await prisma.service.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }));
  })
);

operationsRouter.post(
  "/appointments",
  asyncHandler(async (req, res) => {
    const input = validate(
      z.object({
        customer: z.object({ name: z.string(), phone: z.string(), email: z.string().email().optional() }),
        serviceId: z.string(),
        vehicle: z
          .object({
            registrationNumber: z.string(),
            make: z.string(),
            model: z.string(),
            vehicleType: z.string(),
            tyreSize: z.string()
          })
          .optional(),
        scheduledAt: z.coerce.date(),
        notes: z.string().optional()
      }),
      req.body
    );

    const customer = await prisma.customer.upsert({
      where: { phone: input.customer.phone },
      update: input.customer,
      create: input.customer
    });

    const vehicle = input.vehicle
      ? await prisma.vehicle.upsert({
          where: { registrationNumber: input.vehicle.registrationNumber },
          update: { ...input.vehicle, customerId: customer.id },
          create: { ...input.vehicle, customerId: customer.id }
        })
      : undefined;

    const appointment = await prisma.appointment.create({
      data: {
        customerId: customer.id,
        serviceId: input.serviceId,
        vehicleId: vehicle?.id,
        scheduledAt: input.scheduledAt,
        notes: input.notes,
        notifications: {
          create: {
            type: "BOOKING",
            title: "New appointment booking",
            message: `${customer.name} booked a service appointment`
          }
        }
      },
      include: { customer: true, service: true }
    });

    res.status(201).json(appointment);
  })
);

operationsRouter.use(requireAuth, allowRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.STAFF));

operationsRouter.get(
  "/appointments",
  asyncHandler(async (_req, res) => {
    res.json(await prisma.appointment.findMany({ include: { customer: true, service: true }, orderBy: { scheduledAt: "asc" } }));
  })
);

operationsRouter.get(
  "/suppliers",
  asyncHandler(async (_req, res) => {
    res.json(await prisma.supplier.findMany({ include: { purchases: true }, orderBy: { name: "asc" } }));
  })
);

operationsRouter.post(
  "/suppliers",
  asyncHandler(async (req, res) => {
    const supplier = await prisma.supplier.create({
      data: validate(
        z.object({
          name: z.string(),
          phone: z.string(),
          email: z.string().email().optional(),
          gstNumber: z.string().optional(),
          address: z.string().optional()
        }),
        req.body
      )
    });
    res.status(201).json(supplier);
  })
);

operationsRouter.get(
  "/notifications",
  asyncHandler(async (_req, res) => {
    res.json(await prisma.notification.findMany({ orderBy: { createdAt: "desc" }, take: 30 }));
  })
);
