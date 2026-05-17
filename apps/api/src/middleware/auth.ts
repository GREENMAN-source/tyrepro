import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RoleName } from "@prisma/client";
import { env } from "../config/env.js";
import { HttpError } from "../lib/http.js";

export type AuthUser = {
  id: string;
  role: RoleName;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function signToken(user: AuthUser) {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    throw new HttpError(401, "Authentication required");
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    next();
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }
}

export function allowRoles(...roles: RoleName[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new HttpError(403, "You do not have permission to access this resource");
    }
    next();
  };
}
