import prisma from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";
import type { AuthRequest } from "../../middlewares/auth.middleware";

function generateInvoiceNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV-${ts}${rand}`;
}

function generateReceiptNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RCP-${ts}${rand}`;
}

const clientSelect = { select: { id: true, name: true } };
const projectSelect = { select: { id: true, name: true } };

// ── Dashboard ──
export const getDashboard = asyncHandler(async (req, res) => {
  const [totalInvoices, totalPayments, totalExpenses, invoiceAgg, paymentAgg, expenseAgg, pendingInvoices, recentInvoices] = await Promise.all([
    prisma.invoice.count(),
    prisma.payment.count(),
    prisma.expense.count(),
    prisma.invoice.aggregate({ _sum: { total: true, paidAmount: true, balanceDue: true } }),
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.invoice.findMany({ where: { status: { in: ["SENT", "PARTIALLY_PAID", "OVERDUE"] } }, orderBy: { dueDate: "asc" }, take: 10, include: { client: clientSelect } }),
    prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { client: clientSelect } }),
  ]);
  return successResponse(res, 200, "Finance dashboard", {
    totalInvoices, totalPayments, totalExpenses,
    revenue: invoiceAgg._sum.total || 0,
    collected: paymentAgg._sum.amount || 0,
    outstanding: invoiceAgg._sum.balanceDue || 0,
    expenses: expenseAgg._sum.amount || 0,
    profit: (paymentAgg._sum.amount || 0) - (expenseAgg._sum.amount || 0),
    pendingInvoices,
    recentInvoices,
  });
});

// ── Invoices ──
export const listInvoices = asyncHandler(async (req, res) => {
  const { clientId, status } = req.query;
  const where: Record<string, unknown> = {};
  if (clientId) where.clientId = String(clientId);
  if (status) where.status = String(status);
  const invoices = await prisma.invoice.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { client: clientSelect, project: projectSelect, _count: { select: { items: true, payments: true } } },
  });
  return successResponse(res, 200, "Invoices", invoices);
});

export const getInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      client: clientSelect, project: projectSelect, createdBy: { select: { id: true, name: true } },
      items: { orderBy: { id: "asc" } },
      payments: { orderBy: { date: "desc" }, include: { receivedBy: { select: { id: true, name: true } } } },
    },
  });
  if (!invoice) throw new AppError("Invoice not found", 404);
  return successResponse(res, 200, "Invoice", invoice);
});

export const createInvoice = asyncHandler(async (req, res) => {
  const { clientId, projectId, title, description, dueDate, items, taxRate, discountPercent, notes, terms } = req.body;
  if (!clientId || !title || !dueDate) throw new AppError("clientId, title, and dueDate are required", 400);
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) throw new AppError("Client not found", 404);
  let subtotal = 0;
  const invoiceItems: { service: string; description?: string; quantity: number; unitPrice: number; amount: number }[] = (items || []).map((item: any) => {
    const qty = Number(item.quantity || 1);
    const price = Number(item.unitPrice || 0);
    const amt = qty * price;
    subtotal += amt;
    return { service: item.service, description: item.description, quantity: qty, unitPrice: price, amount: amt };
  });
  const taxPct = Number(taxRate || 0);
  const discPct = Number(discountPercent || 0);
  const taxAmount = subtotal * (taxPct / 100);
  const discountAmount = subtotal * (discPct / 100);
  const total = subtotal + taxAmount - discountAmount;
  const invoiceNumber = generateInvoiceNumber();
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber, clientId, projectId: projectId || null, title, description: description || null,
      dueDate: new Date(dueDate), subtotal, taxRate: taxPct, taxAmount, discountPercent: discPct,
      discountAmount, total, paidAmount: 0, balanceDue: total, notes: notes || null, terms: terms || null,
      createdById: (req as AuthRequest).user?.id,
      items: { create: invoiceItems },
    },
    include: { client: clientSelect, items: true },
  });
  return successResponse(res, 201, "Invoice created", invoice);
});

export const updateInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: Record<string, unknown> = {};
  ["title", "description", "status", "dueDate", "notes", "terms"].forEach((k) => {
    if (req.body[k] !== undefined) data[k] = k === "dueDate" ? new Date(req.body[k]) : req.body[k];
  });
  const invoice = await prisma.invoice.update({ where: { id }, data });
  return successResponse(res, 200, "Invoice updated", invoice);
});

export const deleteInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.invoice.delete({ where: { id } });
  return successResponse(res, 200, "Invoice deleted");
});

// ── Payments ──
export const listPayments = asyncHandler(async (req, res) => {
  const { invoiceId, clientId } = req.query;
  const where: Record<string, unknown> = {};
  if (invoiceId) where.invoiceId = String(invoiceId);
  if (clientId) where.clientId = String(clientId);
  const payments = await prisma.payment.findMany({
    where, orderBy: { date: "desc" },
    include: { invoice: { select: { id: true, invoiceNumber: true, title: true } }, receivedBy: { select: { id: true, name: true } } },
  });
  return successResponse(res, 200, "Payments", payments);
});

export const createPayment = asyncHandler(async (req, res) => {
  const { invoiceId, clientId, amount, method, reference, date, notes } = req.body;
  if (!invoiceId || !clientId || !amount) throw new AppError("invoiceId, clientId, and amount are required", 400);
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new AppError("Invoice not found", 404);
  const paymentAmt = Number(amount);
  const newPaid = invoice.paidAmount + paymentAmt;
  const newBalance = Math.max(0, invoice.total - newPaid);
  const newStatus = newBalance <= 0 ? "PAID" : (newPaid > 0 ? "PARTIALLY_PAID" : invoice.status);
  const payment = await prisma.$transaction(async (tx) => {
    const p = await tx.payment.create({
      data: {
        invoiceId, clientId, amount: paymentAmt, method: req.body.method || "ONLINE",
        reference: reference || null, date: date ? new Date(date) : new Date(),
        notes: notes || null, receivedById: (req as AuthRequest).user?.id,
      },
    });
    await tx.invoice.update({
      where: { id: invoiceId },
      data: { paidAmount: newPaid, balanceDue: newBalance, status: newStatus as any },
    });
    return p;
  });
  return successResponse(res, 201, "Payment recorded", payment);
});

export const deletePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new AppError("Payment not found", 404);
  await prisma.$transaction(async (tx) => {
    await tx.payment.delete({ where: { id } });
    const invoice = await tx.invoice.findUnique({ where: { id: payment.invoiceId }, include: { payments: { select: { amount: true } } } });
    if (invoice) {
      const totalPaid = invoice.payments.reduce((s, p) => s + p.amount, 0);
      const balance = Math.max(0, invoice.total - totalPaid);
      const status = balance <= 0 ? "PAID" : totalPaid > 0 ? "PARTIALLY_PAID" : "SENT";
      await tx.invoice.update({ where: { id: payment.invoiceId }, data: { paidAmount: totalPaid, balanceDue: balance, status: status as any } });
    }
  });
  return successResponse(res, 200, "Payment deleted");
});

// ── Receipts ──
export const listReceipts = asyncHandler(async (req, res) => {
  const { invoiceId, clientId } = req.query;
  const where: Record<string, unknown> = {};
  if (invoiceId) where.invoiceId = String(invoiceId);
  if (clientId) where.clientId = String(clientId);
  const receipts = await prisma.receipt.findMany({
    where, orderBy: { date: "desc" },
    include: { invoice: { select: { id: true, invoiceNumber: true } }, client: clientSelect, payment: { select: { method: true, reference: true } } },
  });
  return successResponse(res, 200, "Receipts", receipts);
});

export const createReceipt = asyncHandler(async (req, res) => {
  const { invoiceId, paymentId, clientId, amount, date, fileUrl, notes } = req.body;
  if (!invoiceId || !paymentId || !clientId || !amount) throw new AppError("invoiceId, paymentId, clientId, and amount are required", 400);
  const receiptNumber = generateReceiptNumber();
  const receipt = await prisma.receipt.create({
    data: { invoiceId, paymentId, clientId, receiptNumber, amount: Number(amount), date: date ? new Date(date) : new Date(), fileUrl: fileUrl || null, notes: notes || null },
  });
  return successResponse(res, 201, "Receipt generated", receipt);
});

export const deleteReceipt = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.receipt.delete({ where: { id } });
  return successResponse(res, 200, "Receipt deleted");
});

// ── Expenses ──
export const listExpenses = asyncHandler(async (req, res) => {
  const { category, vendorId } = req.query;
  const where: Record<string, unknown> = {};
  if (category) where.category = String(category);
  if (vendorId) where.vendorId = String(vendorId);
  const expenses = await prisma.expense.findMany({
    where, orderBy: { date: "desc" },
    include: { vendor: { select: { id: true, name: true } }, project: projectSelect },
  });
  return successResponse(res, 200, "Expenses", expenses);
});

export const createExpense = asyncHandler(async (req, res) => {
  const { category, description, amount, date, vendorId, projectId, billable, billableToClientId, paidBy, receiptUrl, notes, taxAmount } = req.body;
  if (!description || !amount) throw new AppError("description and amount are required", 400);
  const expense = await prisma.expense.create({
    data: {
      category: category || "OTHER", description, amount: Number(amount), date: date ? new Date(date) : new Date(),
      vendorId: vendorId || null, projectId: projectId || null, billable: billable || false,
      billableToClientId: billableToClientId || null, paidBy: paidBy || null, receiptUrl: receiptUrl || null,
      notes: notes || null, taxAmount: Number(taxAmount || 0),
    },
    include: { vendor: { select: { id: true, name: true } } },
  });
  return successResponse(res, 201, "Expense created", expense);
});

export const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: Record<string, unknown> = {};
  ["category", "description", "amount", "date", "vendorId", "notes", "receiptUrl", "billable", "taxAmount"].forEach((k) => {
    if (req.body[k] !== undefined) data[k] = k === "date" ? new Date(req.body[k]) : req.body[k];
  });
  const expense = await prisma.expense.update({ where: { id }, data });
  return successResponse(res, 200, "Expense updated", expense);
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.expense.delete({ where: { id } });
  return successResponse(res, 200, "Expense deleted");
});

// ── Vendors ──
export const listVendors = asyncHandler(async (req, res) => {
  const vendors = await prisma.vendor.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { expenses: true, vendorPayments: true } } },
  });
  return successResponse(res, 200, "Vendors", vendors);
});

export const createVendor = asyncHandler(async (req, res) => {
  const { name, email, phone, address, gst, pan, bankName, accountNo, ifsc, notes } = req.body;
  if (!name) throw new AppError("name is required", 400);
  const vendor = await prisma.vendor.create({ data: { name, email, phone, address, gst, pan, bankName, accountNo, ifsc, notes } });
  return successResponse(res, 201, "Vendor created", vendor);
});

export const updateVendor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: Record<string, unknown> = {};
  ["name", "email", "phone", "address", "gst", "pan", "bankName", "accountNo", "ifsc", "notes", "isActive"].forEach((k) => {
    if (req.body[k] !== undefined) data[k] = req.body[k];
  });
  const vendor = await prisma.vendor.update({ where: { id }, data });
  return successResponse(res, 200, "Vendor updated", vendor);
});

export const deleteVendor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.vendor.delete({ where: { id } });
  return successResponse(res, 200, "Vendor deleted");
});

// ── Vendor Payments ──
export const listVendorPayments = asyncHandler(async (req, res) => {
  const { vendorId } = req.query;
  const where: Record<string, unknown> = {};
  if (vendorId) where.vendorId = String(vendorId);
  const payments = await prisma.vendorPayment.findMany({
    where, orderBy: { date: "desc" },
    include: { vendor: { select: { id: true, name: true } }, paidBy: { select: { id: true, name: true } } },
  });
  return successResponse(res, 200, "Vendor payments", payments);
});

export const createVendorPayment = asyncHandler(async (req, res) => {
  const { vendorId, amount, method, reference, date, notes } = req.body;
  if (!vendorId || !amount) throw new AppError("vendorId and amount are required", 400);
  const payment = await prisma.vendorPayment.create({
    data: {
      vendorId, amount: Number(amount), method: method || "ONLINE", reference: reference || null,
      date: date ? new Date(date) : new Date(), notes: notes || null, paidById: (req as AuthRequest).user?.id,
    },
  });
  return successResponse(res, 201, "Vendor payment created", payment);
});

export const deleteVendorPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.vendorPayment.delete({ where: { id } });
  return successResponse(res, 200, "Vendor payment deleted");
});

// ── Tax Details ──
export const listTaxDetails = asyncHandler(async (req, res) => {
  const taxes = await prisma.taxDetail.findMany({ orderBy: { name: "asc" } });
  return successResponse(res, 200, "Tax details", taxes);
});

export const createTaxDetail = asyncHandler(async (req, res) => {
  const { name, rate, type, isDefault } = req.body;
  if (!name || rate === undefined) throw new AppError("name and rate are required", 400);
  if (isDefault) await prisma.taxDetail.updateMany({ where: { isDefault: true }, data: { isDefault: false } });
  const tax = await prisma.taxDetail.create({ data: { name, rate: Number(rate), type: type || "PERCENTAGE", isActive: true, isDefault: isDefault || false } });
  return successResponse(res, 201, "Tax detail created", tax);
});

export const updateTaxDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: Record<string, unknown> = {};
  ["name", "rate", "type", "isActive", "isDefault"].forEach((k) => {
    if (req.body[k] !== undefined) data[k] = req.body[k];
  });
  if (data.isDefault) await prisma.taxDetail.updateMany({ where: { isDefault: true }, data: { isDefault: false } });
  const tax = await prisma.taxDetail.update({ where: { id }, data });
  return successResponse(res, 200, "Tax detail updated", tax);
});

export const deleteTaxDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.taxDetail.delete({ where: { id } });
  return successResponse(res, 200, "Tax detail deleted");
});