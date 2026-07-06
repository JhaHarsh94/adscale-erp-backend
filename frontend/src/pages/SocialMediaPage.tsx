import { useEffect, useState } from "react";
import { Search, Share2, Globe, CalendarDays, Hash, Plus, Trash2, Save, RefreshCcw, XCircle, BarChart3, Image, CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { apiClient } from "../api/client";
import type { SocialDashboard, SocialAccount, SocialPost, SocialCalendar } from "../types/socialMedia";

const f = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-blue-500";

const tabs = [
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "accounts", label: "Accounts", icon: Globe },
  { key: "posts", label: "Posts", icon: Hash },
  { key: "calendar", label: "Calendar", icon: CalendarDays },
];

const platformColors: Record<string, string> = {
  FACEBOOK: "bg-blue-100 text-blue-700",
  INSTAGRAM: "bg-pink-100 text-pink-700",
  LINKEDIN: "bg-sky-100 text-sky-700",
  TWITTER: "bg-slate-100 text-slate-700",
  YOUTUBE: "bg-red-100 text-red-700",
  TIKTOK: "bg-teal-100 text-teal-700",
  PINTEREST: "bg-rose-100 text-rose-700",
};

const statusColors: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SCHEDULED: "bg-blue-100 text-blue-700",
  PUBLISHED: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  APPROVED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SocialMediaPage() {
  const [tab, setTab] = useState("dashboard");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // dashboard
  const [dashboard, setDashboard] = useState<SocialDashboard | null>(null);

  // accounts
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [availProjects, setAvailProjects] = useState<{ id: string; name: string }[]>([]);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountForm, setAccountForm] = useState({ projectId: "", platform: "FACEBOOK", accountName: "", accountId: "", followers: "" });

  // posts
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({ accountId: "", content: "", mediaUrl: "", caption: "", scheduledAt: "", status: "DRAFT", notes: "" });
  const [editPost, setEditPost] = useState<{ id: string; field: string; value: string } | null>(null);

  // calendars
  const [calendars, setCalendars] = useState<SocialCalendar[]>([]);
  const [showCalForm, setShowCalForm] = useState(false);
  const [calForm, setCalForm] = useState({ projectId: "", month: String(new Date().getMonth() + 1), year: String(new Date().getFullYear()), notes: "" });

  // filters
  const [search, setSearch] = useState("");
  const [filterAccount, setFilterAccount] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  function msgOk(s: string) { setMsg(s); setTimeout(() => setMsg(""), 3000); }

  async function loadDashboard() {
    setLoading(true);
    try {
      const res = await apiClient.get("/social-media/dashboard");
      setDashboard(res.data.data);
    } catch { setMsg("Failed to load dashboard"); }
    setLoading(false);
  }

  async function loadAccounts() {
    try {
      const res = await apiClient.get("/social-media/accounts");
      setAccounts(res.data.data || []);
    } catch { /* ignore */ }
  }

  async function loadAvailProjects() {
    try {
      const res = await apiClient.get("/social-media/accounts/without-social");
      setAvailProjects(res.data.data || []);
    } catch { /* ignore */ }
  }

  async function loadPosts() {
    try {
      const params: Record<string, string> = {};
      if (filterAccount) params.accountId = filterAccount;
      if (filterStatus) params.status = filterStatus;
      const res = await apiClient.get("/social-media/posts", { params });
      setPosts(res.data.data || []);
    } catch { /* ignore */ }
  }

  async function loadCalendars() {
    try {
      const res = await apiClient.get("/social-media/calendars");
      setCalendars(res.data.data || []);
    } catch { /* ignore */ }
  }

  useEffect(() => { if (tab === "dashboard") loadDashboard(); }, [tab]);
  useEffect(() => { if (tab === "accounts") { loadAccounts(); loadAvailProjects(); } }, [tab]);
  useEffect(() => { if (tab === "posts") { loadPosts(); loadAccounts(); } }, [tab, filterAccount, filterStatus]);
  useEffect(() => { if (tab === "calendar") { loadCalendars(); loadAccounts(); } }, [tab]);

  /* Account CRUD */
  async function createAccount() {
    if (!accountForm.projectId || !accountForm.accountName) { setMsg("Project and account name required"); return; }
    try {
      await apiClient.post("/social-media/accounts", accountForm);
      msgOk("Account created"); setShowAccountForm(false);
      setAccountForm({ projectId: "", platform: "FACEBOOK", accountName: "", accountId: "", followers: "" });
      loadAccounts(); loadAvailProjects();
    } catch { setMsg("Failed"); }
  }

  async function deleteAccount(id: string) {
    try { await apiClient.delete(`/social-media/accounts/${id}`); msgOk("Deleted"); loadAccounts(); } catch { setMsg("Failed"); }
  }

  /* Post CRUD */
  async function createPost() {
    if (!postForm.accountId || !postForm.content) { setMsg("Account and content required"); return; }
    try {
      await apiClient.post("/social-media/posts", postForm);
      msgOk("Post created"); setShowPostForm(false);
      setPostForm({ accountId: "", content: "", mediaUrl: "", caption: "", scheduledAt: "", status: "DRAFT", notes: "" });
      loadPosts();
    } catch { setMsg("Failed"); }
  }

  async function updatePostField(id: string) {
    if (!editPost) return;
    try {
      await apiClient.put(`/social-media/posts/${id}`, { [editPost.field]: editPost.value });
      msgOk("Updated"); setEditPost(null); loadPosts();
    } catch { setMsg("Failed"); }
  }

  async function deletePost(id: string) {
    try { await apiClient.delete(`/social-media/posts/${id}`); msgOk("Deleted"); loadPosts(); } catch { setMsg("Failed"); }
  }

  /* Calendar CRUD */
  async function createCalendar() {
    if (!calForm.projectId || !calForm.month || !calForm.year) { setMsg("All fields required"); return; }
    try {
      await apiClient.post("/social-media/calendars", calForm);
      msgOk("Calendar created"); setShowCalForm(false);
      setCalForm({ projectId: "", month: String(new Date().getMonth() + 1), year: String(new Date().getFullYear()), notes: "" });
      loadCalendars();
    } catch { setMsg("Failed"); }
  }

  async function deleteCalendar(id: string) {
    try { await apiClient.delete(`/social-media/calendars/${id}`); msgOk("Deleted"); loadCalendars(); } catch { setMsg("Failed"); }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-gradient-to-br from-pink-600 via-rose-700 to-slate-950 p-6 md:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[.28em] text-pink-200">Phase 23</p>
            <h1 className="mt-3 text-2xl md:text-4xl font-black">Social Media Management</h1>
            <p className="mt-2 text-xs md:text-sm text-pink-100">Content calendar, post scheduling & platform management.</p>
          </div>
          <button onClick={() => { if (tab === "dashboard") loadDashboard(); }} className="rounded-xl bg-white/10 p-2.5 md:p-3"><RefreshCcw size={18} /></button>
        </div>
      </section>

      {msg && (
        <div className="rounded-xl bg-pink-50 p-3 md:p-4 text-xs md:text-sm font-bold text-pink-800 flex items-center justify-between">
          <span>{msg}</span>
          <button onClick={() => setMsg("")} className="text-pink-400 hover:text-pink-700"><XCircle size={16} /></button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-3 text-xs font-black border-b-2 transition whitespace-nowrap ${tab === t.key ? "border-pink-600 text-pink-700" : "border-transparent text-slate-400 hover:text-slate-700"}`}>
              <Icon size={14} />{t.label}
            </button>
          );
        })}
      </div>

      {/* ───── Dashboard ───── */}
      {tab === "dashboard" && loading && (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />
        </div>
      )}
      {tab === "dashboard" && !loading && dashboard && (
        <div className="space-y-6">
          <div className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Accounts", value: dashboard.totalAccounts, icon: Globe },
              { label: "Total Posts", value: dashboard.totalPosts, icon: Hash },
              { label: "Published", value: dashboard.postStatusBreakdown.find((s) => s.status === "PUBLISHED")?._count || 0, icon: CheckCircle },
              { label: "Scheduled", value: dashboard.postStatusBreakdown.find((s) => s.status === "SCHEDULED")?._count || 0, icon: Clock },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="rounded-2xl border bg-white p-3 md:p-4">
                  <Icon className="text-pink-700" size={18} />
                  <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{c.label}</p>
                  <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-slate-900">{c.value}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Posts */}
          <div className="rounded-2xl border bg-white p-4">
            <h3 className="font-black text-slate-900 mb-3">Recent Posts</h3>
            {dashboard.recentPosts.length === 0 ? (
              <p className="text-sm text-slate-400">No posts yet</p>
            ) : (
              <div className="space-y-2">
                {dashboard.recentPosts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 truncate">{p.content}</p>
                      <p className="text-xs text-slate-500">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-black ${platformColors[p.account?.platform || ""] || ""}`}>{p.account?.platform}</span>
                        {" "}&middot;{" "}
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-black ${statusColors[p.status] || ""}`}>{p.status}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───── Accounts ───── */}
      {tab === "accounts" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{accounts.length} social account(s)</p>
            <button onClick={() => { setShowAccountForm(!showAccountForm); if (!showAccountForm) loadAvailProjects(); }} className="flex items-center gap-1.5 rounded-xl bg-pink-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Account</button>
          </div>
          {showAccountForm && (
            <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4 space-y-3">
              <h3 className="font-black text-pink-800">Link Social Account</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <select className={f} value={accountForm.projectId} onChange={(e) => setAccountForm({ ...accountForm, projectId: e.target.value })}>
                  <option value="">Select project *</option>
                  {availProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select className={f} value={accountForm.platform} onChange={(e) => setAccountForm({ ...accountForm, platform: e.target.value })}>
                  {["FACEBOOK", "INSTAGRAM", "LINKEDIN", "TWITTER", "YOUTUBE", "TIKTOK", "PINTEREST"].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <input className={f} placeholder="Account name *" value={accountForm.accountName} onChange={(e) => setAccountForm({ ...accountForm, accountName: e.target.value })} />
                <input className={f} placeholder="Account ID (optional)" value={accountForm.accountId} onChange={(e) => setAccountForm({ ...accountForm, accountId: e.target.value })} />
                <input className={f} type="number" placeholder="Followers" value={accountForm.followers} onChange={(e) => setAccountForm({ ...accountForm, followers: e.target.value })} />
              </div>
              <button onClick={createAccount} className="rounded-xl bg-pink-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
            </div>
          )}
          {accounts.map((a) => (
            <div key={a.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${platformColors[a.platform] || "bg-slate-100 text-slate-600"}`}>
                    <Share2 size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">{a.accountName}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${platformColors[a.platform] || ""}`}>{a.platform}</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{a.project.name} — {a.project.client.name}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-bold text-slate-400">
                      <span>{a._count?.posts || 0} posts</span>
                      {a.followers !== null && <span>👥 {a.followers?.toLocaleString()} followers</span>}
                    </div>
                  </div>
                </div>
                <button onClick={() => deleteAccount(a.id)} className="rounded-xl bg-red-50 p-2 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {accounts.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No social accounts linked</p>}
        </div>
      )}

      {/* ───── Posts ───── */}
      {tab === "posts" && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 flex-1 max-w-xs">
              <Search size={14} className="text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none" />
            </div>
            <select className={f + " max-w-[180px]"} value={filterAccount} onChange={(e) => setFilterAccount(e.target.value)}>
              <option value="">All accounts</option>
              {accounts.map((a) => <option key={a.id} value={a.id}>{a.accountName}</option>)}
            </select>
            <select className={f + " max-w-[150px]"} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All status</option>
              {["DRAFT", "SCHEDULED", "PUBLISHED", "FAILED", "APPROVED", "REJECTED"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={() => setShowPostForm(!showPostForm)} className="flex items-center gap-1.5 rounded-xl bg-pink-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Post</button>
          </div>
          {showPostForm && (
            <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4 space-y-3">
              <h3 className="font-black text-pink-800">Create Social Post</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <select className={f} value={postForm.accountId} onChange={(e) => setPostForm({ ...postForm, accountId: e.target.value })}>
                  <option value="">Select account *</option>
                  {accounts.map((a) => <option key={a.id} value={a.id}>{a.accountName} ({a.platform})</option>)}
                </select>
                <select className={f} value={postForm.status} onChange={(e) => setPostForm({ ...postForm, status: e.target.value })}>
                  <option value="DRAFT">Draft</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="APPROVED">Approved</option>
                </select>
                <textarea className={`${f} min-h-[80px]`} placeholder="Post content *" value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} />
                <input className={f} placeholder="Media URL" value={postForm.mediaUrl} onChange={(e) => setPostForm({ ...postForm, mediaUrl: e.target.value })} />
                <input className={f} placeholder="Caption" value={postForm.caption} onChange={(e) => setPostForm({ ...postForm, caption: e.target.value })} />
                <input className={f} type="datetime-local" value={postForm.scheduledAt} onChange={(e) => setPostForm({ ...postForm, scheduledAt: e.target.value })} />
                <textarea className={`${f} min-h-[60px]`} placeholder="Notes" value={postForm.notes} onChange={(e) => setPostForm({ ...postForm, notes: e.target.value })} />
              </div>
              <button onClick={createPost} className="rounded-xl bg-pink-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
            </div>
          )}
          {posts.length === 0 ? (
            <p className="py-8 text-center text-sm font-bold text-slate-400">No posts yet</p>
          ) : (
            <div className="space-y-2">
              {posts.filter((p) => !search || p.content.toLowerCase().includes(search.toLowerCase()) || p.caption?.toLowerCase().includes(search.toLowerCase())).map((p) => (
                <div key={p.id} className="rounded-2xl border bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${platformColors[p.account?.platform || ""] || ""}`}>
                          {p.account?.platform} — {p.account?.accountName}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${statusColors[p.status] || ""}`}>{p.status}</span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">{p.content}</p>
                      {p.caption && <p className="mt-1 text-xs text-slate-500 italic">{p.caption}</p>}
                      <div className="mt-2 flex flex-wrap gap-3 text-[10px] font-semibold text-slate-400">
                        {p.scheduledAt && <span><Clock size={12} className="inline mr-1" />{new Date(p.scheduledAt).toLocaleString()}</span>}
                        {p.publishedAt && <span><CheckCircle size={12} className="inline mr-1" />{new Date(p.publishedAt).toLocaleDateString()}</span>}
                        {p.likes > 0 && <span>❤️ {p.likes}</span>}
                        {p.comments > 0 && <span>💬 {p.comments}</span>}
                        {p.shares > 0 && <span>🔄 {p.shares}</span>}
                        {p.impressions !== null && <span>👁️ {p.impressions?.toLocaleString()}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {editPost?.id === p.id ? (
                        <div className="flex items-center gap-2">
                          <input className="w-24 rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold" value={editPost.value} onChange={(e) => setEditPost({ ...editPost, value: e.target.value })} />
                          <button onClick={() => updatePostField(p.id)} className="rounded-lg bg-green-500 p-1.5 text-white"><Save size={14} /></button>
                          <button onClick={() => setEditPost(null)} className="rounded-lg bg-slate-200 p-1.5"><XCircle size={14} /></button>
                        </div>
                      ) : (
                        <button onClick={() => setEditPost({ id: p.id, field: "status", value: p.status })} className="rounded-lg bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-100"><CheckCircle size={14} /></button>
                      )}
                      <button onClick={() => deletePost(p.id)} className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ───── Calendar ───── */}
      {tab === "calendar" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">{calendars.length} content calendar(s)</p>
            <button onClick={() => setShowCalForm(!showCalForm)} className="flex items-center gap-1.5 rounded-xl bg-pink-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New Calendar</button>
          </div>
          {showCalForm && (
            <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4 space-y-3">
              <h3 className="font-black text-pink-800">Create Content Calendar</h3>
              <div className="grid gap-3 md:grid-cols-4">
                <select className={f} value={calForm.projectId} onChange={(e) => setCalForm({ ...calForm, projectId: e.target.value })}>
                  <option value="">Select project *</option>
                  {accounts.map((a) => <option key={a.project.id} value={a.projectId}>{a.project.name}</option>)}
                  {accounts.length === 0 && <option disabled>No projects with accounts</option>}
                </select>
                <select className={f} value={calForm.month} onChange={(e) => setCalForm({ ...calForm, month: e.target.value })}>
                  {monthNames.map((name, i) => <option key={i + 1} value={String(i + 1)}>{name}</option>)}
                </select>
                <input className={f} type="number" placeholder="Year *" value={calForm.year} onChange={(e) => setCalForm({ ...calForm, year: e.target.value })} />
                <input className={f} placeholder="Notes" value={calForm.notes} onChange={(e) => setCalForm({ ...calForm, notes: e.target.value })} />
              </div>
              <button onClick={createCalendar} className="rounded-xl bg-pink-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
            </div>
          )}
          {calendars.length === 0 ? (
            <p className="py-8 text-center text-sm font-bold text-slate-400">No content calendars</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Period</th>
                    <th className="px-4 py-3">Posts</th>
                    <th className="px-4 py-3">Notes</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs font-semibold text-slate-700">
                  {calendars.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold">{c.project.name}</td>
                      <td className="px-4 py-3">{monthNames[c.month - 1]} {c.year}</td>
                      <td className="px-4 py-3">{c._count?.posts || 0}</td>
                      <td className="px-4 py-3 text-slate-400 max-w-[200px] truncate">{c.notes || "—"}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => deleteCalendar(c.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
