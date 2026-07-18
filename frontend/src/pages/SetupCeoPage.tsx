import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Crown, Loader2, Mail, User, ShieldCheck } from "lucide-react";
import { apiClient } from "../api/client";
import { getUser } from "../lib/auth";

function SetupCeoPage() {
  const navigate = useNavigate();
  const user = getUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!user || user.email !== "admin@adscale.com") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <Crown size={48} className="mx-auto text-slate-300" />
          <h2 className="mt-4 text-xl font-black text-slate-900">Access Denied</h2>
          <p className="mt-2 text-sm text-slate-500">Only the initial admin account can register a new CEO.</p>
          <button onClick={() => navigate("/dashboard")} className="mt-6 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiClient.post("/auth/ceo-register", { name, email });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to register CEO. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
            <ShieldCheck size={32} className="text-emerald-600" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-slate-900">CEO Registered Successfully</h2>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            An email with login credentials has been sent to <strong className="text-slate-700">{email}</strong>.
            Your dummy account has been deactivated. The new CEO can now sign in.
          </p>
          <button onClick={() => navigate("/login")} className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-600/20">
              <Crown size={28} className="text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-slate-900">Transfer CEO Ownership</h1>
            <p className="mt-2 text-sm text-slate-500">
              Register a new CEO. The current dummy account will be deactivated.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">New CEO Name</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white">
                <User size={18} className="text-slate-400 shrink-0" />
                <input
                  className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">New CEO Email</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white">
                <Mail size={18} className="text-slate-400 shrink-0" />
                <input
                  className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="newceo@company.com"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-700">
              <strong>⚠ Important:</strong> After registration, your current admin account will be deactivated permanently. Only proceed if you're ready to hand over control.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  Register CEO
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SetupCeoPage;
