import { useEffect, useState } from "react";
import { FolderKanban, Ticket, Folder, Shield, ClipboardList, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { apiClient } from "../api/client";
import { getClientToken } from "../lib/clientAuth";
import type { ClientDashboardData } from "../types/clientPortal";

function ClientDashboardPage() {
  const [data, setData] = useState<ClientDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = getClientToken();
        const res = await apiClient.get("/client-portal/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  const cards = [
    { label: "Total Projects", value: data?.totalProjects || 0, icon: FolderKanban, color: "text-blue-600 bg-blue-50" },
    { label: "Active Projects", value: data?.activeProjects || 0, icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    { label: "Completed Projects", value: data?.completedProjects || 0, icon: CheckCircle, color: "text-green-600 bg-green-50" },
    { label: "Open Tickets", value: data?.openTickets || 0, icon: Ticket, color: "text-amber-600 bg-amber-50" },
    { label: "Resolved Tickets", value: data?.resolvedTickets || 0, icon: CheckCircle, color: "text-teal-600 bg-teal-50" },
    { label: "Files", value: data?.totalFiles || 0, icon: Folder, color: "text-purple-600 bg-purple-50" },
    { label: "Pending Approvals", value: data?.pendingApprovals || 0, icon: Shield, color: "text-orange-600 bg-orange-50" },
    { label: "Upcoming Meetings", value: data?.upcomingMeetings || 0, icon: ClipboardList, color: "text-rose-600 bg-rose-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-950">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">Overview of your agency projects and activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-2.5 ${card.color}`}>
                  <Icon size={22} />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black text-slate-950">{card.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-950">Quick Actions</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a href="/client/tickets" className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200">
              <Ticket size={20} className="mx-auto mb-2" />
              Raise a Ticket
            </a>
            <a href="/client/projects" className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200">
              <FolderKanban size={20} className="mx-auto mb-2" />
              View Projects
            </a>
            <a href="/client/approvals" className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200">
              <Shield size={20} className="mx-auto mb-2" />
              Approve Work
            </a>
            <a href="/client/files" className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200">
              <Folder size={20} className="mx-auto mb-2" />
              Download Files
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-950">Project Summary</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600"><TrendingUp size={18} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Active</p>
                  <p className="text-xs text-slate-500">In progress</p>
                </div>
              </div>
              <p className="text-2xl font-black text-blue-600">{data?.activeProjects || 0}</p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><CheckCircle size={18} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Completed</p>
                  <p className="text-xs text-slate-500">Delivered</p>
                </div>
              </div>
              <p className="text-2xl font-black text-emerald-600">{data?.completedProjects || 0}</p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-50 p-2 text-amber-600"><Clock size={18} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Open Tickets</p>
                  <p className="text-xs text-slate-500">Awaiting response</p>
                </div>
              </div>
              <p className="text-2xl font-black text-amber-600">{data?.openTickets || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboardPage;
