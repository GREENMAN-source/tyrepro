import { Router } from "express";
import { z } from "zod";
import { RoleName } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { getRazorpayClient } from "../lib/razorpay.js";
import { asyncHandler, validate } from "../lib/http.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const paymentsRouter = Router();
paymentsRouter.use(requireAuth, allowRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.STAFF));

paymentsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await prisma.payment.findMany({ include: { sale: true, purchase: true }, orderBy: { createdAt: "desc" } }));
  })
);

paymentsRouter.post(
  "/razorpay-order",
  asyncHandler(async (req, res) => {
    const input = validate(
      z.object({
        amount: z.number().positive(),
        receipt: z.string().optional(),
        notes: z.record(z.string()).optional()
      }),
      req.body
    );
    const client = getRazorpayClient();
    const order = await client.orders.create({
      amount: Math.round(input.amount * 100),
      currency: "INR",
      receipt: input.receipt,
      notes: input.notes
    });
    res.status(201).json(order);
  })
);
