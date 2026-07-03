import { Outlet, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Ticket,
  Folder,
  Shield,
  ClipboardList,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { getClientUser, clientLogout } from "../../lib/clientAuth";

const navItems = [
  { label: "Dashboard", path: "/client/dashboard", icon: LayoutDashboard },
  { label: "Projects", path: "/client/projects", icon: FolderKanban },
  { label: "Tickets", path: "/client/tickets", icon: Ticket },
  { label: "Files", path: "/client/files", icon: Folder },
  { label: "Approvals", path: "/client/approvals", icon: Shield },
  { label: "Meeting Notes", path: "/client/meetings", icon: ClipboardList },
];

function ClientLayout() {
  const navigate = useNavigate();
  const user = getClientUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    clientLogout();
    navigate("/client/login");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 max-w-[85vw] border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 md:px-5 py-4 md:py-5">
            <div>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-emerald-600">AdScale</p>
              <h1 className="text-lg md:text-xl font-black text-slate-950">Client Portal</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="rounded-xl border border-slate-200 p-2 lg:hidden"><X size={18} /></button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-2 md:px-3 py-3 md:py-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 md:gap-3 rounded-2xl px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-3 md:p-4">
            <div className="rounded-2xl bg-slate-50 p-3 md:p-4">
              <p className="text-xs md:text-sm font-black text-slate-900 truncate">{user?.name || "Client"}</p>
              <p className="mt-1 truncate text-[10px] md:text-xs font-semibold text-slate-500">{user?.email || ""}</p>
              <p className="mt-1.5 md:mt-2 inline-flex rounded-full bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-black text-emerald-700">CLIENT</p>
            </div>
            <button onClick={handleLogout} className="mt-2 md:mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 md:py-3 text-xs md:text-sm font-black text-slate-700 hover:bg-slate-50"><LogOut size={16} /> Logout</button>
          </div>
        </div>
      </aside>

      <section className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
          <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="rounded-xl border border-slate-200 bg-white p-2 lg:hidden shrink-0"><Menu size={18} /></button>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.22em] text-emerald-600 truncate">Client Portal</p>
                <h2 className="text-base md:text-lg font-black text-slate-950 truncate">{user?.clientName || "Dashboard"}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <button className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50" title="Notifications">
                <Bell size={18} />
              </button>
              <button onClick={handleLogout} className="flex rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 lg:hidden" title="Logout"><LogOut size={18} /></button>
              <div className="hidden rounded-2xl border border-slate-200 bg-white px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold text-slate-600 shadow-sm md:block truncate max-w-[150px]">{user?.name || "Client"}</div>
            </div>
          </div>
        </header>

        <div className="p-3 md:p-5 lg:p-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default ClientLayout;
