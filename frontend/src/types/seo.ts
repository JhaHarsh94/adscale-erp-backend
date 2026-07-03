export interface SeoDashboard {
  totalProjects: number;
  totalKeywords: number;
  avgPosition: number;
  bestPosition: number | null;
  worstPosition: number | null;
  totalAudits: number;
  recentAudits: SeoAudit[];
}

export interface SeoProject {
  id: string;
  projectId: string;
  domain: string;
  targetCity: string | null;
  targetCountry: string | null;
  notes: string | null;
  project: {
    id: string;
    name: string;
    client: { id: string; name: string };
  };
  _count: { keywords: number; audits: number; backlinks: number };
  keywords?: SeoKeyword[];
  audits?: SeoAudit[];
  backlinks?: SeoBacklink[];
  createdAt: string;
}

export interface SeoKeyword {
  id: string;
  seoProjectId: string;
  keyword: string;
  currentPosition: number | null;
  previousPosition: number | null;
  bestPosition: number | null;
  searchVolume: number | null;
  keywordDifficulty: number | null;
  trackedSince: string;
  lastChecked: string | null;
  seoProject?: { id: string; domain: string };
}

export interface SeoAudit {
  id: string;
  seoProjectId: string;
  score: number | null;
  totalIssues: number | null;
  criticalIssues: number | null;
  passedChecks: number | null;
  warnings: number | null;
  summary: string | null;
  performedBy: { id: string; name: string } | null;
  performedAt: string;
  seoProject?: { id: string; domain: string };
}

export interface SeoBacklink {
  id: string;
  seoProjectId: string;
  sourceUrl: string;
  targetUrl: string | null;
  domainAuthority: number | null;
  isFollow: boolean;
  status: string;
  discoveredAt: string;
  lastChecked: string | null;
  seoProject?: { id: string; domain: string };
}
