# TyrePro Suite

TyrePro Suite is a production-oriented full-stack tyre shop platform. It combines a customer website with an ERP-style admin dashboard for inventory, billing, GST invoices, payments, customers, suppliers, services, appointments, and analytics.

## Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, ShadCN-style reusable components, Framer Motion, Recharts, Sonner
- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL
- Auth: JWT with role-based authorization for Admin, Manager, Staff, and Customer
- Payments: Razorpay-ready service surface, UPI QR invoice support, cash/card/partial payment tracking
- Deployment: Vercel-ready frontend and Render, Railway, Azure, or Docker-ready API

## Apps

```text
apps/
  api/     Express REST API, Prisma schema, seed data, invoice PDF generation
  web/     Next.js public website and ERP admin dashboard
```

## Main Features

- Public website: home, about, products, product details, services, appointment booking, contact, newsletter, WhatsApp CTA
- Product catalog: filters for brand, vehicle type, size, price, tube type, and seasonal type
- Admin ERP: dashboard KPIs, charts, notifications, search, data tables, pagination controls
- Inventory: SKU/barcode fields, batch tracking, warehouse locations, tyre age tracking, low-stock alerts
- Sales: sale orders, returns-ready model, customer history, tax and discount calculations
- Billing: GST-ready invoice model, printable invoice UI, PDF API, UPI QR data URL API
- Payments: cash, card, UPI, Razorpay, partial payments, pending dues, transaction logs
- CRM: customer profiles, vehicle records, service reminders, tyre replacement reminder fields
- Suppliers: supplier profiles, purchase order data model, balances, purchase history
- Reports: dashboard analytics, GST report endpoint, inventory valuation, revenue and profit trends
- Employees: role permissions, employee profile model, attendance placeholder, sales tracking by employee

## Prerequisites

- Node.js 20.11 or newer
- npm, pnpm, or yarn
- PostgreSQL 16 or Docker

## Setup

1. Copy environment values.

```bash
cp .env.example .env
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local
```

2. Start PostgreSQL.

```bash
docker compose up -d
```

3. Install dependencies.

```bash
npm install
```

4. Create database tables and seed demo data.

```bash
npm run db:push
npm run db:seed
```

5. Start both apps.

```bash
npm run dev
```

Frontend: `http://localhost:3000`

API: `http://localhost:8080`

Swagger docs: `http://localhost:8080/docs`

## Demo Credentials

- Admin: `admin@tyrepro.local`
- Password: `Admin@12345`
- Staff: `staff@tyrepro.local`
- Password: `Staff@12345`

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products`
- `GET /api/inventory`
- `POST /api/inventory`
- `PATCH /api/inventory/:id/adjust`
- `GET /api/customers`
- `POST /api/customers`
- `POST /api/customers/:id/vehicles`
- `GET /api/sales`
- `POST /api/sales`
- `POST /api/sales/:id/payments`
- `GET /api/purchases`
- `POST /api/purchases`
- `GET /api/invoices/:saleId`
- `GET /api/invoices/:saleId/pdf`
- `GET /api/invoices/:saleId/qr`
- `GET /api/services`
- `POST /api/appointments`
- `GET /api/appointments`
- `GET /api/suppliers`
- `POST /api/suppliers`
- `GET /api/payments`
- `POST /api/payments/razorpay-order`
- `GET /api/notifications`
- `GET /api/reports/dashboard`
- `GET /api/reports/gst`

## Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tyrepro?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="7d"
PORT=8080
WEB_ORIGIN="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:8080/api"
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
```

## Deployment

### Frontend on Vercel

- Root directory: `apps/web`
- Build command: `npm run build`
- Output: Next.js default
- Set `NEXT_PUBLIC_API_URL` to the deployed API URL.

### API on Render, Railway, or Azure

- Root directory: `apps/api`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Set `DATABASE_URL`, `JWT_SECRET`, `WEB_ORIGIN`, and Razorpay variables.
- Run `npx prisma db push` or a migration command during release.

## Architecture Notes

- Prisma schema is normalized around sales, sale items, invoices, payments, inventory batches, products, customers, vehicles, suppliers, services, appointments, notifications, and audit logs.
- API routes are grouped by business capability and guarded by role middleware.
- Frontend uses a modular App Router structure with reusable UI primitives, public layout, admin layout, dashboard charts, and table components.
- Storage and Razorpay are represented as integration-ready abstractions and environment variables so production credentials are not hardcoded.

## Production Hardening Checklist

- Replace demo secrets with managed secrets.
- Enable Prisma migrations instead of `db push`.
- Add refresh tokens and server-side sessions if long-lived sessions are required.
- Add object storage implementation for uploaded product images and invoice PDFs.
- Connect transactional email and WhatsApp Business providers.
- Add automated tests for API routes, invoice totals, auth, and permissions.
- Add CI for lint, typecheck, build, and migration validation.
