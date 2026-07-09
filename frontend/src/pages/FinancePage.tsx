import { useEffect, useState } from "react";
import {
  Search, BarChart3, Plus, Trash2, Save, RefreshCcw, XCircle,
  DollarSign, Receipt, Wallet, Building2, Landmark, Percent,
  FileText, CreditCard, CalendarDays, IndianRupee, Edit3,
} from "lucide-react";
import { apiClient } from "../api/client";
import type {
  FinanceDashboard, Invoice, Payment, Receipt as ReceiptType,
  Expense, Vendor, VendorPayment, TaxDetail,
} from "../types/finance";

const f = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-emerald-500";

const tabs = [
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "invoices", label: "Invoices", icon: FileText },
  { key: "payments", label: "Payments", icon: DollarSign },
  { key: "receipts", label: "Receipts", icon: Receipt },
  { key: "expenses", label: "Expenses", icon: Wallet },
  { key: "vendors", label: "Vendors", icon: Building2 },
  { key: "vendor-payments", label: "Vendor Payments", icon: CreditCard },
  { key: "tax-details", label: "Tax Details", icon: Percent },
];

const statusColors: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SENT: "bg-blue-50 text-blue-700",
  PARTIALLY_PAID: "bg-amber-50 text-amber-700",
  PAID: "bg-green-50 text-green-700",
  OVERDUE: "bg-red-50 text-red-700",
  CANCELLED: "bg-slate-100 text-slate-500",
  REFUNDED: "bg-purple-50 text-purple-700",
};

function inr(n: number) { return "\u20B9" + n.toLocaleString("en-IN"); }

export default function FinancePage() {
  const [tab, setTab] = useState("dashboard");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<FinanceDashboard | null>(null);

  // Clients/Projects for selects
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);

  // Invoices
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({ clientId: "", projectId: "", title: "", description: "", invoiceDate: new Date().toISOString().slice(0, 10), dueDate: "", subtotal: "", taxRate: "18", discountPercent: "0", notes: "", terms: "" });
  const [editInvoice, setEditInvoice] = useState<string | null>(null);

  // Payments
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ invoiceId: "", amount: "", method: "BANK_TRANSFER", reference: "", date: new Date().toISOString().slice(0, 10), notes: "" });

  // Receipts
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [receiptForm, setReceiptForm] = useState({ invoiceId: "", paymentId: "", amount: "", date: new Date().toISOString().slice(0, 10), notes: "" });

  // Expenses
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ category: "OTHER", description: "", amount: "", date: new Date().toISOString().slice(0, 10), vendorId: "", projectId: "", billable: false, notes: "", taxAmount: "0" });
  const [editExpense, setEditExpense] = useState<string | null>(null);

  // Vendors
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [vendorForm, setVendorForm] = useState({ name: "", email: "", phone: "", address: "", gst: "", pan: "", bankName: "", accountNo: "", ifsc: "", notes: "" });
  const [editVendor, setEditVendor] = useState<string | null>(null);

  // Vendor Payments
  const [vendorPayments, setVendorPayments] = useState<VendorPayment[]>([]);
  const [showVendorPaymentForm, setShowVendorPaymentForm] = useState(false);
  const [vendorPaymentForm, setVendorPaymentForm] = useState({ vendorId: "", amount: "", method: "BANK_TRANSFER", reference: "", date: new Date().toISOString().slice(0, 10), notes: "" });

  // Tax Details
  const [taxDetails, setTaxDetails] = useState<TaxDetail[]>([]);
  const [showTaxForm, setShowTaxForm] = useState(false);
  const [taxForm, setTaxForm] = useState({ name: "", rate: "", type: "GST", isDefault: false });
  const [editTax, setEditTax] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  function msgOk(s: string) { setMsg(s); setTimeout(() => setMsg(""), 3000); }

  // Data loaders
  async function loadDashboard() {
    setLoading(true);
    try { const res = await apiClient.get("/finance/dashboard"); setDashboard(res.data.data); } catch { setMsg("Failed to load dashboard"); }
    setLoading(false);
  }
  async function loadInvoices() {
    try {
      const params: Record<string, string> = {};
      if (filterStatus) params.status = filterStatus;
      const res = await apiClient.get("/finance/invoices", { params });
      setInvoices(res.data.data || []);
    } catch {}
  }
  async function loadPayments() { try { const res = await apiClient.get("/finance/payments"); setPayments(res.data.data || []); } catch {} }
  async function loadReceipts() { try { const res = await apiClient.get("/finance/receipts"); setReceipts(res.data.data || []); } catch {} }
  async function loadExpenses() { try { const res = await apiClient.get("/finance/expenses"); setExpenses(res.data.data || []); } catch {} }
  async function loadVendors() { try { const res = await apiClient.get("/finance/vendors"); setVendors(res.data.data || []); } catch {} }
  async function loadVendorPayments() { try { const res = await apiClient.get("/finance/vendor-payments"); setVendorPayments(res.data.data || []); } catch {} }
  async function loadTaxDetails() { try { const res = await apiClient.get("/finance/tax-details"); setTaxDetails(res.data.data || []); } catch {} }
  async function loadClients() { try { const res = await apiClient.get("/crm/clients"); setClients(res.data.data || []); } catch {} }
  async function loadProjects() { try { const res = await apiClient.get("/projects"); setProjects(res.data.data || []); } catch {} }

  useEffect(() => { if (tab === "dashboard") loadDashboard(); }, [tab]);
  useEffect(() => { if (tab === "invoices") { loadInvoices(); loadClients(); loadProjects(); } }, [tab, filterStatus]);
  useEffect(() => { if (tab === "payments") { loadPayments(); loadInvoices(); } }, [tab]);
  useEffect(() => { if (tab === "receipts") { loadReceipts(); loadInvoices(); loadPayments(); } }, [tab]);
  useEffect(() => { if (tab === "expenses") { loadExpenses(); loadVendors(); loadProjects(); } }, [tab]);
  useEffect(() => { if (tab === "vendors") loadVendors(); }, [tab]);
  useEffect(() => { if (tab === "vendor-payments") { loadVendorPayments(); loadVendors(); } }, [tab]);
  useEffect(() => { if (tab === "tax-details") loadTaxDetails(); }, [tab]);

  // ── Invoice CRUD ──
  async function createInvoice() {
    if (!invoiceForm.clientId || !invoiceForm.title || !invoiceForm.dueDate) { setMsg("Client, title, and due date required"); return; }
    try {
      const body = { ...invoiceForm, subtotal: Number(invoiceForm.subtotal), taxRate: Number(invoiceForm.taxRate), discountPercent: Number(invoiceForm.discountPercent) };
      await apiClient.post("/finance/invoices", body);
      msgOk("Invoice created"); setShowInvoiceForm(false);
      setInvoiceForm({ clientId: "", projectId: "", title: "", description: "", invoiceDate: new Date().toISOString().slice(0, 10), dueDate: "", subtotal: "", taxRate: "18", discountPercent: "0", notes: "", terms: "" });
      loadInvoices();
    } catch { setMsg("Failed to create invoice"); }
  }
  async function updateInvoice(id: string) {
    if (!invoiceForm.clientId || !invoiceForm.title || !invoiceForm.dueDate) { setMsg("Client, title, and due date required"); return; }
    try {
      const body = { ...invoiceForm, subtotal: Number(invoiceForm.subtotal), taxRate: Number(invoiceForm.taxRate), discountPercent: Number(invoiceForm.discountPercent) };
      await apiClient.put(`/finance/invoices/${id}`, body);
      msgOk("Invoice updated"); setShowInvoiceForm(false); setEditInvoice(null);
      loadInvoices();
    } catch { setMsg("Failed to update invoice"); }
  }
  async function deleteInvoice(id: string) { try { await apiClient.delete(`/finance/invoices/${id}`); msgOk("Invoice deleted"); loadInvoices(); } catch { setMsg("Failed"); } }
  function editInvoiceFn(inv: Invoice) {
    setEditInvoice(inv.id);
    setInvoiceForm({
      clientId: inv.clientId, projectId: inv.projectId || "", title: inv.title,
      description: inv.description || "", invoiceDate: inv.invoiceDate.slice(0, 10),
      dueDate: inv.dueDate.slice(0, 10), subtotal: String(inv.subtotal),
      taxRate: String(inv.taxRate), discountPercent: String(inv.discountPercent),
      notes: inv.notes || "", terms: inv.terms || "",
    });
    setShowInvoiceForm(true);
  }

  // ── Payment CRUD ──
  async function createPayment() {
    if (!paymentForm.invoiceId || !paymentForm.amount) { setMsg("Invoice and amount required"); return; }
    try {
      await apiClient.post("/finance/payments", { ...paymentForm, amount: Number(paymentForm.amount) });
      msgOk("Payment recorded"); setShowPaymentForm(false);
      setPaymentForm({ invoiceId: "", amount: "", method: "BANK_TRANSFER", reference: "", date: new Date().toISOString().slice(0, 10), notes: "" });
      loadPayments(); loadInvoices();
    } catch { setMsg("Failed"); }
  }
  async function deletePayment(id: string) { try { await apiClient.delete(`/finance/payments/${id}`); msgOk("Payment deleted"); loadPayments(); loadInvoices(); } catch { setMsg("Failed"); } }

  // ── Receipt CRUD ──
  async function createReceipt() {
    if (!receiptForm.invoiceId || !receiptForm.amount) { setMsg("Invoice and amount required"); return; }
    try {
      await apiClient.post("/finance/receipts", { ...receiptForm, amount: Number(receiptForm.amount) });
      msgOk("Receipt created"); setShowReceiptForm(false);
      setReceiptForm({ invoiceId: "", paymentId: "", amount: "", date: new Date().toISOString().slice(0, 10), notes: "" });
      loadReceipts();
    } catch { setMsg("Failed"); }
  }
  async function deleteReceipt(id: string) { try { await apiClient.delete(`/finance/receipts/${id}`); msgOk("Receipt deleted"); loadReceipts(); } catch { setMsg("Failed"); } }

  // ── Expense CRUD ──
  async function createExpense() {
    if (!expenseForm.description || !expenseForm.amount) { setMsg("Description and amount required"); return; }
    try {
      const body = { ...expenseForm, amount: Number(expenseForm.amount), taxAmount: Number(expenseForm.taxAmount), billable: expenseForm.billable, vendorId: expenseForm.vendorId || null, projectId: expenseForm.projectId || null };
      await apiClient.post("/finance/expenses", body);
      msgOk("Expense created"); setShowExpenseForm(false);
      setExpenseForm({ category: "OTHER", description: "", amount: "", date: new Date().toISOString().slice(0, 10), vendorId: "", projectId: "", billable: false, notes: "", taxAmount: "0" });
      loadExpenses();
    } catch { setMsg("Failed"); }
  }
  async function updateExpense(id: string) {
    if (!expenseForm.description || !expenseForm.amount) { setMsg("Description and amount required"); return; }
    try {
      const body = { ...expenseForm, amount: Number(expenseForm.amount), taxAmount: Number(expenseForm.taxAmount), billable: expenseForm.billable, vendorId: expenseForm.vendorId || null, projectId: expenseForm.projectId || null };
      await apiClient.put(`/finance/expenses/${id}`, body);
      msgOk("Expense updated"); setShowExpenseForm(false); setEditExpense(null);
      loadExpenses();
    } catch { setMsg("Failed"); }
  }
  async function deleteExpense(id: string) { try { await apiClient.delete(`/finance/expenses/${id}`); msgOk("Expense deleted"); loadExpenses(); } catch { setMsg("Failed"); } }
  function editExpenseFn(ex: Expense) {
    setEditExpense(ex.id);
    setExpenseForm({
      category: ex.category, description: ex.description, amount: String(ex.amount),
      date: ex.date.slice(0, 10), vendorId: ex.vendorId || "", projectId: ex.projectId || "",
      billable: ex.billable, notes: ex.notes || "", taxAmount: String(ex.taxAmount),
    });
    setShowExpenseForm(true);
  }

  // ── Vendor CRUD ──
  async function createVendor() {
    if (!vendorForm.name) { setMsg("Vendor name required"); return; }
    try {
      await apiClient.post("/finance/vendors", vendorForm);
      msgOk("Vendor created"); setShowVendorForm(false);
      setVendorForm({ name: "", email: "", phone: "", address: "", gst: "", pan: "", bankName: "", accountNo: "", ifsc: "", notes: "" });
      loadVendors();
    } catch { setMsg("Failed"); }
  }
  async function updateVendor(id: string) {
    if (!vendorForm.name) { setMsg("Vendor name required"); return; }
    try {
      await apiClient.put(`/finance/vendors/${id}`, vendorForm);
      msgOk("Vendor updated"); setShowVendorForm(false); setEditVendor(null);
      loadVendors();
    } catch { setMsg("Failed"); }
  }
  async function deleteVendor(id: string) { try { await apiClient.delete(`/finance/vendors/${id}`); msgOk("Vendor deleted"); loadVendors(); } catch { setMsg("Failed"); } }
  function editVendorFn(v: Vendor) {
    setEditVendor(v.id);
    setVendorForm({ name: v.name, email: v.email || "", phone: v.phone || "", address: v.address || "", gst: v.gst || "", pan: v.pan || "", bankName: v.bankName || "", accountNo: v.accountNo || "", ifsc: v.ifsc || "", notes: v.notes || "" });
    setShowVendorForm(true);
  }

  // ── Vendor Payment CRUD ──
  async function createVendorPayment() {
    if (!vendorPaymentForm.vendorId || !vendorPaymentForm.amount) { setMsg("Vendor and amount required"); return; }
    try {
      await apiClient.post("/finance/vendor-payments", { ...vendorPaymentForm, amount: Number(vendorPaymentForm.amount) });
      msgOk("Vendor payment recorded"); setShowVendorPaymentForm(false);
      setVendorPaymentForm({ vendorId: "", amount: "", method: "BANK_TRANSFER", reference: "", date: new Date().toISOString().slice(0, 10), notes: "" });
      loadVendorPayments();
    } catch { setMsg("Failed"); }
  }
  async function deleteVendorPayment(id: string) { try { await apiClient.delete(`/finance/vendor-payments/${id}`); msgOk("Vendor payment deleted"); loadVendorPayments(); } catch { setMsg("Failed"); } }

  // ── Tax Detail CRUD ──
  async function createTaxDetail() {
    if (!taxForm.name || !taxForm.rate) { setMsg("Name and rate required"); return; }
    try {
      await apiClient.post("/finance/tax-details", { ...taxForm, rate: Number(taxForm.rate) });
      msgOk("Tax detail created"); setShowTaxForm(false);
      setTaxForm({ name: "", rate: "", type: "GST", isDefault: false });
      loadTaxDetails();
    } catch { setMsg("Failed"); }
  }
  async function updateTaxDetail(id: string) {
    if (!taxForm.name || !taxForm.rate) { setMsg("Name and rate required"); return; }
    try {
      await apiClient.put(`/finance/tax-details/${id}`, { ...taxForm, rate: Number(taxForm.rate) });
      msgOk("Tax detail updated"); setShowTaxForm(false); setEditTax(null);
      loadTaxDetails();
    } catch { setMsg("Failed"); }
  }
  async function deleteTaxDetail(id: string) { try { await apiClient.delete(`/finance/tax-details/${id}`); msgOk("Tax detail deleted"); loadTaxDetails(); } catch { setMsg("Failed"); } }
  function editTaxFn(t: TaxDetail) {
    setEditTax(t.id);
    setTaxForm({ name: t.name, rate: String(t.rate), type: t.type, isDefault: t.isDefault });
    setShowTaxForm(true);
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 p-6 md:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[.28em] text-emerald-200">Phase 26</p>
            <h1 className="mt-3 text-2xl md:text-4xl font-black">Finance & Billing</h1>
            <p className="mt-2 text-xs md:text-sm text-emerald-100">Invoices, payments, expenses, and vendor management.</p>
          </div>
          <button onClick={() => { if (tab === "dashboard") loadDashboard(); }} className="rounded-xl bg-white/10 p-2.5 md:p-3"><RefreshCcw size={18} /></button>
        </div>
      </section>

      {msg && (
        <div className="rounded-xl bg-emerald-50 p-3 md:p-4 text-xs md:text-sm font-bold text-emerald-800 flex items-center justify-between">
          <span>{msg}</span>
          <button onClick={() => setMsg("")} className="text-emerald-400 hover:text-emerald-700"><XCircle size={16} /></button>
        </div>
      )}

      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-3 text-xs font-black border-b-2 transition whitespace-nowrap ${tab === t.key ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-400 hover:text-slate-700"}`}>
              <Icon size={14} />{t.label}
            </button>
          );
        })}
      </div>

      {/* ── Dashboard Tab ── */}
      {tab === "dashboard" && loading && (
        <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" /></div>
      )}
      {tab === "dashboard" && !loading && dashboard && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Revenue", value: inr(dashboard.revenue), icon: IndianRupee },
              { label: "Collected", value: inr(dashboard.collected), icon: DollarSign },
              { label: "Outstanding", value: inr(dashboard.outstanding), icon: FileText },
              { label: "Expenses", value: inr(dashboard.expenses), icon: Wallet },
              { label: "Profit", value: inr(dashboard.profit), icon: TrendingUp, color: dashboard.profit >= 0 ? "text-emerald-600" : "text-red-600" },
              { label: "Total Invoices", value: dashboard.totalInvoices, icon: Receipt },
              { label: "Total Payments", value: dashboard.totalPayments, icon: CreditCard },
              { label: "Total Expenses", value: dashboard.totalExpenses, icon: Landmark },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="rounded-2xl border bg-white p-3 md:p-4">
                  <Icon className={c.color || "text-emerald-700"} size={18} />
                  <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{c.label}</p>
                  <p className={`mt-0.5 md:mt-1 text-xl md:text-2xl font-black ${c.color || "text-slate-900"}`}>{c.value}</p>
                </div>
              );
            })}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">Pending Invoices</h3>
              {dashboard.pendingInvoices.length === 0 ? (
                <p className="text-sm text-slate-400">No pending invoices</p>
              ) : (
                <div className="space-y-2">
                  {dashboard.pendingInvoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 truncate">{inv.invoiceNumber} — {inv.title}</p>
                        <p className="text-xs text-slate-500">{inv.client?.name} — Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${statusColors[inv.status] || "bg-slate-100 text-slate-600"}`}>{inv.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">Recent Invoices</h3>
              {dashboard.recentInvoices.length === 0 ? (
                <p className="text-sm text-slate-400">No invoices yet</p>
              ) : (
                <div className="space-y-2">
                  {dashboard.recentInvoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 truncate">{inv.invoiceNumber} — {inv.title}</p>
                        <p className="text-xs text-slate-500">{inv.client?.name} — {inr(inv.total)}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${statusColors[inv.status] || "bg-slate-100 text-slate-600"}`}>{inv.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Invoices Tab ── */}
      {tab === "invoices" && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-slate-500">{invoices.length} invoice(s)</p>
              <select className={f + " max-w-[150px]"} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All status</option>
                {["DRAFT", "SENT", "PARTIALLY_PAID", "PAID", "OVERDUE", "CANCELLED", "REFUNDED"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button onClick={() => { setShowInvoiceForm(!showInvoiceForm); setEditInvoice(null); if (!showInvoiceForm) { loadClients(); loadProjects(); } }} className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Invoice</button>
          </div>
          {showInvoiceForm && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 space-y-3">
              <h3 className="font-black text-emerald-800">{editInvoice ? "Edit Invoice" : "Create Invoice"}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <select className={f} value={invoiceForm.clientId} onChange={(e) => setInvoiceForm({ ...invoiceForm, clientId: e.target.value })}>
                  <option value="">Select client *</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <select className={f} value={invoiceForm.projectId} onChange={(e) => setInvoiceForm({ ...invoiceForm, projectId: e.target.value })}>
                  <option value="">Select project (optional)</option>
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input className={f} placeholder="Title *" value={invoiceForm.title} onChange={(e) => setInvoiceForm({ ...invoiceForm, title: e.target.value })} />
                <input className={f} placeholder="Description" value={invoiceForm.description} onChange={(e) => setInvoiceForm({ ...invoiceForm, description: e.target.value })} />
                <input className={f} type="date" value={invoiceForm.invoiceDate} onChange={(e) => setInvoiceForm({ ...invoiceForm, invoiceDate: e.target.value })} />
                <input className={f} type="date" value={invoiceForm.dueDate} onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })} />
                <input className={f} type="number" placeholder="Subtotal" value={invoiceForm.subtotal} onChange={(e) => setInvoiceForm({ ...invoiceForm, subtotal: e.target.value })} />
                <input className={f} type="number" placeholder="Tax rate %" value={invoiceForm.taxRate} onChange={(e) => setInvoiceForm({ ...invoiceForm, taxRate: e.target.value })} />
                <input className={f} type="number" placeholder="Discount %" value={invoiceForm.discountPercent} onChange={(e) => setInvoiceForm({ ...invoiceForm, discountPercent: e.target.value })} />
                <textarea className={`${f} md:col-span-3 min-h-[60px]`} placeholder="Notes" value={invoiceForm.notes} onChange={(e) => setInvoiceForm({ ...invoiceForm, notes: e.target.value })} />
              </div>
              <button onClick={() => editInvoice ? updateInvoice(editInvoice) : createInvoice()} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />{editInvoice ? "Update" : "Create"}</button>
            </div>
          )}
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div key={inv.id} className="rounded-2xl border bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">{inv.invoiceNumber}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${statusColors[inv.status] || "bg-slate-100 text-slate-600"}`}>{inv.status}</span>
                    </div>
                    <p className="mt-1 text-sm font-bold text-slate-700">{inv.title}</p>
                    <p className="text-xs font-semibold text-slate-500">{inv.client?.name}{inv.project ? ` — ${inv.project.name}` : ""}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-[10px] font-semibold text-slate-400">
                      <span>Total: {inr(inv.total)}</span>
                      <span>Paid: {inr(inv.paidAmount)}</span>
                      <span>Balance: {inr(inv.balanceDue)}</span>
                      <span>Due: {new Date(inv.dueDate).toLocaleDateString()}</span>
                      {inv._count && <span>{inv._count.items} items | {inv._count.payments} payments</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => editInvoiceFn(inv)} className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600 hover:bg-emerald-100"><Edit3 size={14} /></button>
                    <button onClick={() => deleteInvoice(inv.id)} className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
            {invoices.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No invoices yet</p>}
          </div>
        </div>
      )}

      {/* ── Payments Tab ── */}
      {tab === "payments" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{payments.length} payment(s)</p>
            <button onClick={() => { setShowPaymentForm(!showPaymentForm); if (!showPaymentForm) loadInvoices(); }} className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Payment</button>
          </div>
          {showPaymentForm && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 space-y-3">
              <h3 className="font-black text-emerald-800">Record Payment</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <select className={f} value={paymentForm.invoiceId} onChange={(e) => setPaymentForm({ ...paymentForm, invoiceId: e.target.value })}>
                  <option value="">Select invoice *</option>
                  {invoices.filter((i) => i.status !== "PAID" && i.status !== "CANCELLED").map((i) => (
                    <option key={i.id} value={i.id}>{i.invoiceNumber} — {i.title} ({inr(i.balanceDue)})</option>
                  ))}
                </select>
                <input className={f} type="number" placeholder="Amount *" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} />
                <select className={f} value={paymentForm.method} onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}>
                  {["BANK_TRANSFER", "CHEQUE", "CASH", "CREDIT_CARD", "DEBIT_CARD", "UPI", "ONLINE", "OTHER"].map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                <input className={f} placeholder="Reference (cheque/trxn ID)" value={paymentForm.reference} onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })} />
                <input className={f} type="date" value={paymentForm.date} onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })} />
                <input className={f} placeholder="Notes" value={paymentForm.notes} onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })} />
              </div>
              <button onClick={createPayment} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Record</button>
            </div>
          )}
          <div className="space-y-2">
            {payments.map((p) => (
              <div key={p.id} className="rounded-2xl border bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700"><DollarSign size={18} /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{inr(p.amount)}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-500">{p.method}</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{p.invoice?.invoiceNumber} — {p.invoice?.title}</p>
                      <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-bold text-slate-400">
                        <span>{new Date(p.date).toLocaleDateString()}</span>
                        {p.reference && <span>Ref: {p.reference}</span>}
                        {p.notes && <span>{p.notes}</span>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deletePayment(p.id)} className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {payments.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No payments recorded</p>}
          </div>
        </div>
      )}

      {/* ── Receipts Tab ── */}
      {tab === "receipts" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{receipts.length} receipt(s)</p>
            <button onClick={() => { setShowReceiptForm(!showReceiptForm); if (!showReceiptForm) { loadInvoices(); loadPayments(); } }} className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Receipt</button>
          </div>
          {showReceiptForm && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 space-y-3">
              <h3 className="font-black text-emerald-800">Generate Receipt</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <select className={f} value={receiptForm.invoiceId} onChange={(e) => setReceiptForm({ ...receiptForm, invoiceId: e.target.value })}>
                  <option value="">Select invoice *</option>
                  {invoices.map((i) => <option key={i.id} value={i.id}>{i.invoiceNumber} — {i.title}</option>)}
                </select>
                <select className={f} value={receiptForm.paymentId} onChange={(e) => setReceiptForm({ ...receiptForm, paymentId: e.target.value })}>
                  <option value="">Select payment (optional)</option>
                  {payments.filter((p) => p.invoiceId === receiptForm.invoiceId || !receiptForm.invoiceId).map((p) => (
                    <option key={p.id} value={p.id}>{inr(p.amount)} — {p.method}{p.reference ? ` (${p.reference})` : ""}</option>
                  ))}
                </select>
                <input className={f} type="number" placeholder="Amount *" value={receiptForm.amount} onChange={(e) => setReceiptForm({ ...receiptForm, amount: e.target.value })} />
                <input className={f} type="date" value={receiptForm.date} onChange={(e) => setReceiptForm({ ...receiptForm, date: e.target.value })} />
                <input className={f} placeholder="Notes" value={receiptForm.notes} onChange={(e) => setReceiptForm({ ...receiptForm, notes: e.target.value })} />
              </div>
              <button onClick={createReceipt} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Generate</button>
            </div>
          )}
          <div className="space-y-2">
            {receipts.map((r) => (
              <div key={r.id} className="rounded-2xl border bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700"><Receipt size={18} /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{r.receiptNumber}</span>
                        <span className="font-bold text-emerald-700">{inr(r.amount)}</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{r.invoice?.invoiceNumber}{r.client ? ` — ${r.client.name}` : ""}</p>
                      <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-bold text-slate-400">
                        <span>{new Date(r.date).toLocaleDateString()}</span>
                        {r.payment && <span>{r.payment.method}{r.payment.reference ? ` (${r.payment.reference})` : ""}</span>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteReceipt(r.id)} className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {receipts.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No receipts generated</p>}
          </div>
        </div>
      )}

      {/* ── Expenses Tab ── */}
      {tab === "expenses" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{expenses.length} expense(s)</p>
            <button onClick={() => { setShowExpenseForm(!showExpenseForm); setEditExpense(null); if (!showExpenseForm) { loadVendors(); loadProjects(); } }} className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Expense</button>
          </div>
          {showExpenseForm && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 space-y-3">
              <h3 className="font-black text-emerald-800">{editExpense ? "Edit Expense" : "Add Expense"}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <select className={f} value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}>
                  {["SALARY", "OFFICE_RENT", "UTILITIES", "SOFTWARE", "MARKETING", "TRAVEL", "EQUIPMENT", "PROFESSIONAL_FEES", "TAXES", "MEALS", "VENDOR_PAYMENT", "OTHER"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input className={f} placeholder="Description *" value={expenseForm.description} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} />
                <input className={f} type="number" placeholder="Amount *" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} />
                <input className={f} type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} />
                <select className={f} value={expenseForm.vendorId} onChange={(e) => setExpenseForm({ ...expenseForm, vendorId: e.target.value })}>
                  <option value="">Select vendor (optional)</option>
                  {vendors.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
                <select className={f} value={expenseForm.projectId} onChange={(e) => setExpenseForm({ ...expenseForm, projectId: e.target.value })}>
                  <option value="">Select project (optional)</option>
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input className={f} type="number" placeholder="Tax amount" value={expenseForm.taxAmount} onChange={(e) => setExpenseForm({ ...expenseForm, taxAmount: e.target.value })} />
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={expenseForm.billable} onChange={(e) => setExpenseForm({ ...expenseForm, billable: e.target.checked })} className="rounded" />
                  Billable to client
                </label>
                <input className={f} placeholder="Notes" value={expenseForm.notes} onChange={(e) => setExpenseForm({ ...expenseForm, notes: e.target.value })} />
              </div>
              <button onClick={() => editExpense ? updateExpense(editExpense) : createExpense()} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />{editExpense ? "Update" : "Add"}</button>
            </div>
          )}
          <div className="space-y-2">
            {expenses.map((ex) => (
              <div key={ex.id} className="rounded-2xl border bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">{ex.description}</span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700">{ex.category}</span>
                      {ex.billable && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-black text-blue-700">Billable</span>}
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {inr(ex.amount)}{ex.taxAmount > 0 ? ` (tax: ${inr(ex.taxAmount)})` : ""}
                      {ex.vendor ? ` — ${ex.vendor.name}` : ""}{ex.project ? ` — ${ex.project.name}` : ""}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-bold text-slate-400">
                      <span>{new Date(ex.date).toLocaleDateString()}</span>
                      {ex.notes && <span>{ex.notes}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => editExpenseFn(ex)} className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600 hover:bg-emerald-100"><Edit3 size={14} /></button>
                    <button onClick={() => deleteExpense(ex.id)} className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
            {expenses.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No expenses recorded</p>}
          </div>
        </div>
      )}

      {/* ── Vendors Tab ── */}
      {tab === "vendors" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{vendors.length} vendor(s)</p>
            <button onClick={() => { setShowVendorForm(!showVendorForm); setEditVendor(null); }} className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Vendor</button>
          </div>
          {showVendorForm && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 space-y-3">
              <h3 className="font-black text-emerald-800">{editVendor ? "Edit Vendor" : "Add Vendor"}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <input className={f} placeholder="Name *" value={vendorForm.name} onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })} />
                <input className={f} placeholder="Email" value={vendorForm.email} onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })} />
                <input className={f} placeholder="Phone" value={vendorForm.phone} onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })} />
                <input className={f} placeholder="Address" value={vendorForm.address} onChange={(e) => setVendorForm({ ...vendorForm, address: e.target.value })} />
                <input className={f} placeholder="GST" value={vendorForm.gst} onChange={(e) => setVendorForm({ ...vendorForm, gst: e.target.value })} />
                <input className={f} placeholder="PAN" value={vendorForm.pan} onChange={(e) => setVendorForm({ ...vendorForm, pan: e.target.value })} />
                <input className={f} placeholder="Bank name" value={vendorForm.bankName} onChange={(e) => setVendorForm({ ...vendorForm, bankName: e.target.value })} />
                <input className={f} placeholder="Account number" value={vendorForm.accountNo} onChange={(e) => setVendorForm({ ...vendorForm, accountNo: e.target.value })} />
                <input className={f} placeholder="IFSC" value={vendorForm.ifsc} onChange={(e) => setVendorForm({ ...vendorForm, ifsc: e.target.value })} />
                <input className={`${f} md:col-span-3`} placeholder="Notes" value={vendorForm.notes} onChange={(e) => setVendorForm({ ...vendorForm, notes: e.target.value })} />
              </div>
              <button onClick={() => editVendor ? updateVendor(editVendor) : createVendor()} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />{editVendor ? "Update" : "Create"}</button>
            </div>
          )}
          <div className="space-y-2">
            {vendors.map((v) => (
              <div key={v.id} className="rounded-2xl border bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700"><Building2 size={18} /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{v.name}</span>
                        {!v.isActive && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-black text-red-600">Inactive</span>}
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{v.email || v.phone || ""}</p>
                      <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-bold text-slate-400">
                        {v.gst && <span>GST: {v.gst}</span>}
                        {v.pan && <span>PAN: {v.pan}</span>}
                        {v._count && <span>{v._count.expenses} expenses | {v._count.vendorPayments} payments</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => editVendorFn(v)} className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600 hover:bg-emerald-100"><Edit3 size={14} /></button>
                    <button onClick={() => deleteVendor(v.id)} className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
            {vendors.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No vendors added</p>}
          </div>
        </div>
      )}

      {/* ── Vendor Payments Tab ── */}
      {tab === "vendor-payments" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{vendorPayments.length} vendor payment(s)</p>
            <button onClick={() => { setShowVendorPaymentForm(!showVendorPaymentForm); if (!showVendorPaymentForm) loadVendors(); }} className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Vendor Payment</button>
          </div>
          {showVendorPaymentForm && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 space-y-3">
              <h3 className="font-black text-emerald-800">Record Vendor Payment</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <select className={f} value={vendorPaymentForm.vendorId} onChange={(e) => setVendorPaymentForm({ ...vendorPaymentForm, vendorId: e.target.value })}>
                  <option value="">Select vendor *</option>
                  {vendors.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
                <input className={f} type="number" placeholder="Amount *" value={vendorPaymentForm.amount} onChange={(e) => setVendorPaymentForm({ ...vendorPaymentForm, amount: e.target.value })} />
                <select className={f} value={vendorPaymentForm.method} onChange={(e) => setVendorPaymentForm({ ...vendorPaymentForm, method: e.target.value })}>
                  {["BANK_TRANSFER", "CHEQUE", "CASH", "CREDIT_CARD", "DEBIT_CARD", "UPI", "ONLINE", "OTHER"].map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                <input className={f} placeholder="Reference" value={vendorPaymentForm.reference} onChange={(e) => setVendorPaymentForm({ ...vendorPaymentForm, reference: e.target.value })} />
                <input className={f} type="date" value={vendorPaymentForm.date} onChange={(e) => setVendorPaymentForm({ ...vendorPaymentForm, date: e.target.value })} />
                <input className={f} placeholder="Notes" value={vendorPaymentForm.notes} onChange={(e) => setVendorPaymentForm({ ...vendorPaymentForm, notes: e.target.value })} />
              </div>
              <button onClick={createVendorPayment} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Record</button>
            </div>
          )}
          <div className="space-y-2">
            {vendorPayments.map((vp) => (
              <div key={vp.id} className="rounded-2xl border bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700"><CreditCard size={18} /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{inr(vp.amount)}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-500">{vp.method}</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-500">To: {vp.vendor?.name}</p>
                      <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-bold text-slate-400">
                        <span>{new Date(vp.date).toLocaleDateString()}</span>
                        {vp.reference && <span>Ref: {vp.reference}</span>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteVendorPayment(vp.id)} className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {vendorPayments.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No vendor payments recorded</p>}
          </div>
        </div>
      )}

      {/* ── Tax Details Tab ── */}
      {tab === "tax-details" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{taxDetails.length} tax detail(s)</p>
            <button onClick={() => { setShowTaxForm(!showTaxForm); setEditTax(null); }} className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Tax Detail</button>
          </div>
          {showTaxForm && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 space-y-3">
              <h3 className="font-black text-emerald-800">{editTax ? "Edit Tax Detail" : "Add Tax Detail"}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <input className={f} placeholder="Name * (e.g. GST 18%)" value={taxForm.name} onChange={(e) => setTaxForm({ ...taxForm, name: e.target.value })} />
                <input className={f} type="number" placeholder="Rate * (e.g. 18)" value={taxForm.rate} onChange={(e) => setTaxForm({ ...taxForm, rate: e.target.value })} />
                <select className={f} value={taxForm.type} onChange={(e) => setTaxForm({ ...taxForm, type: e.target.value })}>
                  {["GST", "CGST", "SGST", "IGST", "VAT", "SERVICE_TAX", "TDS", "OTHER"].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={taxForm.isDefault} onChange={(e) => setTaxForm({ ...taxForm, isDefault: e.target.checked })} className="rounded" />
                  Set as default
                </label>
              </div>
              <button onClick={() => editTax ? updateTaxDetail(editTax) : createTaxDetail()} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />{editTax ? "Update" : "Create"}</button>
            </div>
          )}
          <div className="overflow-x-auto rounded-2xl border bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Rate</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Default</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs font-semibold text-slate-700">
                {taxDetails.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold">{t.name}</td>
                    <td className="px-4 py-3">{t.rate}%</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black">{t.type}</span></td>
                    <td className="px-4 py-3">{t.isDefault ? <span className="text-emerald-600 font-black">Yes</span> : "\u2014"}</td>
                    <td className="px-4 py-3">{t.isActive ? <span className="text-emerald-600 font-black">Active</span> : <span className="text-red-500">Inactive</span>}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => editTaxFn(t)} className="text-emerald-500 hover:text-emerald-700"><Edit3 size={14} /></button>
                        <button onClick={() => deleteTaxDetail(t.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {taxDetails.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-sm font-bold text-slate-400">No tax details configured</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
