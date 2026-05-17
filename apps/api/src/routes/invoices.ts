import { Router } from "express";
import { RoleName } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { asyncHandler, HttpError } from "../lib/http.js";
import { createPaymentQrDataUrl, renderInvoicePdf } from "../lib/invoice.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

export const invoicesRouter = Router();
invoicesRouter.use(requireAuth, allowRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.STAFF));

invoicesRouter.get(
  "/:saleId",
  asyncHandler(async (req, res) => {
    const sale = await prisma.sale.findUnique({
      where: { id: String(req.params.saleId) },
      include: { customer: true, items: { include: { product: true } }, payments: true, invoice: true }
    });
    if (!sale) throw new HttpError(404, "Invoice not found");
    res.json(sale);
  })
);

invoicesRouter.get(
  "/:saleId/pdf",
  asyncHandler(async (req, res) => {
    const sale = await prisma.sale.findUnique({
      where: { id: String(req.params.saleId) },
      include: { customer: true, items: { include: { product: true } } }
    });
    if (!sale) throw new HttpError(404, "Invoice not found");
    const pdf = await renderInvoicePdf(sale);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${sale.invoiceNumber}.pdf"`);
    res.send(pdf);
  })
);

invoicesRouter.get(
  "/:saleId/qr",
  asyncHandler(async (req, res) => {
    const sale = await prisma.sale.findUnique({ where: { id: String(req.params.saleId) } });
    if (!sale) throw new HttpError(404, "Invoice not found");
    res.json({ qrCode: await createPaymentQrDataUrl(sale.invoiceNumber, String(sale.grandTotal)) });
  })
);
