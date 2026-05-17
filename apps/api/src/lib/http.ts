import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export function validate<T>(schema: ZodSchema<T>, payload: unknown): T {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new HttpError(422, "Validation failed", error.flatten());
    }
    throw error;
  }
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message, details: error.details });
  }

  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
}
