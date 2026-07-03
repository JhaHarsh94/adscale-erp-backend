import { useEffect, useState } from "react";
import { Search, FolderKanban, ChevronRight, Calendar, User, CheckCircle, AlertTriangle } from "lucide-react";
import { apiClient } from "../api/client";
import { getClientToken } from "../lib/clientAuth";
import type { ClientProject } from "../types/clientPortal";

const statusColors: Record<string, string> = {
  PLANNING: "text-blue-600 bg-blue-50",
  ACTIVE: "text-emerald-600 bg-emerald-50",
  ON_HOLD: "text-amber-600 bg-amber-50",
  COMPLETED: "text-green-600 bg-green-50",
  CANCELLED: "text-red-600 bg-red-50",
};

const healthIcons: Record<string, any> = {
  ON_TRACK: CheckCircle,
  AT_RISK: AlertTriangle,
  OFF_TRACK: AlertTriangle,
};

const healthColors: Record<string, string> = {
  ON_TRACK: "text-green-500",
  AT_RISK: "text-amber-500",
  OFF_TRACK: "text-red-500",
};

function ClientProjectsPage() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ClientProject | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const token = getClientToken();
        const res = await apiClient.get("/client-portal/projects", {
          headers: { Authorization: `Bearer ${token}` },
          params: { search: search || undefined },
        });
        setProjects(res.data.data || []);
      } catch { /* ignore */ } finally { setLoading(false); }
    }
    load();
  }, [search]);

  async function loadDetail(id: string) {
    try {
      const token = getClientToken();
      const res = await apiClient.get(`/client-portal/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelected(res.data.data);
    } catch { /* ignore */ }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
          <ChevronRight className="rotate-180" size={18} /> Back to Projects
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{selected.projectCode}</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">{selected.name}</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColors[selected.status] || "text-slate-600 bg-slate-50"}`}>
              {selected.status.replace(/_/g, " ")}
            </span>
          </div>

          {selected.description && (
            <p className="mt-4 text-sm text-slate-600">{selected.description}</p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-slate-400">Manager</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{selected.manager?.user.name || "Unassigned"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-slate-400">Progress</p>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${selected.progress}%` }} />
              </div>
              <p className="mt-1 text-xs font-bold text-slate-500">{selected.progress}%</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-slate-400">Timeline</p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                {selected.startDate ? new Date(selected.startDate).toLocaleDateString() : "N/A"} - {selected.endDate ? new Date(selected.endDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          {selected.milestones && selected.milestones.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-black text-slate-950">Milestones</h3>
              <div className="mt-3 space-y-2">
                {selected.milestones.map((m) => (
                  <div key={m.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${m.status === "COMPLETED" ? "bg-green-500" : m.status === "IN_PROGRESS" ? "bg-blue-500" : "bg-slate-300"}`} />
                      <p className="text-sm font-bold text-slate-900">{m.title}</p>
                    </div>
                    <p className="text-xs font-semibold text-slate-400">{m.dueDate ? new Date(m.dueDate).toLocaleDateString() : "No due date"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selected.timelines && selected.timelines.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-black text-slate-950">Recent Activity</h3>
              <div className="mt-3 space-y-2">
                {selected.timelines.map((t) => (
                  <div key={t.id} className="flex items-start gap-3 rounded-xl border border-slate-100 px-4 py-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.title}</p>
                      {t.details && <p className="text-xs text-slate-500">{t.details}</p>}
                      <p className="mt-1 text-[10px] font-semibold text-slate-400">{new Date(t.eventDate).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selected.members && selected.members.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-black text-slate-950">Team</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.members.map((m) => (
                  <div key={m.id} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                    <User size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">{m.employee.user.name}</span>
                    <span className="text-[10px] font-semibold text-slate-400">{m.role.replace(/_/g, " ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950">Projects</h2>
          <p className="mt-1 text-sm text-slate-500">Track your agency projects</p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-slate-400" />
        <input
          className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <FolderKanban size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-lg font-bold text-slate-500">No projects found</p>
          <p className="mt-1 text-sm text-slate-400">Projects will appear here once assigned.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => {
            const HealthIcon = healthIcons[project.health];
            return (
              <button
                key={project.id}
                onClick={() => loadDetail(project.id)}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md hover:border-emerald-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{project.projectCode}</p>
                    <h3 className="mt-1 text-lg font-black text-slate-950 truncate">{project.name}</h3>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusColors[project.status] || "text-slate-600 bg-slate-50"}`}>
                    {project.status.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={13} />
                    {project.endDate ? new Date(project.endDate).toLocaleDateString() : "No deadline"}
                  </div>
                  {HealthIcon && (
                    <div className={`flex items-center gap-1 ${healthColors[project.health] || "text-slate-400"}`}>
                      <HealthIcon size={13} />
                      {project.health.replace(/_/g, " ")}
                    </div>
                  )}
                </div>

                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                  <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${project.progress}%` }} />
                </div>
                <p className="mt-1 text-right text-[10px] font-bold text-slate-400">{project.progress}%</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ClientProjectsPage;
