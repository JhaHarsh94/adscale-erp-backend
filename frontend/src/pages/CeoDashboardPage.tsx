import { useEffect, useState } from "react";
import {
  Activity,
  CalendarCheck,
  CheckSquare,
  Clock,
  Crown,
  FileSignature,
  FolderKanban,
  IndianRupee,
  MessageCircle,
  RefreshCcw,
  Shield,
  Target,
  Ticket,
  TrendingUp,
  UserPlus,
  UsersRound,
  Video,
  Share2,
  Wallet,
} from "lucide-react";
import { apiClient } from "../api/client";
import { getUser } from "../lib/auth";

interface ModuleStats {
  users: number; employees: number; projects: number; tasks: number; tickets: number;
  clients: number; leads: number; proposals: number; contracts: number;
  presentToday: number; onLeave: number; chats: number; meetings: number;
  payrolls: number; seoProjects: number; socialPosts: number; googleCampaigns: number; metaCampaigns: number;
}

export default function CeoDashboardPage() {
  const user = getUser();
  const [stats, setStats] = useState<ModuleStats | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [saForm, setSaForm] = useState({ name: "", email: "", password: "Admin@123" });

  const msg = (s: string) => { setMessage(s); setTimeout(() => setMessage(""), 4000); };

  async function loadStats() {
    try { const r = await apiClient.get("/ceo/module-stats"); setStats(r.data.data); }
    catch { /* ignore */ }
  }

  useEffect(() => { void loadStats(); }, []);

  async function createSuperAdmin() {
    if (!saForm.name || !saForm.email || !saForm.password) return msg("Name, email, and password required");
    setBusy(true);
    try {
      await apiClient.post("/ceo/create-super-admin", saForm);
      msg(`Super Admin "${saForm.name}" created`);
      setSaForm({ name: "", email: "", password: "Admin@123" });
    } catch (e: any) { msg(e?.response?.data?.message || "Could not create Super Admin"); }
    finally { setBusy(false); }
  }

  const sc = (label: string, value: number | string, icon: any, color: string) => (
    <div className="rounded-2xl border bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-2 ${color}`}>{icon}</div>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
      <p className="mt-2 text-xs font-bold text-slate-500">{label}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Super Admin Profile Card */}
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-600 via-orange-700 to-slate-950 text-white">
        <div className="p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Crown size={32} className="text-amber-200" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[.28em] text-amber-200">Super Admin</p>
              <h1 className="text-3xl font-black">{user?.name || "CEO"}</h1>
              <p className="mt-1 text-sm text-amber-100">{user?.email || "admin@adscale.com"}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-black ring-1 ring-white/20">Role: {user?.role?.name || "SUPER_ADMIN"}</span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-black ring-1 ring-white/20">Full System Access</span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-black ring-1 ring-white/20">Can Manage All Modules</span>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/10 px-8 py-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-100">
            <Shield size={16} />
            This dashboard is visible only to SUPER_ADMIN. You control every module, user, and setting.
          </div>
        </div>
      </section>

      {message && <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">{message}</div>}

      {/* System Stats — everything this SUPER_ADMIN controls */}
      {stats && (
        <section>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="text-amber-700" />
              <h2 className="text-lg font-black">System Overview — Everything You Control</h2>
            </div>
            <button onClick={loadStats} className="flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-black"><RefreshCcw size={14} /> Refresh</button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-6 lg:grid-cols-9">
            {sc("Users", stats.users, <UsersRound size={16} />, "bg-blue-50 text-blue-700")}
            {sc("Employees", stats.employees, <UsersRound size={16} />, "bg-violet-50 text-violet-700")}
            {sc("Projects", stats.projects, <FolderKanban size={16} />, "bg-indigo-50 text-indigo-700")}
            {sc("Tasks", stats.tasks, <CheckSquare size={16} />, "bg-emerald-50 text-emerald-700")}
            {sc("Tickets", stats.tickets, <Ticket size={16} />, "bg-rose-50 text-rose-700")}
            {sc("Clients", stats.clients, <UsersRound size={16} />, "bg-cyan-50 text-cyan-700")}
            {sc("Leads", stats.leads, <TrendingUp size={16} />, "bg-green-50 text-green-700")}
            {sc("Proposals", stats.proposals, <FileSignature size={16} />, "bg-amber-50 text-amber-700")}
            {sc("Contracts", stats.contracts, <FileSignature size={16} />, "bg-orange-50 text-orange-700")}
            {sc("Present", stats.presentToday, <CalendarCheck size={16} />, "bg-lime-50 text-lime-700")}
            {sc("On Leave", stats.onLeave, <Clock size={16} />, "bg-yellow-50 text-yellow-700")}
            {sc("Chat Rooms", stats.chats, <MessageCircle size={16} />, "bg-sky-50 text-sky-700")}
            {sc("Meetings", stats.meetings, <Video size={16} />, "bg-red-50 text-red-700")}
            {sc("Payroll", stats.payrolls, <IndianRupee size={16} />, "bg-pink-50 text-pink-700")}
            {sc("SEO", stats.seoProjects, <TrendingUp size={16} />, "bg-lime-50 text-lime-700")}
            {sc("Social", stats.socialPosts, <Share2 size={16} />, "bg-fuchsia-50 text-fuchsia-700")}
            {sc("Google Ads", stats.googleCampaigns, <Wallet size={16} />, "bg-blue-50 text-blue-700")}
            {sc("Meta Ads", stats.metaCampaigns, <Target size={16} />, "bg-indigo-50 text-indigo-700")}
          </div>
        </section>
      )}

      {/* Create Another Super Admin */}
      <section className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
        <div className="flex items-center gap-2">
          <UserPlus className="text-amber-700" />
          <h2 className="text-lg font-black text-amber-900">Grant Super Admin Access</h2>
        </div>
        <p className="mt-1 text-sm font-semibold text-amber-700">Create another SUPER_ADMIN with full system control.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <input className="w-full rounded-xl border border-amber-300 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-amber-500" value={saForm.name} onChange={e => setSaForm({ ...saForm, name: e.target.value })} placeholder="Full name" />
          <input className="w-full rounded-xl border border-amber-300 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-amber-500" value={saForm.email} onChange={e => setSaForm({ ...saForm, email: e.target.value })} placeholder="Email" />
          <input className="w-full rounded-xl border border-amber-300 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-amber-500" value={saForm.password} onChange={e => setSaForm({ ...saForm, password: e.target.value })} placeholder="Password" />
          <button disabled={busy} onClick={createSuperAdmin} className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-3 text-sm font-black text-white hover:bg-amber-800"><Crown size={17} /> Create Super Admin</button>
        </div>
        <p className="mt-3 text-xs font-semibold text-amber-600">The new SUPER_ADMIN can log in immediately and access every module.</p>
      </section>
    </div>
  );
}
