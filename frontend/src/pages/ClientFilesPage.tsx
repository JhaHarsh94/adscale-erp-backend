import { useEffect, useState } from "react";
import { Search, Folder, FileIcon, Download, ChevronRight, Home } from "lucide-react";
import { apiClient } from "../api/client";
import { getClientToken } from "../lib/clientAuth";
import type { ClientFile, ClientFolder } from "../types/clientPortal";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function formatSize(bytes?: number | null) {
  if (!bytes) return "-";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(mime?: string | null) {
  if (!mime) return <FileIcon size={18} className="text-slate-400" />;
  if (mime.startsWith("image/")) return <FileIcon size={18} className="text-purple-500" />;
  if (mime.includes("pdf")) return <FileIcon size={18} className="text-red-500" />;
  if (mime.includes("spreadsheet") || mime.includes("excel")) return <FileIcon size={18} className="text-green-500" />;
  if (mime.includes("word") || mime.includes("document")) return <FileIcon size={18} className="text-blue-500" />;
  return <FileIcon size={18} className="text-slate-400" />;
}

function ClientFilesPage() {
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [folders, setFolders] = useState<ClientFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  async function loadData(folderId: string | null) {
    try {
      const token = getClientToken();
      const params: Record<string, string> = {};
      if (folderId) params.folderId = folderId;
      const res = await apiClient.get("/client-portal/files", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setFiles(res.data.data.files || []);
      setFolders(res.data.data.folders || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }

  useEffect(() => {
    loadData(currentFolder);
  }, [currentFolder]);

  function navigateTo(folderId: string | null) {
    setCurrentFolder(folderId);
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
        <h2 className="text-2xl font-black text-slate-950">Files</h2>
        <p className="mt-1 text-sm text-slate-500">Download project files and assets</p>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => navigateTo(null)} className="flex items-center gap-1 hover:text-emerald-600"><Home size={14} /> All Files</button>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-slate-400" />
        <input
          className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {folders.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => navigateTo(folder.id)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md"
            >
              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600"><Folder size={20} /></div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{folder.name}</p>
                <p className="text-[10px] font-semibold text-slate-400">Folder</p>
              </div>
              <ChevronRight size={16} className="ml-auto shrink-0 text-slate-300" />
            </button>
          ))}
        </div>
      )}

      {files.length === 0 && folders.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Folder size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-lg font-bold text-slate-500">No files yet</p>
          <p className="mt-1 text-sm text-slate-400">Files shared with you will appear here.</p>
        </div>
      ) : (
        files.length > 0 && (
          <div className="space-y-2">
            {files.filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase())).map((file) => (
              <div key={file.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                {fileIcon(file.mimeType)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400">{formatSize(file.fileSize)} • v{file.version}</p>
                </div>
                <a
                  href={file.fileUrl.startsWith("http") ? file.fileUrl : `${API_BASE}${file.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 hover:bg-emerald-100"
                  title="Download"
                >
                  <Download size={16} />
                </a>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default ClientFilesPage;
