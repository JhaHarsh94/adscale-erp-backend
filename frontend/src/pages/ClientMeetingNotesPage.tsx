import { useEffect, useState } from "react";
import { ClipboardList, Calendar, User, ChevronRight, FileText, CheckCircle, Clock } from "lucide-react";
import { apiClient } from "../api/client";
import { getClientToken } from "../lib/clientAuth";
import type { ClientMeeting } from "../types/clientPortal";

const statusColors: Record<string, string> = {
  SCHEDULED: "text-blue-600 bg-blue-50",
  IN_PROGRESS: "text-amber-600 bg-amber-50",
  COMPLETED: "text-emerald-600 bg-emerald-50",
  CANCELLED: "text-slate-600 bg-slate-50",
};

function ClientMeetingNotesPage() {
  const [meetings, setMeetings] = useState<ClientMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ClientMeeting | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const token = getClientToken();
        const res = await apiClient.get("/client-portal/meetings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeetings(res.data.data || []);
      } catch { /* ignore */ } finally { setLoading(false); }
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

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
          <ChevronRight className="rotate-180" size={18} /> Back to Meetings
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">{selected.title}</h2>
              {selected.description && <p className="mt-2 text-sm text-slate-600">{selected.description}</p>}
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColors[selected.status] || ""}`}>{selected.status.replace(/_/g, " ")}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(selected.meetingDate).toLocaleDateString()}</span>
            {selected.startTime && <span className="flex items-center gap-1"><Clock size={14} /> {new Date(selected.startTime).toLocaleTimeString()}</span>}
            {selected.createdBy && <span className="flex items-center gap-1"><User size={14} /> {selected.createdBy.name}</span>}
          </div>

          {selected.agendaItems.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-black text-slate-950">Agenda</h3>
              <div className="mt-3 space-y-2">
                {selected.agendaItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      {item.description && <p className="text-xs text-slate-500">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selected.minutes && (
            <div className="mt-6">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-950">
                <FileText size={18} className="text-emerald-500" /> Minutes of Meeting
              </h3>
              <div className="mt-3 whitespace-pre-wrap rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
                {selected.minutes.content}
              </div>
            </div>
          )}

          {selected.actionItems.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-black text-slate-950">Action Items</h3>
              <div className="mt-3 space-y-2">
                {selected.actionItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.status === "COMPLETED" ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                      )}
                      <div>
                        <p className={`text-sm font-bold ${item.status === "COMPLETED" ? "text-slate-400 line-through" : "text-slate-900"}`}>
                          {item.description}
                        </p>
                        {item.assignedTo && (
                          <p className="text-[10px] font-semibold text-slate-400">Assigned to: {item.assignedTo.user.name}</p>
                        )}
                      </div>
                    </div>
                    {item.dueDate && (
                      <p className="text-[10px] font-semibold text-slate-400">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                    )}
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
      <div>
        <h2 className="text-2xl font-black text-slate-950">Meeting Notes</h2>
        <p className="mt-1 text-sm text-slate-500">Review meeting agendas, minutes, and action items</p>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <ClipboardList size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-lg font-bold text-slate-500">No meetings yet</p>
          <p className="mt-1 text-sm text-slate-400">Meeting notes will appear here once available.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map((meeting) => (
            <button
              key={meeting.id}
              onClick={() => setSelected(meeting)}
              className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md hover:border-emerald-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black text-slate-950 truncate">{meeting.title}</h3>
                  {meeting.description && <p className="mt-1 text-sm text-slate-500 line-clamp-2">{meeting.description}</p>}
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusColors[meeting.status] || ""}`}>
                  {meeting.status.replace(/_/g, " ")}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-semibold text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(meeting.meetingDate).toLocaleDateString()}</span>
                {meeting.agendaItems.length > 0 && (
                  <span className="flex items-center gap-1"><FileText size={12} /> {meeting.agendaItems.length} agenda items</span>
                )}
                {meeting.actionItems.length > 0 && (
                  <span className="flex items-center gap-1"><CheckCircle size={12} /> {meeting.actionItems.filter((a) => a.status === "COMPLETED").length}/{meeting.actionItems.length} done</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientMeetingNotesPage;
