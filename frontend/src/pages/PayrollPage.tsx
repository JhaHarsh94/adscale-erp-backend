import { useEffect, useState } from "react";
import { Plus, RefreshCcw, Trash2, Save, IndianRupee, CheckCircle, Eye, XCircle, Download, Gift, Edit2 } from "lucide-react";
import { apiClient } from "../api/client";
import type { PayrollDashboard, SalaryComponent, PayrollRun, EmployeeSalaryStructure } from "../types/payroll";

const field = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-blue-500";

const tabs = [
  { key: "overview", label: "Overview", icon: IndianRupee },
  { key: "components", label: "Components", icon: Plus },
  { key: "structures", label: "Structures", icon: Edit2 },
  { key: "bonuses", label: "Bonuses", icon: Gift },
  { key: "payrolls", label: "Payroll Runs", icon: CheckCircle },
];

const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const bonusTypes = ["PERFORMANCE", "FESTIVAL", "REFERRAL", "SPOT", "ANNUAL", "OTHER"];

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [message, setMessage] = useState("");
  const [dashboard, setDashboard] = useState<PayrollDashboard | null>(null);
  const [components, setComponents] = useState<SalaryComponent[]>([]);
  const [payrolls, setPayrolls] = useState<PayrollRun[]>([]);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRun | null>(null);
  const [showCompForm, setShowCompForm] = useState(false);
  const [compForm, setCompForm] = useState({ name: "", type: "EARNING", description: "" });

  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);
  const [structures, setStructures] = useState<EmployeeSalaryStructure[]>([]);
  const [showStructForm, setShowStructForm] = useState(false);
  const [structForm, setStructForm] = useState({ employeeId: "", componentId: "", amount: "", effectiveFrom: "" });

  const [bonuses, setBonuses] = useState<any[]>([]);
  const [showBonusForm, setShowBonusForm] = useState(false);
  const [bonusForm, setBonusForm] = useState({ employeeId: "", type: "PERFORMANCE", title: "", description: "", amount: "", payDate: "" });

  useEffect(() => { void loadOverview(); void loadEmployees(); }, []);

  async function loadEmployees() {
    try {
      const res = await apiClient.get("/employees");
      setEmployees((res.data.data || []).map((e: any) => ({ id: e.id, name: e.user?.name || e.employeeCode })));
    } catch {}
  }

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

  async function loadStructures() {
    try {
      const res = await apiClient.get("/payroll/structures");
      setStructures(res.data.data || []);
    } catch { setMessage("Failed to load structures"); }
  }

  async function loadBonuses() {
    try {
      const res = await apiClient.get("/payroll/bonuses");
      setBonuses(res.data.data || []);
    } catch { setMessage("Failed to load bonuses"); }
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
    if (key === "structures") void loadStructures();
    if (key === "bonuses") void loadBonuses();
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
    try { await apiClient.delete(`/payroll/components/${id}`); await loadComponents(); }
    catch { setMessage("Failed to delete"); }
  }

  async function upsertStructure() {
    try {
      if (!structForm.employeeId || !structForm.componentId || !structForm.amount || !structForm.effectiveFrom) {
        setMessage("All fields required"); return;
      }
      await apiClient.post("/payroll/structures", structForm);
      setShowStructForm(false);
      setStructForm({ employeeId: "", componentId: "", amount: "", effectiveFrom: "" });
      await loadStructures();
    } catch { setMessage("Failed to save structure"); }
  }

  async function deleteStructure(id: string) {
    try { await apiClient.delete(`/payroll/structures/${id}`); await loadStructures(); }
    catch { setMessage("Failed to delete"); }
  }

  async function createBonus() {
    try {
      if (!bonusForm.employeeId || !bonusForm.title || !bonusForm.amount) { setMessage("Employee, title, amount required"); return; }
      await apiClient.post("/payroll/bonuses", bonusForm);
      setShowBonusForm(false);
      setBonusForm({ employeeId: "", type: "PERFORMANCE", title: "", description: "", amount: "", payDate: "" });
      await loadBonuses();
    } catch { setMessage("Failed to create bonus"); }
  }

  async function deleteBonus(id: string) {
    try { await apiClient.delete(`/payroll/bonuses/${id}`); await loadBonuses(); }
    catch { setMessage("Failed to delete"); }
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

  async function cancelPayroll(id: string) {
    try {
      await apiClient.put(`/payroll/payrolls/${id}/cancel`);
      await loadPayrolls();
      if (selectedPayroll?.id === id) setSelectedPayroll(null);
    } catch { setMessage("Failed to cancel"); }
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
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-black text-slate-900">Payroll</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => onTabChange(activeTab)} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50" title="Refresh"><RefreshCcw size={18} /></button>
        </div>
      </div>

      {message && <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-800">{message}</div>}

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wide">Active Salary Structures</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{dashboard.totalStructures}</p>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wide">Bonuses/Incentives</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{(dashboard as any).totalBonuses || 0}</p>
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

      {/* Salary Structures Tab */}
      {activeTab === "structures" && (
        <div className="space-y-3">
          <button onClick={() => setShowStructForm(!showStructForm)} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white"><Plus size={16} className="inline mr-1" />Assign Structure</button>

          {showStructForm && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 space-y-3">
              <h3 className="font-black text-blue-800">Assign Salary Component to Employee</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <select className={field} value={structForm.employeeId} onChange={(e) => setStructForm({ ...structForm, employeeId: e.target.value })}>
                  <option value="">Select employee *</option>
                  {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
                <select className={field} value={structForm.componentId} onChange={(e) => setStructForm({ ...structForm, componentId: e.target.value })}>
                  <option value="">Select component *</option>
                  {components.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.type})</option>)}
                </select>
                <input className={field} type="number" placeholder="Amount *" value={structForm.amount} onChange={(e) => setStructForm({ ...structForm, amount: e.target.value })} />
                <input className={field} type="date" placeholder="Effective from *" value={structForm.effectiveFrom} onChange={(e) => setStructForm({ ...structForm, effectiveFrom: e.target.value })} />
              </div>
              <button onClick={upsertStructure} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Save</button>
            </div>
          )}

          {structures.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No salary structures assigned yet</p>}
          {structures.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-2xl border bg-white p-4">
              <div>
                <span className="font-black text-slate-900">{s.employee.user.name}</span>
                <span className="ml-2 text-sm text-slate-500">— {s.component.name}</span>
                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-black ${s.component.type === "EARNING" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{s.component.type}</span>
                <span className="ml-2 text-sm font-bold text-slate-700">₹{s.amount.toLocaleString()}</span>
              </div>
              <button onClick={() => deleteStructure(s.id)} className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}

      {/* Bonuses Tab */}
      {activeTab === "bonuses" && (
        <div className="space-y-3">
          <button onClick={() => setShowBonusForm(!showBonusForm)} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white"><Plus size={16} className="inline mr-1" />Add Bonus/Incentive</button>

          {showBonusForm && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 space-y-3">
              <h3 className="font-black text-blue-800">New Bonus / Incentive</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <select className={field} value={bonusForm.employeeId} onChange={(e) => setBonusForm({ ...bonusForm, employeeId: e.target.value })}>
                  <option value="">Select employee *</option>
                  {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
                <select className={field} value={bonusForm.type} onChange={(e) => setBonusForm({ ...bonusForm, type: e.target.value })}>
                  {bonusTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <input className={field} placeholder="Title *" value={bonusForm.title} onChange={(e) => setBonusForm({ ...bonusForm, title: e.target.value })} />
                <input className={field} type="number" placeholder="Amount *" value={bonusForm.amount} onChange={(e) => setBonusForm({ ...bonusForm, amount: e.target.value })} />
                <textarea className={`${field} min-h-[60px]`} placeholder="Description" value={bonusForm.description} onChange={(e) => setBonusForm({ ...bonusForm, description: e.target.value })} />
                <input className={field} type="date" placeholder="Pay date" value={bonusForm.payDate} onChange={(e) => setBonusForm({ ...bonusForm, payDate: e.target.value })} />
              </div>
              <button onClick={createBonus} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
            </div>
          )}

          {bonuses.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No bonuses or incentives yet</p>}
          {bonuses.map((b) => (
            <div key={b.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Gift size={14} className="text-green-500" />
                    <span className="font-black">{b.employee?.user.name || "Unknown"}</span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-black text-blue-700">{b.type}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-black ${b.status === "PAID" ? "bg-green-50 text-green-700" : b.status === "CANCELLED" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{b.status}</span>
                  </div>
                  <p className="mt-1 text-sm font-bold">{b.title}</p>
                  <p className="text-lg font-black text-green-700">₹{b.amount.toLocaleString()}</p>
                  {b.description && <p className="text-xs text-slate-500">{b.description}</p>}
                </div>
                <button onClick={() => deleteBonus(b.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
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
                <button onClick={() => viewPayroll(p.id)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600" title="View Payslips"><Eye size={16} /></button>
                {p.status === "DRAFT" && (
                  <>
                    <button onClick={() => processPayroll(p.id)} className="rounded-xl bg-green-600 px-3 py-2 text-xs font-black text-white"><CheckCircle size={14} className="inline mr-1" />Process</button>
                    <button onClick={() => cancelPayroll(p.id)} className="rounded-xl bg-red-600 px-3 py-2 text-xs font-black text-white"><XCircle size={14} className="inline mr-1" />Cancel</button>
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
                    <span>Working: {ps.presentDays}/{ps.workingDays} days</span>
                    <span>Leaves: {ps.leaveDays} | Absent: {ps.absentDays}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ps.components.map((pc) => (
                      <span key={pc.id} className={`rounded-full px-2 py-0.5 text-xs font-bold ${pc.component.type === "EARNING" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {pc.component.name}: ₹{pc.amount.toLocaleString()}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => window.open(`${apiBase}/api/payroll/payslips/${ps.id}/pdf`, "_blank")}
                    className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-black text-white"
                  >
                    <Download size={12} className="inline mr-1" />Download PDF
                  </button>
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