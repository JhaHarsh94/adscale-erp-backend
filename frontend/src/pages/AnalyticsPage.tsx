import { useEffect, useState } from "react";
import {
  BarChart3, RefreshCcw, XCircle, TrendingUp, DollarSign, UsersRound,
  FolderKanban, Ticket, Target, Clock, Building2, SmilePlus, IndianRupee,
  Layers3, UserCheck, CalendarCheck, FileText,
} from "lucide-react";
import { apiClient } from "../api/client";
import type {
  CeoDashboard, EmployeeAnalytics, ProjectAnalytics, TicketAnalytics,
  AttendanceAnalytics, LeadAnalytics, ProductivityAnalytics,
  DepartmentPerformance, ClientSatisfaction,
} from "../types/analytics";

const f = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-indigo-500";

const tabs = [
  { key: "dashboard", label: "CEO Dashboard", icon: BarChart3 },
  { key: "employees", label: "Employees", icon: UsersRound },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "tickets", label: "Tickets", icon: Ticket },
  { key: "attendance", label: "Attendance", icon: CalendarCheck },
  { key: "leads", label: "Leads", icon: Target },
  { key: "productivity", label: "Productivity", icon: Clock },
  { key: "departments", label: "Departments", icon: Building2 },
  { key: "satisfaction", label: "Satisfaction", icon: SmilePlus },
];

function inr(n: number) { return "\u20B9" + n.toLocaleString("en-IN"); }

function cn(n: number) { return n.toLocaleString("en-IN"); }

export default function AnalyticsPage() {
  const [tab, setTab] = useState("dashboard");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const [ceo, setCeo] = useState<CeoDashboard | null>(null);
  const [employees, setEmployees] = useState<EmployeeAnalytics | null>(null);
  const [projects, setProjects] = useState<ProjectAnalytics | null>(null);
  const [tickets, setTickets] = useState<TicketAnalytics | null>(null);
  const [attendance, setAttendance] = useState<AttendanceAnalytics | null>(null);
  const [leads, setLeads] = useState<LeadAnalytics | null>(null);
  const [productivity, setProductivity] = useState<ProductivityAnalytics | null>(null);
  const [deptPerf, setDeptPerf] = useState<DepartmentPerformance[]>([]);
  const [satisfaction, setSatisfaction] = useState<ClientSatisfaction | null>(null);

  function msgOk(s: string) { setMsg(s); setTimeout(() => setMsg(""), 3000); }

  async function loadCeo() {
    setLoading(true);
    try { const res = await apiClient.get("/analytics/ceo-dashboard"); setCeo(res.data.data); } catch { setMsg("Failed to load CEO dashboard"); }
    setLoading(false);
  }
  async function loadEmployees() { try { const res = await apiClient.get("/analytics/employees"); setEmployees(res.data.data); } catch {} }
  async function loadProjects() { try { const res = await apiClient.get("/analytics/projects"); setProjects(res.data.data); } catch {} }
  async function loadTickets() { try { const res = await apiClient.get("/analytics/tickets"); setTickets(res.data.data); } catch {} }
  async function loadAttendance() { try { const res = await apiClient.get("/analytics/attendance"); setAttendance(res.data.data); } catch {} }
  async function loadLeads() { try { const res = await apiClient.get("/analytics/leads"); setLeads(res.data.data); } catch {} }
  async function loadProductivity() { try { const res = await apiClient.get("/analytics/productivity"); setProductivity(res.data.data); } catch {} }
  async function loadDeptPerf() { try { const res = await apiClient.get("/analytics/departments"); setDeptPerf(res.data.data || []); } catch {} }
  async function loadSatisfaction() { try { const res = await apiClient.get("/analytics/client-satisfaction"); setSatisfaction(res.data.data); } catch {} }

  useEffect(() => { if (tab === "dashboard") loadCeo(); }, [tab]);
  useEffect(() => { if (tab === "employees") loadEmployees(); }, [tab]);
  useEffect(() => { if (tab === "projects") loadProjects(); }, [tab]);
  useEffect(() => { if (tab === "tickets") loadTickets(); }, [tab]);
  useEffect(() => { if (tab === "attendance") loadAttendance(); }, [tab]);
  useEffect(() => { if (tab === "leads") loadLeads(); }, [tab]);
  useEffect(() => { if (tab === "productivity") loadProductivity(); }, [tab]);
  useEffect(() => { if (tab === "departments") loadDeptPerf(); }, [tab]);
  useEffect(() => { if (tab === "satisfaction") loadSatisfaction(); }, [tab]);

  function statusColor(status: string) {
    const colors: Record<string, string> = {
      ACTIVE: "bg-green-50 text-green-700",
      COMPLETED: "bg-blue-50 text-blue-700",
      CANCELLED: "bg-red-50 text-red-700",
      ON_HOLD: "bg-amber-50 text-amber-700",
      IN_PROGRESS: "bg-indigo-50 text-indigo-700",
      OPEN: "bg-blue-50 text-blue-700",
      RESOLVED: "bg-green-50 text-green-700",
      CLOSED: "bg-slate-100 text-slate-600",
    };
    return colors[status] || "bg-slate-100 text-slate-600";
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 p-6 md:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[.28em] text-indigo-200">Phase 27</p>
            <h1 className="mt-3 text-2xl md:text-4xl font-black">Analytics Center</h1>
            <p className="mt-2 text-xs md:text-sm text-indigo-100">CEO dashboard and business intelligence across all modules.</p>
          </div>
          <button onClick={() => { if (tab === "dashboard") loadCeo(); }} className="rounded-xl bg-white/10 p-2.5 md:p-3"><RefreshCcw size={18} /></button>
        </div>
      </section>

      {msg && (
        <div className="rounded-xl bg-indigo-50 p-3 md:p-4 text-xs md:text-sm font-bold text-indigo-800 flex items-center justify-between">
          <span>{msg}</span>
          <button onClick={() => setMsg("")} className="text-indigo-400 hover:text-indigo-700"><XCircle size={16} /></button>
        </div>
      )}

      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-3 text-xs font-black border-b-2 transition whitespace-nowrap ${tab === t.key ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-400 hover:text-slate-700"}`}>
              <Icon size={14} />{t.label}
            </button>
          );
        })}
      </div>

      {/* ── CEO Dashboard Tab ── */}
      {tab === "dashboard" && loading && (
        <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>
      )}
      {tab === "dashboard" && !loading && ceo && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Revenue", value: inr(ceo.revenue), icon: IndianRupee, color: "" },
              { label: "Collected", value: inr(ceo.collected), icon: DollarSign, color: "" },
              { label: "Outstanding", value: inr(ceo.outstanding), icon: FileText, color: "text-amber-600" },
              { label: "Expenses", value: inr(ceo.expenses), icon: TrendingUp, color: "text-red-600" },
              { label: "Profit", value: inr(ceo.profit), icon: TrendingUp, color: ceo.profit >= 0 ? "text-green-600" : "text-red-600" },
              { label: "Profit Margin", value: `${ceo.profitMargin}%`, icon: BarChart3, color: "" },
              { label: "Total Invoices", value: cn(ceo.totalInvoices), icon: FileText, color: "" },
              { label: "Total Payments", value: cn(ceo.totalPayments), icon: DollarSign, color: "" },
              { label: "Total Expenses", value: cn(ceo.totalExpenses), icon: TrendingUp, color: "" },
              { label: "Active Employees", value: `${ceo.employees.active}/${ceo.employees.total}`, icon: UsersRound, color: "" },
              { label: "Active Projects", value: `${ceo.projects.active}/${ceo.projects.total}`, icon: FolderKanban, color: "" },
              { label: "Open Tickets", value: `${ceo.tickets.open}/${ceo.tickets.total}`, icon: Ticket, color: "text-amber-600" },
              { label: "Total Clients", value: cn(ceo.clients), icon: UsersRound, color: "" },
              { label: "Lead Conversion", value: `${ceo.leads.conversionRate}%`, icon: Target, color: "text-green-600" },
              { label: "Today Attendance", value: cn(ceo.attendance.today), icon: CalendarCheck, color: "" },
              { label: "Total Users", value: cn(ceo.users), icon: UserCheck, color: "" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="rounded-2xl border bg-white p-3 md:p-4">
                  <Icon className={c.color || "text-indigo-700"} size={18} />
                  <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{c.label}</p>
                  <p className={`mt-0.5 md:mt-1 text-xl md:text-2xl font-black ${c.color || "text-slate-900"}`}>{c.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">Departments</h3>
              {ceo.departments.length === 0 ? (
                <p className="text-sm text-slate-400">No department data</p>
              ) : (
                <div className="space-y-2">
                  {ceo.departments.map((d) => (
                    <div key={d.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <span className="text-sm font-bold text-slate-900">{d.name}</span>
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700">{d.employeeCount} employees</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">Lead Pipeline</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-sm font-bold text-slate-900">Total Leads</span>
                  <span className="font-black text-indigo-700">{cn(ceo.leads.total)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-sm font-bold text-slate-900">Converted</span>
                  <span className="font-black text-green-700">{cn(ceo.leads.converted)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-sm font-bold text-slate-900">Conversion Rate</span>
                  <span className="font-black text-blue-700">{ceo.leads.conversionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Employees Tab ── */}
      {tab === "employees" && !employees && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>}
      {tab === "employees" && employees && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total", value: cn(employees.total), icon: UsersRound, color: "" },
              { label: "Active", value: cn(employees.active), icon: UserCheck, color: "text-green-600" },
              { label: "Inactive", value: cn(employees.inactive), icon: UsersRound, color: "text-slate-400" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="rounded-2xl border bg-white p-3 md:p-4">
                  <Icon className={c.color || "text-indigo-700"} size={18} />
                  <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{c.label}</p>
                  <p className={`mt-0.5 md:mt-1 text-xl md:text-2xl font-black ${c.color || "text-slate-900"}`}>{c.value}</p>
                </div>
              );
            })}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">By Department</h3>
              <div className="space-y-2">
                {employees.byDepartment.map((d) => (
                  <div key={d.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span className="text-sm font-bold text-slate-900">{d.name}</span>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700">{d.count}</span>
                  </div>
                ))}
                {employees.byDepartment.length === 0 && <p className="text-sm text-slate-400">No departments</p>}
              </div>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">Recent Joiners</h3>
              <div className="space-y-2">
                {employees.recentJoiners.slice(0, 8).map((e) => (
                  <div key={e.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 truncate">{e.fullName}</p>
                      <p className="text-[10px] text-slate-500">{e.department?.name || "No dept"}{e.designation ? ` — ${e.designation.name}` : ""}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{new Date(e.joiningDate).toLocaleDateString()}</span>
                  </div>
                ))}
                {employees.recentJoiners.length === 0 && <p className="text-sm text-slate-400">No recent joiners</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Projects Tab ── */}
      {tab === "projects" && !projects && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>}
      {tab === "projects" && projects && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border bg-white p-3 md:p-4">
              <FolderKanban className="text-indigo-700" size={18} />
              <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">Total Projects</p>
              <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-slate-900">{cn(projects.total)}</p>
            </div>
            {projects.byStatus.map((s) => (
              <div key={s.status} className="rounded-2xl border bg-white p-3 md:p-4">
                <Layers3 className="text-indigo-700" size={18} />
                <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{s.status}</p>
                <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-slate-900">{cn(s.count)}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border bg-white p-4">
            <h3 className="font-black text-slate-900 mb-3">Recent Projects</h3>
            <div className="space-y-2">
              {projects.recentProjects.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{p.name}</p>
                    <p className="text-[10px] text-slate-500">{p.client?.name || "No client"} — {new Date(p.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${statusColor(p.status)}`}>{p.status}</span>
                </div>
              ))}
              {projects.recentProjects.length === 0 && <p className="text-sm text-slate-400">No projects</p>}
            </div>
          </div>
        </div>
      )}

      {/* ── Tickets Tab ── */}
      {tab === "tickets" && !tickets && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>}
      {tab === "tickets" && tickets && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border bg-white p-3 md:p-4">
              <Ticket className="text-indigo-700" size={18} />
              <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">Total Tickets</p>
              <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-slate-900">{cn(tickets.total)}</p>
            </div>
            <div className="rounded-2xl border bg-white p-3 md:p-4">
              <Clock className="text-red-600" size={18} />
              <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">Overdue</p>
              <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-red-600">{cn(tickets.overdue)}</p>
            </div>
            {tickets.byStatus.map((s) => (
              <div key={s.status} className="rounded-2xl border bg-white p-3 md:p-4">
                <Ticket className="text-indigo-700" size={18} />
                <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{s.status}</p>
                <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-slate-900">{cn(s.count)}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">By Priority</h3>
              <div className="space-y-2">
                {tickets.byPriority.map((p) => (
                  <div key={p.priority} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span className="text-sm font-bold text-slate-900">{p.priority}</span>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700">{cn(p.count)}</span>
                  </div>
                ))}
                {tickets.byPriority.length === 0 && <p className="text-sm text-slate-400">No priority data</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Attendance Tab ── */}
      {tab === "attendance" && !attendance && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>}
      {tab === "attendance" && attendance && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Records", value: cn(attendance.totalRecords), icon: CalendarCheck, color: "" },
              { label: "Present", value: cn(attendance.present), icon: UserCheck, color: "text-green-600" },
              { label: "Late", value: cn(attendance.late), icon: Clock, color: "text-amber-600" },
              { label: "Absent", value: cn(attendance.absent), icon: UsersRound, color: "text-red-600" },
              { label: "Half Day", value: cn(attendance.halfDay), icon: Clock, color: "text-orange-600" },
              { label: "Attendance Rate", value: `${attendance.attendanceRate}%`, icon: BarChart3, color: "text-green-600" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="rounded-2xl border bg-white p-3 md:p-4">
                  <Icon className={c.color || "text-indigo-700"} size={18} />
                  <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{c.label}</p>
                  <p className={`mt-0.5 md:mt-1 text-xl md:text-2xl font-black ${c.color || "text-slate-900"}`}>{c.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Leads Tab ── */}
      {tab === "leads" && !leads && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>}
      {tab === "leads" && leads && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border bg-white p-3 md:p-4">
              <Target className="text-indigo-700" size={18} />
              <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">Total Leads</p>
              <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-slate-900">{cn(leads.total)}</p>
            </div>
            <div className="rounded-2xl border bg-white p-3 md:p-4">
              <Target className="text-green-600" size={18} />
              <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">Conversion Rate</p>
              <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-green-600">{leads.conversionRate}%</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">By Status</h3>
              <div className="space-y-2">
                {leads.byStatus.map((s) => (
                  <div key={s.status} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span className="text-sm font-bold text-slate-900">{s.status}</span>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700">{cn(s.count)}</span>
                  </div>
                ))}
                {leads.byStatus.length === 0 && <p className="text-sm text-slate-400">No lead data</p>}
              </div>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <h3 className="font-black text-slate-900 mb-3">By Source</h3>
              <div className="space-y-2">
                {leads.bySource.map((s) => (
                  <div key={s.source} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span className="text-sm font-bold text-slate-900">{s.source || "Unknown"}</span>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700">{cn(s.count)}</span>
                  </div>
                ))}
                {leads.bySource.length === 0 && <p className="text-sm text-slate-400">No source data</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Productivity Tab ── */}
      {tab === "productivity" && !productivity && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>}
      {tab === "productivity" && productivity && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Work Logs", value: cn(productivity.totalWorkLogs), icon: Clock, color: "" },
              { label: "Total Hours", value: `${cn(Math.round(productivity.totalHours))}h`, icon: Clock, color: "text-green-600" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="rounded-2xl border bg-white p-3 md:p-4">
                  <Icon className={c.color || "text-indigo-700"} size={18} />
                  <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{c.label}</p>
                  <p className={`mt-0.5 md:mt-1 text-xl md:text-2xl font-black ${c.color || "text-slate-900"}`}>{c.value}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-2xl border bg-white p-4">
            <h3 className="font-black text-slate-900 mb-3">Top Employees by Hours</h3>
            <div className="space-y-2">
              {productivity.topEmployees.map((e, i) => (
                <div key={e.employeeId} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-xs font-black text-indigo-500 w-5">#{i + 1}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{e.employeeName}</p>
                      <p className="text-[10px] text-slate-500">{e.department} — {e.employeeCode}</p>
                    </div>
                  </div>
                  <span className="font-black text-indigo-700">{Math.round(e.hours)}h</span>
                </div>
              ))}
              {productivity.topEmployees.length === 0 && <p className="text-sm text-slate-400">No productivity data</p>}
            </div>
          </div>
        </div>
      )}

      {/* ── Departments Tab ── */}
      {tab === "departments" && deptPerf.length === 0 && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>}
      {tab === "departments" && deptPerf.length > 0 && (
        <div className="space-y-4">
          {deptPerf.map((d) => (
            <div key={d.id} className="rounded-2xl border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-700"><Building2 size={18} /></div>
                  <div>
                    <p className="font-black text-slate-900">{d.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{d.activeEmployees} active / {d.totalEmployees} total employees</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-indigo-700">{Math.round(d.hoursLogged)}h</p>
                  <p className="text-[10px] font-bold text-slate-400">hours (30d)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Satisfaction Tab ── */}
      {tab === "satisfaction" && !satisfaction && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /></div>}
      {tab === "satisfaction" && satisfaction && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Clients", value: cn(satisfaction.totalClients), icon: UsersRound, color: "" },
              { label: "Active Projects", value: cn(satisfaction.activeProjects), icon: FolderKanban, color: "" },
              { label: "Open Tickets", value: cn(satisfaction.openTickets), icon: Ticket, color: "text-amber-600" },
              { label: "Resolved Tickets", value: cn(satisfaction.resolvedTickets), icon: Ticket, color: "text-green-600" },
              { label: "Satisfaction Score", value: `${satisfaction.satisfactionScore}%`, icon: SmilePlus, color: "text-green-600" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="rounded-2xl border bg-white p-3 md:p-4">
                  <Icon className={c.color || "text-indigo-700"} size={18} />
                  <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{c.label}</p>
                  <p className={`mt-0.5 md:mt-1 text-xl md:text-2xl font-black ${c.color || "text-slate-900"}`}>{c.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
