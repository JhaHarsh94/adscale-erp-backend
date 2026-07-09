export type InvoiceStatus = "DRAFT" | "SENT" | "PARTIALLY_PAID" | "PAID" | "OVERDUE" | "CANCELLED" | "REFUNDED";
export type PaymentMethod = "BANK_TRANSFER" | "CHEQUE" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "UPI" | "ONLINE" | "OTHER";
export type ExpenseCategory = "SALARY" | "OFFICE_RENT" | "UTILITIES" | "SOFTWARE" | "MARKETING" | "TRAVEL" | "EQUIPMENT" | "PROFESSIONAL_FEES" | "TAXES" | "MEALS" | "VENDOR_PAYMENT" | "OTHER";

export interface FinanceDashboard {
  totalInvoices: number;
  totalPayments: number;
  totalExpenses: number;
  revenue: number;
  collected: number;
  outstanding: number;
  expenses: number;
  profit: number;
  pendingInvoices: Invoice[];
  recentInvoices: Invoice[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  client: { id: string; name: string };
  projectId: string | null;
  project: { id: string; name: string } | null;
  title: string;
  description: string | null;
  status: InvoiceStatus;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  paidAmount: number;
  balanceDue: number;
  currency: string;
  notes: string | null;
  terms: string | null;
  _count?: { items: number; payments: number };
  items?: InvoiceItem[];
  payments?: Payment[];
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  service: string;
  description: string | null;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  clientId: string;
  amount: number;
  method: PaymentMethod;
  reference: string | null;
  date: string;
  notes: string | null;
  receivedBy?: { id: string; name: string };
  invoice?: { id: string; invoiceNumber: string; title: string };
  createdAt: string;
}

export interface Receipt {
  id: string;
  invoiceId: string;
  paymentId: string;
  clientId: string;
  receiptNumber: string;
  amount: number;
  date: string;
  fileUrl: string | null;
  notes: string | null;
  invoice?: { id: string; invoiceNumber: string };
  client?: { id: string; name: string };
  payment?: { method: PaymentMethod; reference: string | null };
  createdAt: string;
}

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  vendorId: string | null;
  vendor: { id: string; name: string } | null;
  projectId: string | null;
  project: { id: string; name: string } | null;
  billable: boolean;
  receiptUrl: string | null;
  notes: string | null;
  taxAmount: number;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  gst: string | null;
  pan: string | null;
  bankName: string | null;
  accountNo: string | null;
  ifsc: string | null;
  notes: string | null;
  isActive: boolean;
  _count?: { expenses: number; vendorPayments: number };
  createdAt: string;
}

export interface VendorPayment {
  id: string;
  vendorId: string;
  vendor: { id: string; name: string };
  amount: number;
  method: PaymentMethod;
  reference: string | null;
  date: string;
  notes: string | null;
  paidBy?: { id: string; name: string };
  createdAt: string;
}

export interface TaxDetail {
  id: string;
  name: string;
  rate: number;
  type: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
}