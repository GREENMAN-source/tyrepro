import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import type { Sale, SaleItem, Customer, Product } from "@prisma/client";

type InvoiceSale = Sale & {
  customer: Customer;
  items: Array<SaleItem & { product: Product }>;
};

export async function createPaymentQrDataUrl(invoiceNumber: string, amount: string) {
  return QRCode.toDataURL(`upi://pay?pa=merchant@upi&pn=TyrePro%20Motors&am=${amount}&cu=INR&tn=${invoiceNumber}`);
}

export function renderInvoicePdf(sale: InvoiceSale): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 48, size: "A4" });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    doc.fontSize(22).text("TyrePro Motors", { continued: false });
    doc.fontSize(10).text("GSTIN: 29ABCDE1234F1Z5 | Main Road, Bengaluru | +91 98765 43210");
    doc.moveDown();
    doc.fontSize(16).text(`Tax Invoice ${sale.invoiceNumber}`);
    doc.fontSize(10).text(`Date: ${sale.createdAt.toLocaleDateString("en-IN")}`);
    doc.moveDown();
    doc.text(`Bill To: ${sale.customer.name}`);
    doc.text(`Phone: ${sale.customer.phone}`);
    if (sale.customer.gstNumber) doc.text(`Customer GSTIN: ${sale.customer.gstNumber}`);
    doc.moveDown();

    doc.fontSize(11).text("Item", 48, doc.y, { continued: true, width: 220 });
    doc.text("Qty", 280, doc.y, { continued: true, width: 50 });
    doc.text("Rate", 335, doc.y, { continued: true, width: 70 });
    doc.text("GST", 415, doc.y, { continued: true, width: 50 });
    doc.text("Total", 480, doc.y, { width: 70 });
    doc.moveDown(0.5);

    sale.items.forEach((item) => {
      doc.text(item.product.name, 48, doc.y, { continued: true, width: 220 });
      doc.text(String(item.quantity), 280, doc.y, { continued: true, width: 50 });
      doc.text(`Rs. ${item.unitPrice}`, 335, doc.y, { continued: true, width: 70 });
      doc.text(`${item.gstRate}%`, 415, doc.y, { continued: true, width: 50 });
      doc.text(`Rs. ${item.lineTotal}`, 480, doc.y, { width: 70 });
    });

    doc.moveDown();
    doc.fontSize(12).text(`Subtotal: Rs. ${sale.subtotal}`, { align: "right" });
    doc.text(`Discount: Rs. ${sale.discountTotal}`, { align: "right" });
    doc.text(`GST: Rs. ${sale.taxTotal}`, { align: "right" });
    doc.fontSize(16).text(`Grand Total: Rs. ${sale.grandTotal}`, { align: "right" });
    doc.moveDown();
    doc.fontSize(9).text("Thank you for choosing TyrePro Motors. Warranty is subject to manufacturer terms.");
    doc.end();
  });
}
