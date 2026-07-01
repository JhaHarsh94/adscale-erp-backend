import { useEffect, useState } from "react";
import { Plus, RefreshCcw, XCircle, Trash2, Star, TrendingUp, AlertTriangle, CheckCircle, Save, Briefcase, StickyNote, User } from "lucide-react";
import { apiClient } from "../api/client";
import type { PerformanceReview, Appraisal, Promotion, Warning, HrNote, HrmsDashboard } from "../types/hrms";

const field = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-blue-500";

const ratingLabel: Record<string, string> = { ONE: "1", TWO: "2", THREE: "3", FOUR: "4", FIVE: "5" };

const tabs = [
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "appraisals", label: "Appraisals", icon: TrendingUp },
  { key: "promotions", label: "Promotions", icon: Briefcase },
  { key: "warnings", label: "Warnings", icon: AlertTriangle },
  { key: "hr-notes", label: "HR Notes", icon: StickyNote },
  { key: "lifecycle", label: "Lifecycle", icon: User },
];

export default function HrmsPage() {
  const [dashboard, setDashboard] = useState<HrmsDashboard | null>(null);
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);
  const [activeTab, setActiveTab] = useState("reviews");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [warningsList, setWarningsList] = useState<Warning[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [hrNotes, setHrNotes] = useState<HrNote[]>([]);
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [lifecycle, setLifecycle] = useState<any>(null);
  const [noteForm, setNoteForm] = useState({ employeeId: "", note: "", isPrivate: false });

  const blankReview = { employeeId: "", reviewerId: "", reviewDate: "", rating: "THREE", feedback: "", goals: "", strengths: "", improvements: "" };
  const blankAppraisal = { employeeId: "", reviewerId: "", reviewDate: "", rating: "THREE", currentCtc: "", newCtc: "", comments: "", effectiveDate: "" };
  const blankPromotion = { employeeId: "", fromDesignation: "", toDesignation: "", fromSalary: "", toSalary: "", effectiveDate: "", reason: "" };
  const blankWarning = { employeeId: "", type: "VERBAL", title: "", description: "", issuedDate: "", notes: "" };

  const [reviewForm, setReviewForm] = useState(blankReview);
  const [appraisalForm, setAppraisalForm] = useState(blankAppraisal);
  const [promotionForm, setPromotionForm] = useState(blankPromotion);
  const [warningForm, setWarningForm] = useState(blankWarning);

  useEffect(() => { void loadEmployees(); }, []);

  async function loadEmployees() {
    try {
      const res = await apiClient.get("/employees");
      setEmployees((res.data.data || []).map((e: any) => ({ id: e.id, name: e.user?.name || e.employeeCode })));
    } catch {}
  }

  async function load() {
    try {
      const [dash, revs, apps, proms, warns] = await Promise.all([
        apiClient.get("/hrms/dashboard"),
        apiClient.get("/hrms/reviews"),
        apiClient.get("/hrms/appraisals"),
        apiClient.get("/hrms/promotions"),
        apiClient.get("/hrms/warnings"),
      ]);
      setDashboard(dash.data.data);
      setReviews(revs.data.data || []);
      setAppraisals(apps.data.data || []);
      setPromotions(proms.data.data || []);
      setWarningsList(warns.data.data || []);
    } catch { setMessage("Unable to load HRMS data"); }
  }
  useEffect(() => { void load(); }, []);

  async function createReview() {
    try {
      if (!reviewForm.employeeId || !reviewForm.reviewDate) { setMessage("Employee and date required"); return; }
      await apiClient.post("/hrms/reviews", { ...reviewForm, reviewerId: reviewForm.reviewerId || undefined });
      setMessage("Review created"); setShowForm(false); setReviewForm(blankReview); void load();
    } catch { setMessage("Failed"); }
  }

  async function createAppraisal() {
    try {
      if (!appraisalForm.employeeId || !appraisalForm.reviewDate) { setMessage("Employee and date required"); return; }
      await apiClient.post("/hrms/appraisals", { ...appraisalForm, currentCtc: appraisalForm.currentCtc ? Number(appraisalForm.currentCtc) : undefined, newCtc: appraisalForm.newCtc ? Number(appraisalForm.newCtc) : undefined });
      setMessage("Appraisal created"); setShowForm(false); setAppraisalForm(blankAppraisal); void load();
    } catch { setMessage("Failed"); }
  }

  async function createPromotion() {
    try {
      if (!promotionForm.employeeId || !promotionForm.effectiveDate) { setMessage("Employee and date required"); return; }
      await apiClient.post("/hrms/promotions", { ...promotionForm, fromSalary: promotionForm.fromSalary ? Number(promotionForm.fromSalary) : undefined, toSalary: promotionForm.toSalary ? Number(promotionForm.toSalary) : undefined });
      setMessage("Promotion created"); setShowForm(false); setPromotionForm(blankPromotion); void load();
    } catch { setMessage("Failed"); }
  }

  async function createWarning() {
    try {
      if (!warningForm.employeeId || !warningForm.title || !warningForm.issuedDate) { setMessage("Employee, title, and date required"); return; }
      await apiClient.post("/hrms/warnings", warningForm);
      setMessage("Warning created"); setShowForm(false); setWarningForm(blankWarning); void load();
    } catch { setMessage("Failed"); }
  }

  async function loadHrNotes(employeeId: string) {
    try {
      setSelectedEmpId(employeeId);
      const res = await apiClient.get(`/hrms/hr-notes?employeeId=${employeeId}`);
      setHrNotes(res.data.data || []);
    } catch { setMessage("Failed to load HR notes"); }
  }

  async function createHrNote() {
    try {
      if (!noteForm.employeeId || !noteForm.note) { setMessage("Employee and note required"); return; }
      await apiClient.post("/hrms/hr-notes", noteForm);
      setMessage("Note created"); setNoteForm({ employeeId: "", note: "", isPrivate: false });
      if (noteForm.employeeId) void loadHrNotes(noteForm.employeeId);
    } catch { setMessage("Failed"); }
  }

  async function loadLifecycle(employeeId: string) {
    try {
      setSelectedEmpId(employeeId);
      const res = await apiClient.get(`/hrms/employees/${employeeId}/lifecycle`);
      setLifecycle(res.data.data);
    } catch { setMessage("Failed to load employee lifecycle"); }
  }

  async function remove(endpoint: string, id: string) {
    try { await apiClient.delete(`/hrms/${endpoint}/${id}`); setMessage("Deleted"); void load(); } catch { setMessage("Failed"); }
  }

  async function resolveWarning(id: string) {
    try { await apiClient.put(`/hrms/warnings/${id}`, { status: "RESOLVED" }); setMessage("Warning resolved"); void load(); } catch { setMessage("Failed"); }
  }

  async function acknowledgeAppraisal(id: string) {
    try { await apiClient.put(`/hrms/appraisals/${id}`, { status: "ACKNOWLEDGED" }); setMessage("Appraisal acknowledged"); void load(); } catch { setMessage("Failed"); }
  }

  const cards = [
    { label: "Reviews", value: dashboard?.totalReviews || 0, icon: Star },
    { label: "Appraisals", value: dashboard?.totalAppraisals || 0, icon: TrendingUp },
    { label: "Promotions", value: dashboard?.totalPromotions || 0, icon: Briefcase },
    { label: "Warnings", value: dashboard?.totalWarnings || 0, icon: AlertTriangle, color: "text-red-600" },
  ];

  const currentForm: any = activeTab === "reviews" ? reviewForm : activeTab === "appraisals" ? appraisalForm : activeTab === "promotions" ? promotionForm : activeTab === "warnings" ? warningForm : noteForm;
  const setForm: any = activeTab === "reviews" ? setReviewForm : activeTab === "appraisals" ? setAppraisalForm : activeTab === "promotions" ? setPromotionForm : activeTab === "warnings" ? setWarningForm : setNoteForm;
  const createFn = activeTab === "reviews" ? createReview : activeTab === "appraisals" ? createAppraisal : activeTab === "promotions" ? createPromotion : activeTab === "warnings" ? createWarning : createHrNote;

  return (
    <div className="space-y-4 md:space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-rose-700 via-pink-800 to-slate-950 p-6 md:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[.28em] text-rose-200">Phase 18</p>
            <h1 className="mt-3 text-2xl md:text-4xl font-black">HRMS</h1>
            <p className="mt-2 text-xs md:text-sm text-rose-100">Performance reviews, appraisals, promotions, warnings & employee lifecycle.</p>
          </div>
          <button onClick={load} className="rounded-xl bg-white/10 p-2.5 md:p-3"><RefreshCcw size={18} /></button>
        </div>
      </section>

      {message && (
        <div className="rounded-xl bg-blue-50 p-3 md:p-4 text-xs md:text-sm font-bold text-blue-800 flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="text-blue-400 hover:text-blue-700"><XCircle size={16} /></button>
        </div>
      )}

      <section className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border bg-white p-3 md:p-4">
              <Icon className={card.color || "text-rose-700"} size={18} />
              <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{card.label}</p>
              <p className={`mt-0.5 md:mt-1 text-xl md:text-2xl font-black ${card.color || "text-slate-900"}`}>{card.value}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border bg-white p-4 md:p-6">
        <div className="flex items-center border-b border-slate-100 mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => { setActiveTab(tab.key); setShowForm(false); }} className={`flex items-center gap-1.5 px-4 py-3 text-xs font-black border-b-2 transition ${activeTab === tab.key ? "border-rose-600 text-rose-700" : "border-transparent text-slate-400 hover:text-slate-700"}`}>
                <Icon size={14} />{tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black capitalize">{activeTab}</h2>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 rounded-xl bg-rose-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New</button>
        </div>

        {showForm && (
          <div className="mb-4 space-y-3 rounded-2xl border border-rose-100 bg-rose-50 p-4">
            <h3 className="font-black text-rose-800 capitalize">New {activeTab.slice(0, -1)}</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <select className={field} value={currentForm.employeeId} onChange={(e) => setForm({ ...currentForm, employeeId: e.target.value })}>
                <option value="">Select employee *</option>
                {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
              <input className={field} type="date" value={currentForm.reviewDate || currentForm.effectiveDate || currentForm.issuedDate || ""} onChange={(e) => {
                const key = activeTab === "promotions" ? "effectiveDate" : activeTab === "warnings" ? "issuedDate" : "reviewDate";
                setForm({ ...currentForm, [key]: e.target.value });
              }} />

              {activeTab === "reviews" && (
                <>
                  <select className={field} value={currentForm.reviewerId} onChange={(e) => setForm({ ...currentForm, reviewerId: e.target.value })}>
                    <option value="">Reviewer (optional)</option>
                    {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                  <select className={field} value={currentForm.rating} onChange={(e) => setForm({ ...currentForm, rating: e.target.value })}>
                    <option value="ONE">1 - Poor</option><option value="TWO">2 - Below Avg</option><option value="THREE">3 - Satisfactory</option><option value="FOUR">4 - Good</option><option value="FIVE">5 - Excellent</option>
                  </select>
                  <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Feedback" value={currentForm.feedback} onChange={(e) => setForm({ ...currentForm, feedback: e.target.value })} />
                  <textarea className={`${field} min-h-[60px]`} placeholder="Goals" value={currentForm.goals} onChange={(e) => setForm({ ...currentForm, goals: e.target.value })} />
                  <textarea className={`${field} min-h-[60px]`} placeholder="Strengths" value={currentForm.strengths} onChange={(e) => setForm({ ...currentForm, strengths: e.target.value })} />
                  <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Areas for improvement" value={currentForm.improvements} onChange={(e) => setForm({ ...currentForm, improvements: e.target.value })} />
                </>
              )}

              {activeTab === "appraisals" && (
                <>
                  <select className={field} value={currentForm.reviewerId} onChange={(e) => setForm({ ...currentForm, reviewerId: e.target.value })}>
                    <option value="">Reviewer (optional)</option>
                    {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                  <select className={field} value={currentForm.rating} onChange={(e) => setForm({ ...currentForm, rating: e.target.value })}>
                    <option value="ONE">1</option><option value="TWO">2</option><option value="THREE">3</option><option value="FOUR">4</option><option value="FIVE">5</option>
                  </select>
                  <input className={field} type="number" placeholder="Current CTC" value={currentForm.currentCtc} onChange={(e) => setForm({ ...currentForm, currentCtc: e.target.value })} />
                  <input className={field} type="number" placeholder="New CTC" value={currentForm.newCtc} onChange={(e) => setForm({ ...currentForm, newCtc: e.target.value })} />
                  <input className={field} type="date" placeholder="Effective date" value={currentForm.effectiveDate} onChange={(e) => setForm({ ...currentForm, effectiveDate: e.target.value })} />
                  <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Comments" value={currentForm.comments} onChange={(e) => setForm({ ...currentForm, comments: e.target.value })} />
                </>
              )}

              {activeTab === "promotions" && (
                <>
                  <input className={field} placeholder="From designation" value={currentForm.fromDesignation} onChange={(e) => setForm({ ...currentForm, fromDesignation: e.target.value })} />
                  <input className={field} placeholder="To designation" value={currentForm.toDesignation} onChange={(e) => setForm({ ...currentForm, toDesignation: e.target.value })} />
                  <input className={field} type="number" placeholder="From salary" value={currentForm.fromSalary} onChange={(e) => setForm({ ...currentForm, fromSalary: e.target.value })} />
                  <input className={field} type="number" placeholder="To salary" value={currentForm.toSalary} onChange={(e) => setForm({ ...currentForm, toSalary: e.target.value })} />
                  <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Reason" value={currentForm.reason} onChange={(e) => setForm({ ...currentForm, reason: e.target.value })} />
                </>
              )}

              {activeTab === "warnings" && (
                <>
                  <input className={field} placeholder="Title *" value={currentForm.title} onChange={(e) => setForm({ ...currentForm, title: e.target.value })} />
                  <select className={field} value={currentForm.type} onChange={(e) => setForm({ ...currentForm, type: e.target.value })}>
                    <option value="VERBAL">Verbal</option><option value="WRITTEN">Written</option><option value="FINAL">Final</option>
                  </select>
                  <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Description" value={currentForm.description} onChange={(e) => setForm({ ...currentForm, description: e.target.value })} />
                  <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Notes" value={currentForm.notes} onChange={(e) => setForm({ ...currentForm, notes: e.target.value })} />
                </>
              )}
            </div>
            <button onClick={createFn} className="rounded-xl bg-rose-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
          </div>
        )}

        {/* Tab content */}
        <div className="space-y-2">
          {activeTab === "reviews" && reviews.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No reviews yet</p>}
          {activeTab === "reviews" && reviews.map((r) => (
            <div key={r.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-amber-500" />
                    <span className="font-black">{r.employee?.user.name || "Unknown"}</span>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-black text-amber-700">{ratingLabel[r.rating]}/5</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{new Date(r.reviewDate).toLocaleDateString()}{r.reviewer ? ` reviewed by ${r.reviewer.user.name}` : ""}</p>
                  {r.feedback && <p className="mt-2 text-sm text-slate-700">{r.feedback}</p>}
                </div>
                <button onClick={() => remove("reviews", r.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}

          {activeTab === "appraisals" && appraisals.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No appraisals yet</p>}
          {activeTab === "appraisals" && appraisals.map((a) => (
            <div key={a.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <TrendingUp size={14} className="text-blue-500" />
                    <span className="font-black">{a.employee?.user.name || "Unknown"}</span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-black text-blue-700">{ratingLabel[a.rating]}/5</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${a.status === "ACKNOWLEDGED" ? "bg-green-50 text-green-700" : a.status === "SUBMITTED" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{a.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{new Date(a.reviewDate).toLocaleDateString()}</p>
                  {a.currentCtc && <p className="mt-1 text-xs font-bold">CTC: ₹{a.currentCtc.toLocaleString()} → {a.newCtc ? `₹${a.newCtc.toLocaleString()}` : "TBD"}</p>}
                  {a.comments && <p className="mt-1 text-sm text-slate-600">{a.comments}</p>}
                </div>
                <div className="flex items-center gap-1">
                  {a.status === "SUBMITTED" && <button onClick={() => acknowledgeAppraisal(a.id)} className="rounded-lg border p-1.5 text-green-500 hover:bg-green-50" title="Acknowledge"><CheckCircle size={14} /></button>}
                  <button onClick={() => remove("appraisals", a.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}

          {activeTab === "promotions" && promotions.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No promotions yet</p>}
          {activeTab === "promotions" && promotions.map((p) => (
            <div key={p.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-green-500" />
                    <span className="font-black">{p.employee?.user.name || "Unknown"}</span>
                  </div>
                  <p className="mt-1 text-xs font-bold">{p.fromDesignation || "?"} → {p.toDesignation || "?"}</p>
                  <p className="text-xs text-slate-500">Effective {new Date(p.effectiveDate).toLocaleDateString()}{p.reason ? ` — ${p.reason}` : ""}</p>
                  {p.fromSalary && p.toSalary && <p className="text-xs font-bold text-green-600">₹{p.fromSalary.toLocaleString()} → ₹{p.toSalary.toLocaleString()}</p>}
                </div>
                <button onClick={() => remove("promotions", p.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}

          {activeTab === "warnings" && warningsList.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No warnings</p>}
          {activeTab === "warnings" && warningsList.map((w) => (
            <div key={w.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <AlertTriangle size={14} className="text-red-500" />
                    <span className="font-black">{w.employee?.user.name || "Unknown"}</span>
                    <span className={`rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-black text-red-700`}>{w.type}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${w.status === "RESOLVED" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{w.status}</span>
                  </div>
                  <p className="mt-1 text-sm font-bold">{w.title}</p>
                  {w.description && <p className="text-xs text-slate-500">{w.description}</p>}
                  <p className="mt-1 text-[10px] text-slate-400">Issued {new Date(w.issuedDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  {w.status === "ACTIVE" && <button onClick={() => resolveWarning(w.id)} className="rounded-lg border p-1.5 text-green-500 hover:bg-green-50" title="Resolve"><CheckCircle size={14} /></button>}
                  <button onClick={() => remove("warnings", w.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}

          {/* HR Notes Tab */}
          {activeTab === "hr-notes" && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 space-y-3">
                <h3 className="font-black text-rose-800">New HR Note</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <select className={field} value={noteForm.employeeId} onChange={(e) => { setNoteForm({ ...noteForm, employeeId: e.target.value }); if (e.target.value) loadHrNotes(e.target.value); }}>
                    <option value="">Select employee *</option>
                    {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <input type="checkbox" checked={noteForm.isPrivate} onChange={(e) => setNoteForm({ ...noteForm, isPrivate: e.target.checked })} />
                    Private note (HR only)
                  </label>
                  <textarea className={`${field} md:col-span-2 min-h-[80px]`} placeholder="Note content *" value={noteForm.note} onChange={(e) => setNoteForm({ ...noteForm, note: e.target.value })} />
                </div>
                <button onClick={createHrNote} className="rounded-xl bg-rose-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Add Note</button>
              </div>

              {hrNotes.length === 0 && selectedEmpId && <p className="py-4 text-center text-sm font-bold text-slate-400">No HR notes for this employee</p>}
              {hrNotes.map((n) => (
                <div key={n.id} className="rounded-2xl border bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <StickyNote size={14} className="text-rose-500" />
                        <span className="font-black text-sm">{n.employee?.user.name || "Unknown"}</span>
                        {n.isPrivate && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-black text-rose-700">Private</span>}
                        {n.createdBy && <span className="text-xs text-slate-400">by {n.createdBy.user.name}</span>}
                      </div>
                      <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">{n.note}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
              {!selectedEmpId && <p className="py-4 text-center text-sm font-bold text-slate-400">Select an employee above to view notes</p>}
            </div>
          )}

          {/* Employee Lifecycle Tab */}
          {activeTab === "lifecycle" && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                <select className={field} value={selectedEmpId} onChange={(e) => { setSelectedEmpId(e.target.value); if (e.target.value) loadLifecycle(e.target.value); }}>
                  <option value="">Select employee *</option>
                  {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>

              {!selectedEmpId && <p className="py-4 text-center text-sm font-bold text-slate-400">Select an employee to view their lifecycle</p>}

              {lifecycle && (
                <div className="space-y-3">
                  <div className="rounded-2xl border bg-white p-4">
                    <h3 className="font-black text-lg">{lifecycle.user?.name || "Unknown"}</h3>
                    <p className="text-xs text-slate-500">Code: {lifecycle.employeeCode} | Dept: {lifecycle.department?.name || "-"} | Designation: {lifecycle.designation?.name || "-"}</p>
                    <p className="text-xs text-slate-500">Status: {lifecycle.employmentStatus} | Joined: {lifecycle.joiningDate ? new Date(lifecycle.joiningDate).toLocaleDateString() : "-"}</p>
                  </div>

                  {lifecycle.salaryStructures?.length > 0 && (
                    <div className="rounded-2xl border bg-white p-4">
                      <h4 className="font-black text-sm mb-2">Current Salary Structure</h4>
                      {lifecycle.salaryStructures.map((s: any) => (
                        <div key={s.id} className="flex items-center justify-between py-1 text-sm">
                          <span>{s.component.name}</span>
                          <span className="font-bold">₹{s.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border bg-white p-4">
                      <h4 className="font-black text-sm mb-2">Performance Reviews ({lifecycle.performanceReviews?.length || 0})</h4>
                      {lifecycle.performanceReviews?.slice(0, 5).map((r: any) => (
                        <div key={r.id} className="text-xs py-1 border-b border-slate-50 last:border-0">
                          <span className="font-bold">{new Date(r.reviewDate).toLocaleDateString()}</span>
                          <span className="ml-2 rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-black text-amber-700">{ratingLabel[r.rating]}/5</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border bg-white p-4">
                      <h4 className="font-black text-sm mb-2">Appraisals ({lifecycle.appraisals?.length || 0})</h4>
                      {lifecycle.appraisals?.slice(0, 5).map((a: any) => (
                        <div key={a.id} className="text-xs py-1 border-b border-slate-50 last:border-0">
                          <span className="font-bold">{new Date(a.reviewDate).toLocaleDateString()}</span>
                          <span className="ml-1 text-slate-500">CTC: {a.currentCtc ? `₹${a.currentCtc.toLocaleString()}` : "?"} → {a.newCtc ? `₹${a.newCtc.toLocaleString()}` : "?"}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border bg-white p-4">
                      <h4 className="font-black text-sm mb-2">Promotions ({lifecycle.promotions?.length || 0})</h4>
                      {lifecycle.promotions?.slice(0, 5).map((p: any) => (
                        <div key={p.id} className="text-xs py-1 border-b border-slate-50 last:border-0">
                          <span className="font-bold">{new Date(p.effectiveDate).toLocaleDateString()}</span>
                          <span className="ml-1 text-slate-500">{p.fromDesignation || "?"} → {p.toDesignation || "?"}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border bg-white p-4">
                      <h4 className="font-black text-sm mb-2">Warnings ({lifecycle.warnings?.length || 0})</h4>
                      {lifecycle.warnings?.slice(0, 5).map((w: any) => (
                        <div key={w.id} className="text-xs py-1 border-b border-slate-50 last:border-0">
                          <span className="font-bold">{new Date(w.issuedDate).toLocaleDateString()}</span>
                          <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-black ${w.status === "RESOLVED" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{w.status}</span>
                          <span className="ml-1 text-slate-500">{w.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
