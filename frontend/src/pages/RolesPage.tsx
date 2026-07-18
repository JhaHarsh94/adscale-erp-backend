import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { Pencil, Plus, Trash2, X, Loader2, ShieldCheck, KeyRound, UserRound } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description?: string | null;
  _count?: { users: number; permissions: number };
  permissions?: { id: string; name: string; module: string; action: string }[];
}

interface Permission {
  id: string;
  name: string;
  module: string;
  action: string;
}

const MODULES = [
  "AUTH", "USERS", "ROLES", "PERMISSIONS", "DEPARTMENTS", "DESIGNATIONS",
  "TEAMS", "EMPLOYEES", "ATTENDANCE", "LEAVES", "CRM", "COMMERCIAL",
  "PROJECTS", "TICKETS", "TASKS", "WORKLOGS", "APPROVALS", "FILES",
  "CHAT", "MEETINGS", "KNOWLEDGE_BASE", "HRMS", "PAYROLL", "RECRUITMENT",
  "CLIENT_PORTAL", "SEO", "SOCIAL_MEDIA", "GOOGLE_ADS", "META_ADS",
  "DASHBOARD", "NOTIFICATIONS", "SETTINGS",
];



function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Role | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [r, p] = await Promise.all([
        apiClient.get("/roles"),
        apiClient.get("/permissions"),
      ]);
      setRoles(r.data.data || []);
      setPermissions(p.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setForm({ name: "", description: "" });
    setSelectedPerms([]);
    setShowModal(true);
  }

  function openEdit(role: Role) {
    setEditing(role);
    setForm({ name: role.name, description: role.description || "" });
    setSelectedPerms(role.permissions?.map((p) => p.id) || []);
    setShowModal(true);
  }

  async function handleSave() {
    setSubmitting(true);
    try {
      if (editing) {
        await apiClient.put(`/roles/${editing.id}`, form);
        await apiClient.put(`/roles/${editing.id}/permissions`, { permissionIds: selectedPerms });
      } else {
        await apiClient.post("/roles", form);
      }
      setShowModal(false);
      load();
    } catch { } finally { setSubmitting(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this role? Users assigned to it must be reassigned first.")) return;
    try {
      await apiClient.delete(`/roles/${id}`);
      load();
    } catch { }
  }

  if (loading) {
    return (
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-sm font-bold text-slate-500">
        Loading roles...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Role Management</h1>
          <p className="mt-1 text-sm text-slate-500">Manage roles and their permissions</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-blue-700">
          <Plus size={18} />
          Create Role
        </button>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="absolute right-3 top-3 hidden gap-1 group-hover:flex">
              <button onClick={() => openEdit(role)} className="rounded-lg bg-blue-100 p-1.5 text-blue-600 hover:bg-blue-200">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(role.id)} className="rounded-lg bg-red-100 p-1.5 text-red-600 hover:bg-red-200">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg">
              <KeyRound size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-950">{role.name.replace("_", " ")}</h3>
            {role.description && <p className="mt-1 text-sm text-slate-500">{role.description}</p>}
            <div className="mt-4 flex gap-4 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-1.5">
                <UserRound size={14} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-600">{role._count?.users || 0} users</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-600">{role._count?.permissions || 0} permissions</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-950">{editing ? "Edit Role" : "Create Role"}</h3>
              <button onClick={() => setShowModal(false)} className="rounded-xl bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-600">Role Name *</label>
                <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none focus:border-blue-400 uppercase" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. EDITOR" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-600">Description</label>
                <textarea className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none focus:border-blue-400" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What this role can do..." />
              </div>

              {editing && (
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-600">Permissions</label>
                  <div className="max-h-64 space-y-1 overflow-y-auto rounded-xl border border-slate-200 p-3">
                    {MODULES.map((module) => {
                      const modulePerms = permissions.filter((p) => p.module === module);
                      if (!modulePerms.length) return null;
                      return (
                        <div key={module}>
                          <p className="text-xs font-black text-slate-700 uppercase">{module.replace("_", " ")}</p>
                          <div className="ml-2 mt-1 mb-2 flex flex-wrap gap-1.5">
                            {modulePerms.map((perm) => (
                              <label key={perm.id} className={`flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-bold transition ${selectedPerms.includes(perm.id) ? "border-blue-400 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                                <input type="checkbox" checked={selectedPerms.includes(perm.id)} onChange={() => setSelectedPerms((prev) => prev.includes(perm.id) ? prev.filter((id) => id !== perm.id) : [...prev, perm.id])} className="sr-only" />
                                {perm.action}
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <button disabled={submitting || !form.name.trim()} onClick={handleSave} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-50">
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {editing ? "Update Role" : "Create Role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RolesPage;
