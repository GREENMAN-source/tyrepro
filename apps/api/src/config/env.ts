import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(24),
  JWT_EXPIRES_IN: z.string().default("7d"),
  PORT: z.coerce.number().default(8080),
  WEB_ORIGIN: z.string().default("http://localhost:3000"),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional()
});

export const env = envSchema.parse(process.env);
