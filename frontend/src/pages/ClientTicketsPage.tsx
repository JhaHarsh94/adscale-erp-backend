import { useEffect, useState } from "react";
import { Search, Ticket, Plus, ChevronRight, MessageCircle, Send, Clock, AlertCircle } from "lucide-react";
import { apiClient } from "../api/client";
import { getClientToken } from "../lib/clientAuth";
import type { ClientTicket } from "../types/clientPortal";

const priorityColors: Record<string, string> = {
  LOW: "text-slate-600 bg-slate-50",
  MEDIUM: "text-blue-600 bg-blue-50",
  HIGH: "text-amber-600 bg-amber-50",
  URGENT: "text-red-600 bg-red-50",
};

const statusColors: Record<string, string> = {
  OPEN: "text-blue-600 bg-blue-50",
  ASSIGNED: "text-purple-600 bg-purple-50",
  IN_PROGRESS: "text-amber-600 bg-amber-50",
  WAITING_ON_CLIENT: "text-orange-600 bg-orange-50",
  RESOLVED: "text-emerald-600 bg-emerald-50",
  CLOSED: "text-slate-600 bg-slate-50",
  ESCALATED: "text-red-600 bg-red-50",
};

const field = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-emerald-500";

function ClientTicketsPage() {
  const [tickets, setTickets] = useState<ClientTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<ClientTicket | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const token = getClientToken();
        const res = await apiClient.get("/client-portal/tickets", {
          headers: { Authorization: `Bearer ${token}` },
          params: { search: search || undefined },
        });
        setTickets(res.data.data || []);
      } catch { /* ignore */ } finally { setLoading(false); }
    }
    load();
  }, [search]);

  async function loadDetail(id: string) {
    try {
      const token = getClientToken();
      const res = await apiClient.get(`/client-portal/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelected(res.data.data);
    } catch { /* ignore */ }
  }

  async function createTicket(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) { setMessage("Title and description are required"); return; }
    setSubmitting(true);
    try {
      const token = getClientToken();
      await apiClient.post("/client-portal/tickets", { title, description, priority }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Ticket created successfully");
      setShowForm(false);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      const res = await apiClient.get("/client-portal/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.data || []);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to create ticket");
    } finally { setSubmitting(false); }
  }

  async function addComment() {
    if (!comment.trim() || !selected) return;
    try {
      const token = getClientToken();
      await apiClient.post(`/client-portal/tickets/${selected.id}/comments`, { body: comment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComment("");
      loadDetail(selected.id);
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
          <ChevronRight className="rotate-180" size={18} /> Back to Tickets
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{selected.ticketNumber}</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">{selected.title}</h2>
            </div>
            <div className="flex gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${priorityColors[selected.priority] || ""}`}>{selected.priority}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColors[selected.status] || ""}`}>{selected.status.replace(/_/g, " ")}</span>
            </div>
          </div>

          <p className="mt-4 whitespace-pre-wrap text-sm text-slate-600">{selected.description}</p>

          {selected.assignedTo && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <AlertCircle size={14} className="text-emerald-500" />
              Assigned to: <span className="font-bold text-slate-700">{selected.assignedTo.user.name}</span>
            </div>
          )}

          {selected.comments && selected.comments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-black text-slate-950">Comments ({selected.comments.length})</h3>
              <div className="mt-3 space-y-3">
                {selected.comments.map((c) => (
                  <div key={c.id} className={`rounded-xl border p-4 ${c.isInternal ? "border-amber-100 bg-amber-50" : "border-slate-100 bg-slate-50"}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-500">{c.author?.name || "You"} {c.isInternal && <span className="text-amber-600">(Internal)</span>}</p>
                      <p className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleString()}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <input
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-500"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addComment(); }}
            />
            <button onClick={addComment} className="rounded-xl bg-emerald-600 p-3 text-white hover:bg-emerald-700">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950">Tickets</h2>
          <p className="mt-1 text-sm text-slate-500">Raise and track support tickets</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700">
          <Plus size={18} /> New Ticket
        </button>
      </div>

      {showForm && (
        <form onSubmit={createTicket} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-950">Raise a New Ticket</h3>
          {message && <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">{message}</div>}
          <div className="mt-4 space-y-4">
            <input className={field} placeholder="Ticket Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea className={`${field} min-h-[100px] resize-y`} placeholder="Describe your issue in detail..." value={description} onChange={(e) => setDescription(e.target.value)} required />
            <select className={field} value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="URGENT">Urgent</option>
            </select>
            <button type="submit" disabled={submitting} className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-700 disabled:opacity-70">
              {submitting ? "Submitting..." : "Submit Ticket"}
            </button>
          </div>
        </form>
      )}

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-slate-400" />
        <input className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none" placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Ticket size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-lg font-bold text-slate-500">No tickets yet</p>
          <p className="mt-1 text-sm text-slate-400">Click "New Ticket" to raise your first support request.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <button key={ticket.id} onClick={() => loadDetail(ticket.id)} className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md hover:border-emerald-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{ticket.ticketNumber}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${priorityColors[ticket.priority] || ""}`}>{ticket.priority}</span>
                  </div>
                  <h3 className="mt-1 text-base font-black text-slate-950 truncate">{ticket.title}</h3>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusColors[ticket.status] || ""}`}>
                  {ticket.status.replace(/_/g, " ")}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-[10px] font-semibold text-slate-400">
                <span className="flex items-center gap-1"><Clock size={12} /> {new Date(ticket.createdAt).toLocaleDateString()}</span>
                {ticket.comments && ticket.comments.length > 0 && (
                  <span className="flex items-center gap-1"><MessageCircle size={12} /> {ticket.comments.length}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientTicketsPage;
