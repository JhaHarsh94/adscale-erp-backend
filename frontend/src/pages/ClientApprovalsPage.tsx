import { useEffect, useState } from "react";
import { Shield, CheckCircle, XCircle, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { apiClient } from "../api/client";
import { getClientToken } from "../lib/clientAuth";
import type { ClientApproval } from "../types/clientPortal";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const statusColors: Record<string, string> = {
  PENDING: "text-amber-600 bg-amber-50",
  IN_REVIEW: "text-blue-600 bg-blue-50",
  APPROVED: "text-emerald-600 bg-emerald-50",
  REVISIONS_REQUESTED: "text-orange-600 bg-orange-50",
  REJECTED: "text-red-600 bg-red-50",
  CANCELLED: "text-slate-600 bg-slate-50",
};

const typeLabels: Record<string, string> = {
  DESIGN: "Design",
  VIDEO: "Video",
  WEBSITE: "Website",
  CONTENT: "Content",
  REPORT: "Report",
  CAMPAIGN: "Campaign",
  PROPOSAL: "Proposal",
  OTHER: "Other",
};

function ClientApprovalsPage() {
  const [approvals, setApprovals] = useState<ClientApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [rejectComment, setRejectComment] = useState("");
  const [rejectId, setRejectId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const token = getClientToken();
        const res = await apiClient.get("/client-portal/approvals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApprovals(res.data.data || []);
      } catch { /* ignore */ } finally { setLoading(false); }
    }
    load();
  }, []);

  async function handleApprove(id: string) {
    try {
      const token = getClientToken();
      await apiClient.put(`/client-portal/approvals/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Approved successfully");
      const res = await apiClient.get("/client-portal/approvals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApprovals(res.data.data || []);
    } catch { setMessage("Failed to approve"); }
  }

  async function handleReject(id: string) {
    if (!rejectComment.trim()) { setMessage("Please provide revision feedback"); return; }
    try {
      const token = getClientToken();
      await apiClient.put(`/client-portal/approvals/${id}/reject`, { comments: rejectComment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Revisions requested");
      setRejectId(null);
      setRejectComment("");
      const res = await apiClient.get("/client-portal/approvals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApprovals(res.data.data || []);
    } catch { setMessage("Failed to request revisions"); }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-950">Approvals</h2>
        <p className="mt-1 text-sm text-slate-500">Review and approve work submitted by your agency</p>
      </div>

      {message && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">{message}</div>
      )}

      {approvals.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Shield size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-lg font-bold text-slate-500">No approvals pending</p>
          <p className="mt-1 text-sm text-slate-400">Work submitted for your review will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {approvals.filter((a) => a.status === "PENDING" || a.status === "IN_REVIEW" || a.status === "REVISIONS_REQUESTED").map((approval) => (
            <div key={approval.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{typeLabels[approval.type] || approval.type}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusColors[approval.status] || ""}`}>
                      {approval.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-black text-slate-950">{approval.title}</h3>
                  {approval.description && <p className="mt-1 text-sm text-slate-600">{approval.description}</p>}
                  {approval.createdBy && (
                    <p className="mt-2 text-xs font-semibold text-slate-400">Submitted by {approval.createdBy.name}</p>
                  )}
                </div>
              </div>

              {approval.files.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {approval.files.map((file) => (
                    <a
                      key={file.id}
                      href={file.fileUrl.startsWith("http") ? file.fileUrl : `${API_BASE}${file.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      <Eye size={14} /> {file.fileName}
                    </a>
                  ))}
                </div>
              )}

              {(approval.status === "PENDING" || approval.status === "IN_REVIEW") && (
                <div className="mt-4 flex items-center gap-3">
                  <button onClick={() => handleApprove(approval.id)} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700">
                    <ThumbsUp size={14} /> Approve
                  </button>
                  <button onClick={() => setRejectId(rejectId === approval.id ? null : approval.id)} className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-black text-red-600 hover:bg-red-50">
                    <ThumbsDown size={14} /> Request Changes
                  </button>
                </div>
              )}

              {rejectId === approval.id && (
                <div className="mt-4 space-y-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
                  <textarea
                    className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-orange-500"
                    rows={3}
                    placeholder="Describe what changes are needed..."
                    value={rejectComment}
                    onChange={(e) => setRejectComment(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleReject(approval.id)} className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-black text-white hover:bg-orange-700">Submit Feedback</button>
                    <button onClick={() => { setRejectId(null); setRejectComment(""); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-50">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {approvals.filter((a) => a.status === "APPROVED" || a.status === "REJECTED" || a.status === "CANCELLED").length > 0 && (
            <div>
              <h3 className="text-lg font-black text-slate-950 mt-8 mb-4">History</h3>
              {approvals.filter((a) => a.status === "APPROVED" || a.status === "REJECTED" || a.status === "CANCELLED").map((approval) => (
                <div key={approval.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mb-3">
                  <div className="flex items-center gap-3">
                    {approval.status === "APPROVED" ? <CheckCircle size={18} className="text-emerald-500" /> : <XCircle size={18} className="text-red-500" />}
                    <div>
                      <p className="text-sm font-bold text-slate-900">{approval.title}</p>
                      <p className="text-[10px] font-semibold text-slate-400">{typeLabels[approval.type] || approval.type}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusColors[approval.status] || ""}`}>
                    {approval.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientApprovalsPage;
