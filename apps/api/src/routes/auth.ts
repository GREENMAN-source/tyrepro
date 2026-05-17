import { Router } from "express";
import bcrypt from "bcryptjs";
import { RoleName } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../db/prisma.js";
import { asyncHandler, HttpError, validate } from "../lib/http.js";
import { requireAuth, signToken } from "../middleware/auth.js";

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const input = validate(registerSchema, req.body);
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new HttpError(409, "Email already registered");

    const role = await prisma.role.upsert({
      where: { name: RoleName.CUSTOMER },
      update: {},
      create: { name: RoleName.CUSTOMER }
    });

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        passwordHash: await bcrypt.hash(input.password, 12),
        roleId: role.id,
        customer: { create: { name: input.name, phone: input.phone, email: input.email } }
      },
      include: { role: true }
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role.name });
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role.name } });
  })
);

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const input = validate(loginSchema, req.body);
    const user = await prisma.user.findUnique({ where: { email: input.email }, include: { role: true } });
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
      throw new HttpError(401, "Invalid credentials");
    }
    if (!user.isActive) throw new HttpError(403, "User account is disabled");

    const token = signToken({ id: user.id, email: user.email, role: user.role.name });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role.name } });
  })
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, name: true, email: true, phone: true, role: true }
    });
    res.json(user);
  })
);

authRouter.post("/forgot-password", (_req, res) => {
  res.json({ message: "Password reset email placeholder queued" });
});

authRouter.post("/reset-password", (_req, res) => {
  res.json({ message: "Password reset placeholder completed" });
});
