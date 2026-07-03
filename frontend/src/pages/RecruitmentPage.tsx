import { useEffect, useState } from "react";
import {
  Plus, RefreshCcw, XCircle, Trash2, Save, Briefcase, UserPlus, Calendar, FileText, CheckCircle,
  Phone, Mail, MapPin, Clock, DollarSign, Users, ExternalLink, Send, Ban,
} from "lucide-react";
import { apiClient } from "../api/client";
import type { JobOpening, Applicant, Interview, OfferLetter, RecruitmentDashboard } from "../types/recruitment";

const field = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-blue-500";

const jobTypeLabels: Record<string, string> = { FULL_TIME: "Full Time", PART_TIME: "Part Time", CONTRACT: "Contract", INTERNSHIP: "Internship", FREELANCE: "Freelance" };
const jobStatusColors: Record<string, string> = { DRAFT: "bg-slate-100 text-slate-600", OPEN: "bg-green-50 text-green-700", CLOSED: "bg-red-50 text-red-700", ON_HOLD: "bg-amber-50 text-amber-700" };
const applicantStatusColors: Record<string, string> = {
  APPLIED: "bg-blue-50 text-blue-700", SCREENING: "bg-purple-50 text-purple-700", SHORTLISTED: "bg-amber-50 text-amber-700",
  INTERVIEWED: "bg-indigo-50 text-indigo-700", REJECTED: "bg-red-50 text-red-700", HIRED: "bg-green-50 text-green-700", WITHDREW: "bg-slate-100 text-slate-500",
};
const interviewStatusColors: Record<string, string> = { SCHEDULED: "bg-blue-50 text-blue-700", COMPLETED: "bg-green-50 text-green-700", CANCELLED: "bg-red-50 text-red-700", RESCHEDULED: "bg-amber-50 text-amber-700", NO_SHOW: "bg-slate-100 text-slate-600" };
const offerStatusColors: Record<string, string> = { DRAFT: "bg-slate-100 text-slate-600", SENT: "bg-blue-50 text-blue-700", ACCEPTED: "bg-green-50 text-green-700", REJECTED: "bg-red-50 text-red-700", WITHDRAWN: "bg-amber-50 text-amber-700" };

export default function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [dashboard, setDashboard] = useState<RecruitmentDashboard | null>(null);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [offers, setOffers] = useState<OfferLetter[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

  const blankJob = { title: "", departmentId: "", location: "", jobType: "FULL_TIME", experienceMin: 0, experienceMax: 0, salaryMin: 0, salaryMax: 0, description: "", requirements: "", openingsCount: 1, status: "DRAFT" };
  const [jobForm, setJobForm] = useState(blankJob);

  const blankApplicant = { jobOpeningId: "", name: "", email: "", phone: "", resumeUrl: "", coverLetter: "", source: "", currentCompany: "", currentDesignation: "", experienceYears: 0, noticePeriodDays: 0, expectedSalary: 0, currentSalary: 0, notes: "" };
  const [applicantForm, setApplicantForm] = useState(blankApplicant);

  const blankInterview = { applicantId: "", interviewType: "VIDEO", scheduledAt: "", durationMins: 60, status: "SCHEDULED", meetingLink: "", location: "", interviewerName: "", notes: "", roundNumber: 1 };
  const [interviewForm, setInterviewForm] = useState(blankInterview);

  const blankFeedback = { interviewId: "", reviewerName: "", rating: 3, strengths: "", weaknesses: "", overallAssessment: "", recommendation: "ON_HOLD" };
  const [feedbackForm, setFeedbackForm] = useState(blankFeedback);

  const blankOffer = { applicantId: "", offerDate: new Date().toISOString().split("T")[0], joiningDate: "", designation: "", departmentId: "", ctc: 0, basicSalary: 0, hra: 0, otherAllowances: 0, notes: "" };
  const [offerForm, setOfferForm] = useState(blankOffer);

  const tabs = [
    { key: "jobs", label: "Job Openings", icon: Briefcase },
    { key: "applicants", label: "Applicants", icon: UserPlus },
    { key: "interviews", label: "Interviews", icon: Calendar },
    { key: "offers", label: "Offer Letters", icon: FileText },
  ];

  async function load() {
    try {
      const [dashRes, jobRes, appRes, intRes, offRes, deptRes] = await Promise.all([
        apiClient.get("/recruitment/dashboard"),
        apiClient.get("/recruitment/job-openings"),
        apiClient.get("/recruitment/applicants"),
        apiClient.get("/recruitment/interviews"),
        apiClient.get("/recruitment/offer-letters"),
        apiClient.get("/departments"),
      ]);
      setDashboard(dashRes.data.data);
      setJobs(jobRes.data.data || []);
      setApplicants(appRes.data.data || []);
      setInterviews(intRes.data.data || []);
      setOffers(offRes.data.data || []);
      setDepartments(deptRes.data.data || []);
    } catch { setMessage("Failed to load data"); }
  }

  useEffect(() => { void load(); }, []);

  /* Job Openings CRUD */
  async function createJob() {
    try {
      if (!jobForm.title) { setMessage("Title is required"); return; }
      await apiClient.post("/recruitment/job-openings", jobForm);
      setMessage("Job opening created"); setShowForm(false); setJobForm({ ...blankJob }); void load();
    } catch { setMessage("Failed"); }
  }

  async function updateJobStatus(id: string, status: string) {
    try { await apiClient.put(`/recruitment/job-openings/${id}`, { status }); setMessage("Status updated"); void load(); } catch { setMessage("Failed"); }
  }

  async function deleteJob(id: string) {
    try { await apiClient.delete(`/recruitment/job-openings/${id}`); setMessage("Deleted"); void load(); } catch { setMessage("Failed"); }
  }

  /* Applicants CRUD */
  async function createApplicant() {
    try {
      if (!applicantForm.name || !applicantForm.email) { setMessage("Name and email are required"); return; }
      await apiClient.post("/recruitment/applicants", applicantForm);
      setMessage("Applicant created"); setShowForm(false); setApplicantForm({ ...blankApplicant }); void load();
    } catch { setMessage("Failed"); }
  }

  async function updateApplicantStatus(id: string, status: string) {
    try { await apiClient.put(`/recruitment/applicants/${id}`, { status }); setMessage("Status updated"); void load(); } catch { setMessage("Failed"); }
  }

  async function deleteApplicant(id: string) {
    try { await apiClient.delete(`/recruitment/applicants/${id}`); setMessage("Deleted"); void load(); } catch { setMessage("Failed"); }
  }

  /* Interviews CRUD */
  async function createInterview() {
    try {
      if (!interviewForm.applicantId || !interviewForm.scheduledAt) { setMessage("Applicant and date required"); return; }
      await apiClient.post("/recruitment/interviews", interviewForm);
      setMessage("Interview created"); setShowForm(false); setInterviewForm({ ...blankInterview }); void load();
    } catch { setMessage("Failed"); }
  }

  async function updateInterviewStatus(id: string, status: string) {
    try { await apiClient.put(`/recruitment/interviews/${id}`, { status }); setMessage("Status updated"); void load(); } catch { setMessage("Failed"); }
  }

  async function deleteInterview(id: string) {
    try { await apiClient.delete(`/recruitment/interviews/${id}`); setMessage("Deleted"); void load(); } catch { setMessage("Failed"); }
  }

  /* Feedback */
  async function createFeedback() {
    try {
      if (!feedbackForm.interviewId || !feedbackForm.reviewerName) { setMessage("Interview and reviewer required"); return; }
      await apiClient.post("/recruitment/feedback", feedbackForm);
      setMessage("Feedback added"); setFeedbackForm({ ...blankFeedback }); void load();
    } catch { setMessage("Failed"); }
  }

  /* Offer Letters CRUD */
  async function createOffer() {
    try {
      if (!offerForm.applicantId) { setMessage("Applicant is required"); return; }
      await apiClient.post("/recruitment/offer-letters", offerForm);
      setMessage("Offer letter created"); setShowForm(false); setOfferForm({ ...blankOffer }); void load();
    } catch { setMessage("Failed"); }
  }

  async function updateOfferStatus(id: string, status: string) {
    try { await apiClient.put(`/recruitment/offer-letters/${id}`, { status }); setMessage("Offer status updated"); void load(); } catch { setMessage("Failed"); }
  }

  async function deleteOffer(id: string) {
    try { await apiClient.delete(`/recruitment/offer-letters/${id}`); setMessage("Deleted"); void load(); } catch { setMessage("Failed"); }
  }

  const cards = [
    { label: "Open Jobs", value: dashboard?.totalJobs || 0, icon: Briefcase },
    { label: "Applicants", value: dashboard?.totalApplicants || 0, icon: Users },
    { label: "Interviews", value: dashboard?.totalInterviews || 0, icon: Calendar },
    { label: "Offers", value: dashboard?.totalOffers || 0, icon: FileText },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950 p-6 md:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[.28em] text-blue-200">Phase 20</p>
            <h1 className="mt-3 text-2xl md:text-4xl font-black">Recruitment</h1>
            <p className="mt-2 text-xs md:text-sm text-blue-100">Job openings, applicants, interviews & offer letters.</p>
          </div>
          <button onClick={load} className="rounded-xl bg-white/10 p-2.5 md:p-3"><RefreshCcw size={18} /></button>
        </div>
      </section>

      {/* Message */}
      {message && (
        <div className="rounded-xl bg-blue-50 p-3 md:p-4 text-xs md:text-sm font-bold text-blue-800 flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="text-blue-400 hover:text-blue-700"><XCircle size={16} /></button>
        </div>
      )}

      {/* Dashboard cards */}
      <section className="grid gap-3 md:gap-4 grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border bg-white p-3 md:p-4">
              <Icon className="text-blue-700" size={18} />
              <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase text-slate-400">{card.label}</p>
              <p className="mt-0.5 md:mt-1 text-xl md:text-2xl font-black text-slate-900">{card.value}</p>
            </div>
          );
        })}
      </section>

      {/* Main section */}
      <section className="rounded-2xl border bg-white p-4 md:p-6">
        <div className="flex items-center border-b border-slate-100 mb-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => { setActiveTab(tab.key); setShowForm(false); }} className={`flex items-center gap-1.5 px-4 py-3 text-xs font-black border-b-2 transition whitespace-nowrap ${activeTab === tab.key ? "border-blue-600 text-blue-700" : "border-transparent text-slate-400 hover:text-slate-700"}`}>
                <Icon size={14} />{tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black capitalize">{activeTab === "jobs" ? "Job Openings" : activeTab === "offers" ? "Offer Letters" : activeTab}</h2>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-black text-white"><Plus size={16} />New</button>
        </div>

        {/* ---- Job Openings Form ---- */}
        {showForm && activeTab === "jobs" && (
          <div className="mb-4 space-y-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="font-black text-blue-800">New Job Opening</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <input className={field} placeholder="Job title *" value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} />
              <select className={field} value={jobForm.departmentId} onChange={(e) => setJobForm({ ...jobForm, departmentId: e.target.value })}>
                <option value="">Department</option>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <input className={field} placeholder="Location" value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} />
              <select className={field} value={jobForm.jobType} onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}>
                {Object.entries(jobTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <input className={field} type="number" placeholder="Min experience (yrs)" value={jobForm.experienceMin} onChange={(e) => setJobForm({ ...jobForm, experienceMin: parseInt(e.target.value) || 0 })} />
              <input className={field} type="number" placeholder="Max experience (yrs)" value={jobForm.experienceMax} onChange={(e) => setJobForm({ ...jobForm, experienceMax: parseInt(e.target.value) || 0 })} />
              <input className={field} type="number" placeholder="Min salary" value={jobForm.salaryMin} onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value ? Number(e.target.value) : 0 })} />
              <input className={field} type="number" placeholder="Max salary" value={jobForm.salaryMax} onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value ? Number(e.target.value) : 0 })} />
              <input className={field} type="number" placeholder="Openings count" value={jobForm.openingsCount} onChange={(e) => setJobForm({ ...jobForm, openingsCount: parseInt(e.target.value) || 1 })} />
              <select className={field} value={jobForm.status} onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}>
                {Object.entries({ DRAFT: "Draft", OPEN: "Open", CLOSED: "Closed", ON_HOLD: "On Hold" }).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Description" value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} />
              <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Requirements" value={jobForm.requirements} onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })} />
            </div>
            <button onClick={createJob} className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
          </div>
        )}

        {/* ---- Applicants Form ---- */}
        {showForm && activeTab === "applicants" && (
          <div className="mb-4 space-y-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="font-black text-blue-800">New Applicant</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <input className={field} placeholder="Name *" value={applicantForm.name} onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })} />
              <input className={field} placeholder="Email *" value={applicantForm.email} onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })} />
              <input className={field} placeholder="Phone" value={applicantForm.phone} onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })} />
              <input className={field} placeholder="Resume URL" value={applicantForm.resumeUrl} onChange={(e) => setApplicantForm({ ...applicantForm, resumeUrl: e.target.value })} />
              <select className={field} value={applicantForm.jobOpeningId} onChange={(e) => setApplicantForm({ ...applicantForm, jobOpeningId: e.target.value })}>
                <option value="">Job applied for</option>
                {jobs.filter((j) => j.status === "OPEN").map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
              </select>
              <input className={field} placeholder="Source (LinkedIn, Referral, etc.)" value={applicantForm.source} onChange={(e) => setApplicantForm({ ...applicantForm, source: e.target.value })} />
              <input className={field} placeholder="Current company" value={applicantForm.currentCompany} onChange={(e) => setApplicantForm({ ...applicantForm, currentCompany: e.target.value })} />
              <input className={field} placeholder="Current designation" value={applicantForm.currentDesignation} onChange={(e) => setApplicantForm({ ...applicantForm, currentDesignation: e.target.value })} />
              <input className={field} type="number" placeholder="Experience (yrs)" value={applicantForm.experienceYears} onChange={(e) => setApplicantForm({ ...applicantForm, experienceYears: e.target.value ? Number(e.target.value) : 0 })} />
              <input className={field} type="number" placeholder="Notice period (days)" value={applicantForm.noticePeriodDays} onChange={(e) => setApplicantForm({ ...applicantForm, noticePeriodDays: e.target.value ? parseInt(e.target.value) : 0 })} />
              <input className={field} type="number" placeholder="Expected salary" value={applicantForm.expectedSalary} onChange={(e) => setApplicantForm({ ...applicantForm, expectedSalary: e.target.value ? Number(e.target.value) : 0 })} />
              <input className={field} type="number" placeholder="Current salary" value={applicantForm.currentSalary} onChange={(e) => setApplicantForm({ ...applicantForm, currentSalary: e.target.value ? Number(e.target.value) : 0 })} />
              <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Notes" value={applicantForm.notes} onChange={(e) => setApplicantForm({ ...applicantForm, notes: e.target.value })} />
              <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Cover letter" value={applicantForm.coverLetter} onChange={(e) => setApplicantForm({ ...applicantForm, coverLetter: e.target.value })} />
            </div>
            <button onClick={createApplicant} className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
          </div>
        )}

        {/* ---- Interviews Form ---- */}
        {showForm && activeTab === "interviews" && (
          <div className="mb-4 space-y-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="font-black text-blue-800">New Interview</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <select className={field} value={interviewForm.applicantId} onChange={(e) => setInterviewForm({ ...interviewForm, applicantId: e.target.value })}>
                <option value="">Select applicant *</option>
                {applicants.filter((a) => a.status !== "HIRED" && a.status !== "REJECTED" && a.status !== "WITHDREW").map((a) => (
                  <option key={a.id} value={a.id}>{a.name} — {a.email}</option>
                ))}
              </select>
              <select className={field} value={interviewForm.interviewType} onChange={(e) => setInterviewForm({ ...interviewForm, interviewType: e.target.value })}>
                <option value="VIDEO">Video</option><option value="TELEPHONIC">Telephonic</option><option value="FACE_TO_FACE">Face to Face</option><option value="TECHNICAL">Technical</option><option value="HR">HR</option><option value="PANEL">Panel</option>
              </select>
              <input className={field} type="datetime-local" value={interviewForm.scheduledAt} onChange={(e) => setInterviewForm({ ...interviewForm, scheduledAt: e.target.value })} />
              <input className={field} type="number" placeholder="Duration (mins)" value={interviewForm.durationMins} onChange={(e) => setInterviewForm({ ...interviewForm, durationMins: parseInt(e.target.value) || 60 })} />
              <input className={field} placeholder="Interviewer name" value={interviewForm.interviewerName} onChange={(e) => setInterviewForm({ ...interviewForm, interviewerName: e.target.value })} />
              <input className={field} placeholder="Meeting link" value={interviewForm.meetingLink} onChange={(e) => setInterviewForm({ ...interviewForm, meetingLink: e.target.value })} />
              <input className={field} placeholder="Location" value={interviewForm.location} onChange={(e) => setInterviewForm({ ...interviewForm, location: e.target.value })} />
              <input className={field} type="number" placeholder="Round number" value={interviewForm.roundNumber} onChange={(e) => setInterviewForm({ ...interviewForm, roundNumber: parseInt(e.target.value) || 1 })} />
              <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Notes" value={interviewForm.notes} onChange={(e) => setInterviewForm({ ...interviewForm, notes: e.target.value })} />
            </div>
            <button onClick={createInterview} className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
          </div>
        )}

        {/* ---- Offer Letters Form ---- */}
        {showForm && activeTab === "offers" && (
          <div className="mb-4 space-y-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="font-black text-blue-800">New Offer Letter</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <select className={field} value={offerForm.applicantId} onChange={(e) => setOfferForm({ ...offerForm, applicantId: e.target.value })}>
                <option value="">Select applicant *</option>
                {applicants.filter((a) => a.status === "INTERVIEWED" || a.status === "SHORTLISTED").map((a) => (
                  <option key={a.id} value={a.id}>{a.name} — {a.email}</option>
                ))}
              </select>
              <input className={field} placeholder="Designation" value={offerForm.designation} onChange={(e) => setOfferForm({ ...offerForm, designation: e.target.value })} />
              <select className={field} value={offerForm.departmentId} onChange={(e) => setOfferForm({ ...offerForm, departmentId: e.target.value })}>
                <option value="">Department</option>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <input className={field} type="date" placeholder="Joining date" value={offerForm.joiningDate} onChange={(e) => setOfferForm({ ...offerForm, joiningDate: e.target.value })} />
              <input className={field} type="number" placeholder="CTC (annual)" value={offerForm.ctc} onChange={(e) => setOfferForm({ ...offerForm, ctc: e.target.value ? Number(e.target.value) : 0 })} />
              <input className={field} type="number" placeholder="Basic salary" value={offerForm.basicSalary} onChange={(e) => setOfferForm({ ...offerForm, basicSalary: e.target.value ? Number(e.target.value) : 0 })} />
              <input className={field} type="number" placeholder="HRA" value={offerForm.hra} onChange={(e) => setOfferForm({ ...offerForm, hra: e.target.value ? Number(e.target.value) : 0 })} />
              <input className={field} type="number" placeholder="Other allowances" value={offerForm.otherAllowances} onChange={(e) => setOfferForm({ ...offerForm, otherAllowances: e.target.value ? Number(e.target.value) : 0 })} />
              <textarea className={`${field} md:col-span-2 min-h-[60px]`} placeholder="Notes" value={offerForm.notes} onChange={(e) => setOfferForm({ ...offerForm, notes: e.target.value })} />
            </div>
            <button onClick={createOffer} className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-black text-white"><Save size={16} className="inline mr-1" />Create</button>
          </div>
        )}

        {/* ---- Tab Content ---- */}
        <div className="space-y-2">
          {/* Job Openings List */}
          {activeTab === "jobs" && jobs.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No job openings yet</p>}
          {activeTab === "jobs" && jobs.map((j) => (
            <div key={j.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Briefcase size={14} className="text-blue-500" />
                    <span className="font-black">{j.title}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${jobStatusColors[j.status] || ""}`}>{j.status}</span>
                    <span className="text-[10px] font-bold text-slate-400">{jobTypeLabels[j.jobType]}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    {j.location && <span className="flex items-center gap-1"><MapPin size={12} />{j.location}</span>}
                    <span className="flex items-center gap-1"><Clock size={12} />{j.experienceMin}-{j.experienceMax} yrs</span>
                    {(j.salaryMin || j.salaryMax) && <span className="flex items-center gap-1"><DollarSign size={12} />{j.salaryMin ? `₹${j.salaryMin.toLocaleString()}` : ""} - {j.salaryMax ? `₹${j.salaryMax.toLocaleString()}` : ""}</span>}
                    <span className="flex items-center gap-1"><Users size={12} />{j._count?.applicants || 0} applicants</span>
                    <span className="flex items-center gap-1">{j.openingsCount} opening(s)</span>
                    {j.department && <span>{j.department.name}</span>}
                  </div>
                  {j.description && <p className="mt-2 text-xs text-slate-600 line-clamp-2">{j.description}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {j.status === "DRAFT" && <button onClick={() => updateJobStatus(j.id, "OPEN")} className="rounded-lg border p-1.5 text-green-500 hover:bg-green-50" title="Publish"><Send size={14} /></button>}
                  {j.status === "OPEN" && <button onClick={() => updateJobStatus(j.id, "CLOSED")} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50" title="Close"><Ban size={14} /></button>}
                  <button onClick={() => deleteJob(j.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}

          {/* Applicants List */}
          {activeTab === "applicants" && applicants.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No applicants yet</p>}
          {activeTab === "applicants" && applicants.map((a) => (
            <div key={a.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <UserPlus size={14} className="text-purple-500" />
                    <span className="font-black">{a.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${applicantStatusColors[a.status] || ""}`}>{a.status}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1"><Mail size={12} />{a.email}</span>
                    {a.phone && <span className="flex items-center gap-1"><Phone size={12} />{a.phone}</span>}
                    {a.currentCompany && <span>{a.currentCompany}{a.currentDesignation ? ` — ${a.currentDesignation}` : ""}</span>}
                    {a.experienceYears !== null && a.experienceYears !== undefined && <span>{a.experienceYears} yrs exp</span>}
                    {a.jobOpening && <span>Applied for: {a.jobOpening.title}</span>}
                  </div>
                  {a.expectedSalary && <p className="mt-1 text-xs font-bold text-slate-600">Expected: ₹{a.expectedSalary.toLocaleString()}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {a.status === "APPLIED" && <button onClick={() => updateApplicantStatus(a.id, "SCREENING")} className="rounded-lg border p-1.5 text-blue-500 hover:bg-blue-50" title="Move to screening"><CheckCircle size={14} /></button>}
                  {a.status === "SCREENING" && <button onClick={() => updateApplicantStatus(a.id, "SHORTLISTED")} className="rounded-lg border p-1.5 text-amber-500 hover:bg-amber-50" title="Shortlist"><CheckCircle size={14} /></button>}
                  {a.status !== "REJECTED" && a.status !== "HIRED" && a.status !== "WITHDREW" && <button onClick={() => updateApplicantStatus(a.id, "REJECTED")} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50" title="Reject"><Ban size={14} /></button>}
                  <button onClick={() => deleteApplicant(a.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}

          {/* Interviews List */}
          {activeTab === "interviews" && interviews.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No interviews scheduled</p>}
          {activeTab === "interviews" && interviews.map((i) => (
            <div key={i.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Calendar size={14} className="text-indigo-500" />
                    <span className="font-black">{i.applicant?.name || "Unknown"}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${interviewStatusColors[i.status] || ""}`}>{i.status}</span>
                    <span className="text-[10px] font-bold text-slate-400">Round {i.roundNumber} — {i.interviewType}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span>{new Date(i.scheduledAt).toLocaleString()}</span>
                    <span>{i.durationMins} mins</span>
                    {i.interviewerName && <span>Interviewer: {i.interviewerName}</span>}
                    {i.meetingLink && <a href={i.meetingLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline"><ExternalLink size={12} />Join</a>}
                  </div>
                  {i.notes && <p className="mt-1 text-xs text-slate-600">{i.notes}</p>}
                  {i.feedback && i.feedback.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {i.feedback.map((fb) => (
                        <div key={fb.id} className="rounded-xl bg-slate-50 p-2 text-xs">
                          <span className="font-bold">{fb.reviewerName}</span> — Rating: {fb.rating}/5 — {fb.recommendation}
                          {fb.strengths && <p className="text-slate-500">Strengths: {fb.strengths}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {i.status === "SCHEDULED" && <button onClick={() => updateInterviewStatus(i.id, "COMPLETED")} className="rounded-lg border p-1.5 text-green-500 hover:bg-green-50" title="Mark completed"><CheckCircle size={14} /></button>}
                  {i.status === "SCHEDULED" && <button onClick={() => updateInterviewStatus(i.id, "CANCELLED")} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50" title="Cancel"><Ban size={14} /></button>}
                  {i.status !== "CANCELLED" && i.feedback?.length === 0 && (
                    <div className="relative group">
                      <button className="rounded-lg border p-1.5 text-blue-500 hover:bg-blue-50" title="Add feedback"><Plus size={14} /></button>
                      <div className="absolute right-0 top-full mt-1 z-10 hidden group-hover:block w-72 bg-white border rounded-2xl shadow-xl p-3 space-y-2">
                        <p className="font-black text-xs">Add Feedback</p>
                        <input className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs" placeholder="Reviewer name" value={feedbackForm.reviewerName} onChange={(e) => setFeedbackForm({ ...feedbackForm, interviewId: i.id, reviewerName: e.target.value })} />
                        <select className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs" value={feedbackForm.rating} onChange={(e) => setFeedbackForm({ ...feedbackForm, rating: parseInt(e.target.value) })}>
                          {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r}/5</option>)}
                        </select>
                        <textarea className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs min-h-[40px]" placeholder="Strengths" value={feedbackForm.strengths} onChange={(e) => setFeedbackForm({ ...feedbackForm, strengths: e.target.value })} />
                        <select className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs" value={feedbackForm.recommendation} onChange={(e) => setFeedbackForm({ ...feedbackForm, recommendation: e.target.value })}>
                          <option value="STRONG_HIRE">Strong Hire</option><option value="HIRE">Hire</option><option value="ON_HOLD">On Hold</option><option value="REJECT">Reject</option><option value="NEXT_ROUND">Next Round</option>
                        </select>
                        <button onClick={createFeedback} className="w-full rounded-lg bg-blue-700 py-1.5 text-xs font-black text-white"><Save size={12} className="inline mr-1" />Submit</button>
                      </div>
                    </div>
                  )}
                  <button onClick={() => deleteInterview(i.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}

          {/* Offer Letters List */}
          {activeTab === "offers" && offers.length === 0 && <p className="py-8 text-center text-sm font-bold text-slate-400">No offer letters yet</p>}
          {activeTab === "offers" && offers.map((o) => (
            <div key={o.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <FileText size={14} className="text-emerald-500" />
                    <span className="font-black">{o.applicant?.name || "Unknown"}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${offerStatusColors[o.status] || ""}`}>{o.status}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    {o.designation && <span>{o.designation}</span>}
                    {o.department && <span>{o.department.name}</span>}
                    {o.ctc && <span className="font-bold text-green-700">CTC: ₹{o.ctc.toLocaleString()}</span>}
                    {o.joiningDate && <span>Joining: {new Date(o.joiningDate).toLocaleDateString()}</span>}
                  </div>
                  {(o.basicSalary || o.hra || o.otherAllowances) && (
                    <p className="mt-1 text-[10px] text-slate-400">Basic: ₹{o.basicSalary?.toLocaleString() || 0} | HRA: ₹{o.hra?.toLocaleString() || 0} | Allowances: ₹{o.otherAllowances?.toLocaleString() || 0}</p>
                  )}
                  {o.notes && <p className="mt-1 text-xs text-slate-600">{o.notes}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {o.status === "DRAFT" && <button onClick={() => updateOfferStatus(o.id, "SENT")} className="rounded-lg border p-1.5 text-blue-500 hover:bg-blue-50" title="Mark as sent"><Send size={14} /></button>}
                  {o.status === "SENT" && <button onClick={() => updateOfferStatus(o.id, "ACCEPTED")} className="rounded-lg border p-1.5 text-green-500 hover:bg-green-50" title="Accept"><CheckCircle size={14} /></button>}
                  {o.status === "SENT" && <button onClick={() => updateOfferStatus(o.id, "REJECTED")} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50" title="Reject"><Ban size={14} /></button>}
                  <button onClick={() => deleteOffer(o.id)} className="rounded-lg border p-1.5 text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
