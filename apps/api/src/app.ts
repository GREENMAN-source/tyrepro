import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env.js";
import { errorHandler } from "./lib/http.js";
import { authRouter } from "./routes/auth.js";
import { productsRouter } from "./routes/products.js";
import { inventoryRouter } from "./routes/inventory.js";
import { customersRouter } from "./routes/customers.js";
import { salesRouter } from "./routes/sales.js";
import { invoicesRouter } from "./routes/invoices.js";
import { operationsRouter } from "./routes/operations.js";
import { paymentsRouter } from "./routes/payments.js";
import { purchasesRouter } from "./routes/purchases.js";
import { reportsRouter } from "./routes/reports.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, limit: 240 }));

const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "TyrePro Suite API", version: "1.0.0" },
    servers: [{ url: "/api" }]
  },
  apis: ["./src/routes/*.ts"]
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "tyrepro-api" }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/customers", customersRouter);
app.use("/api/sales", salesRouter);
app.use("/api/purchases", purchasesRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api", operationsRouter);
app.use("/api/reports", reportsRouter);
app.use(errorHandler);
