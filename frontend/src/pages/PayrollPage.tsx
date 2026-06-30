import { useEffect, useState } from "react";
import { Plus, RefreshCcw, Trash2, Save, IndianRupee, CheckCircle, Eye, XCircle } from "lucide-react";
import { apiClient } from "../api/client";
import type { PayrollDashboard, SalaryComponent, PayrollRun } from "../types/payroll";

const field = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-blue-500";

const tabs = [
  { key: "overview", label: "Overview", icon: IndianRupee },
  { key: "components", label: "Components", icon: Plus },
  { key: "payrolls", label: "Payroll Runs", icon: CheckCircle },
];

const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [message, setMessage] = useState("");
  const [dashboard, setDashboard] = useState<PayrollDashboard | null>(null);
  const [components, setComponents] = useState<SalaryComponent[]>([]);
  const [payrolls, setPayrolls] = useState<PayrollRun[]>([]);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRun | null>(null);
  const [showCompForm, setShowCompForm] = useState(false);
  const [compForm, setCompForm] = useState({ name: "", type: "EARNING", description: "" });

  useEffect(() => { void loadOverview(); }, []);

  async function loadOverview() {
    try {
      const res = await apiClient.get("/payroll/dashboard");
      setDashboard(res.data.data);
    } catch { setMessage("Failed to load overview"); }
  }

  async function loadComponents() {
    try {
      const res = await apiClient.get("/payroll/components");
      setComponents(res.data.data || []);
    } catch { setMessage("Failed to load components"); }
  }

  async function loadPayrolls() {
    try {
      const res = await apiClient.get("/payroll/payrolls");
      setPayrolls(res.data.data || []);
    } catch { setMessage("Failed to load payrolls"); }
  }

  function onTabChange(key: string) {
    setActiveTab(key);
    setMessage("");
    if (key === "components") void loadComponents();
    if (key === "payrolls") void loadPayrolls();
  }

  async function createComponent() {
    if (!compForm.name) return;
    try {
      await apiClient.post("/payroll/components", compForm);
      setShowCompForm(false);
      setCompForm({ name: "", type: "EARNING", description: "" });
      await loadComponents();
    } catch { setMessage("Failed to create component"); }
  }

  async function deleteComponent(id: string) {
    try {
      await apiClient.delete(`/payroll/components/${id}`);
      await loadComponents();
    } catch { setMessage("Failed to delete"); }
  }

  async function createPayroll() {
    if (!dashboard) return;
    try {
      const res = await apiClient.post("/payroll/payrolls", { month: dashboard.currentMonth, year: dashboard.currentYear });
      setMessage(`Payroll ${months[dashboard.currentMonth]} ${dashboard.currentYear} created with ${res.data.data?.employeeCount || 0} payslips`);
      await loadPayrolls();
      await loadOverview();
    } catch (err: any) { setMessage(err?.response?.data?.message || "Failed to create payroll"); }
  }

  async function processPayroll(id: string) {
    try {
      await apiClient.put(`/payroll/payrolls/${id}/process`);
      await loadPayrolls();
      if (selectedPayroll?.id === id) setSelectedPayroll(null);
    } catch { setMessage("Failed to process"); }
  }

  async function deletePayroll(id: string) {
    try {
      await apiClient.delete(`/payroll/payrolls/${id}`);
      if (selectedPayroll?.id === id) setSelectedPayroll(null);
      await loadPayrolls();
    } catch { setMessage("Failed to delete"); }
  }

  async function viewPayroll(id: string) {
    try {
      const res = await apiClient.get(`/payroll/payrolls/${id}`);
      setSelectedPayroll(res.data.data);
    } catch { setMessage("Failed to load payroll"); }
  }

  const currentLabel = dashboard ? `${months[dashboard.currentMonth]} ${dashboard.currentYear}` : "";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-black text-slate-900">Payroll</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => onTabChange(activeTab)} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50" title="Refresh"><RefreshCcw size={18} /></button>
        </div>
      </div>

      {message && <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-800">{message}</div>}

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => onTabChange(t.key)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black whitespace-nowrap transition ${activeTab === t.key ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
              <Icon size={16} />{t.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && dashboard && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wide">Current Period</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{currentLabel}</p>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wide">Payroll Status</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{dashboard.currentPayroll ? dashboard.currentPayroll.status : "Not Created"}</p>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wide">Salary Components</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{dashboard.totalComponents}</p>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wide">Total Payrolls</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{dashboard.totalPayrolls}</p>
            </div>
          </div>
          {!dashboard.currentPayroll && (
            <button onClick={createPayroll} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Generate Payroll for {currentLabel}</button>
          )}
        </div>
      )}

      {/* Components Tab */}
      {activeTab === "components" && (
        <div className="space-y-3">
          <button onClick={() => setShowCompForm(!showCompForm)} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white"><Plus size={16} className="inline mr-1" />Add Component</button>

          {showCompForm && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 space-y-3">
              <h3 className="font-black text-blue-800">New Salary Component</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <input className={field} placeholder="Name *" value={compForm.name} onChange={(e) => setCompForm({ ...compForm, name: e.target.value })} />
                <select className={field} value={compForm.type} onChange={(e) => setCompForm({ ...compForm, type: e.target.value })}>
                  <option value="EARNING">Earning</option>
                  <option value="DEDUCTION">Deduction</option>
                </select>
                <input className={field} placeholder="Description" value={compForm.description} onChange={(e) => setCompForm({ ...compForm, description: e.target.value })} />
              </div>
              <button onClick={createComponent} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Save</button>
            </div>
          )}

          {components.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-2xl border bg-white p-4">
              <div>
                <span className="font-black text-slate-900">{c.name}</span>
                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-black ${c.type === "EARNING" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{c.type}</span>
              </div>
              <button onClick={() => deleteComponent(c.id)} className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}

      {/* Payroll Runs Tab */}
      {activeTab === "payrolls" && (
        <div className="space-y-3">
          {payrolls.map((p) => (
            <div key={p.id} className="rounded-2xl border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-black text-slate-900">{months[p.month]} {p.year}</span>
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-black ${p.status === "PROCESSED" ? "bg-green-50 text-green-700" : p.status === "CANCELLED" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{p.status}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-slate-600">{p.employeeCount} employees</span>
                  <span className="font-black text-slate-900">₹{p.totalNet.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <button onClick={() => viewPayroll(p.id)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600" title="View"><Eye size={16} /></button>
                {p.status === "DRAFT" && (
                  <>
                    <button onClick={() => processPayroll(p.id)} className="rounded-xl bg-green-600 px-3 py-2 text-xs font-black text-white"><CheckCircle size={14} className="inline mr-1" />Process</button>
                    <button onClick={() => deletePayroll(p.id)} className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Delete"><Trash2 size={16} /></button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Payroll Detail */}
          {selectedPayroll && (
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 space-y-3">
              <h3 className="font-black text-blue-800">{months[selectedPayroll.month]} {selectedPayroll.year} - Payslips</h3>
              <div className="text-sm font-bold text-slate-600 space-y-1">
                <p>Gross: ₹{selectedPayroll.totalGross.toLocaleString()} | Deductions: ₹{selectedPayroll.totalDeductions.toLocaleString()} | Net: ₹{selectedPayroll.totalNet.toLocaleString()}</p>
              </div>
              {selectedPayroll.payslips?.map((ps) => (
                <div key={ps.id} className="rounded-xl border bg-white p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{ps.employee.user.name}</span>
                    <span className="font-black text-blue-700">₹{ps.netPay.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-500">
                    <span>Gross: ₹{ps.grossPay.toLocaleString()}</span>
                    <span>Deductions: ₹{ps.totalDeductions.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ps.components.map((pc) => (
                      <span key={pc.id} className={`rounded-full px-2 py-0.5 text-xs font-bold ${pc.component.type === "EARNING" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {pc.component.name}: ₹{pc.amount.toLocaleString()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={() => setSelectedPayroll(null)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-600"><XCircle size={14} className="inline mr-1" />Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
