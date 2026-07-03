import { useEffect, useState } from "react";
import { UsersRound, Plus, Search, Mail, Phone, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { apiClient } from "../api/client";

interface ClientUser {
  id: string;
  clientId: string;
  name: string;
  email: string;
  phone: string | null;
  isActive: boolean;
  lastLogin: string | null;
  client: { id: string; name: string };
  portalAccess: {
    canViewProjects: boolean;
    canRaiseTickets: boolean;
    canDownloadFiles: boolean;
    canApproveWork: boolean;
    canViewMeetings: boolean;
  } | null;
  _count: { notifications: number; activityLogs: number };
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
  email: string | null;
}

const field = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-blue-500";

function ClientUsersPage() {
  const [users, setUsers] = useState<ClientUser[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    clientId: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    Promise.all([loadUsers(), loadClients()]);
  }, []);

  async function loadUsers() {
    try {
      const res = await apiClient.get("/client-portal/admin/users");
      setUsers(res.data.data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }

  async function loadClients() {
    try {
      const res = await apiClient.get("/crm/clients");
      setClients(res.data.data || []);
    } catch { /* ignore */ }
  }

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    if (!form.clientId || !form.name || !form.email || !form.password) {
      setMessage("Client, name, email and password are required");
      return;
    }
    try {
      await apiClient.post("/client-portal/admin/create", form);
      setMessage("Client user created successfully");
      setShowForm(false);
      setForm({ clientId: "", name: "", email: "", phone: "", password: "" });
      loadUsers();
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to create client user");
    }
  }

  const filtered = users.filter((u) =>
    `${u.name} ${u.email} ${u.client.name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-950 p-8 text-white shadow-2xl shadow-emerald-100">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-100">Client Portal</p>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">Client Users</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50">Manage client portal accounts and access permissions.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/20">
            <p className="text-sm font-bold text-emerald-100">Total Users</p>
            <p className="mt-2 text-5xl font-black">{loading ? "..." : users.length}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700"><UsersRound size={24} /></div>
            <div><h2 className="text-xl font-black text-slate-950">All Client Users</h2><p className="text-sm font-semibold text-slate-500">Portal accounts with client access</p></div>
          </div>
          <button onClick={() => { setShowForm(true); setMessage(""); }} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700">
            <Plus size={18} /> Add Client User
          </button>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email or company..." className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none" />
        </div>
      </section>

      {showForm && (
        <section className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <form onSubmit={handleCreate} className="space-y-4">
            <h3 className="text-lg font-black text-slate-950">Create Client Portal Account</h3>
            {message && (
              <div className={`rounded-xl border px-4 py-3 text-sm font-bold ${message.includes("success") ? "border-emerald-100 bg-emerald-100 text-emerald-700" : "border-red-100 bg-red-50 text-red-600"}`}>
                {message}
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <select className={field} value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} required>
                <option value="">Select Client *</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name} {c.email ? `(${c.email})` : ""}</option>)}
              </select>
              <input className={field} placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className={field} placeholder="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className={field} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <div className="relative">
                <input className={field} placeholder="Password *" type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-slate-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-700">Create Account</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </section>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <UsersRound size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-lg font-bold text-slate-500">No client users yet</p>
          <p className="mt-1 text-sm text-slate-400">Click "Add Client User" to create portal accounts for your clients.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((user) => (
            <div key={user.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-black text-emerald-700">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-950">{user.name}</h3>
                    <p className="text-sm font-semibold text-emerald-600">{user.client.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
                      <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                      {user.phone && <span className="flex items-center gap-1"><Phone size={12} /> {user.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.isActive ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600"><CheckCircle size={12} /> Active</span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600"><XCircle size={12} /> Inactive</span>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-semibold text-slate-400">
                <span>Created: {new Date(user.createdAt).toLocaleDateString()}</span>
                <span>Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</span>
                <span>Notifications: {user._count.notifications}</span>
                <span>Activities: {user._count.activityLogs}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientUsersPage;
