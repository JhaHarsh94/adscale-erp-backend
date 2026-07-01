export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId?: string | null;
  reviewDate: string;
  rating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  feedback?: string | null;
  goals?: string | null;
  strengths?: string | null;
  improvements?: string | null;
  status: string;
  submittedAt?: string | null;
  nextReviewDate?: string | null;
  employee?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  reviewer?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Appraisal {
  id: string;
  employeeId: string;
  reviewDate: string;
  reviewerId?: string | null;
  currentCtc?: number | null;
  newCtc?: number | null;
  incrementPct?: number | null;
  rating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comments?: string | null;
  status: "DRAFT" | "SUBMITTED" | "ACKNOWLEDGED";
  acknowledgedAt?: string | null;
  effectiveDate?: string | null;
  employee?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  reviewer?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Promotion {
  id: string;
  employeeId: string;
  fromDesignation?: string | null;
  toDesignation?: string | null;
  fromSalary?: number | null;
  toSalary?: number | null;
  effectiveDate: string;
  reason?: string | null;
  approvedById?: string | null;
  status: string;
  employee?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  approvedBy?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Warning {
  id: string;
  employeeId: string;
  type: "VERBAL" | "WRITTEN" | "FINAL";
  title: string;
  description?: string | null;
  issuedById?: string | null;
  status: "ACTIVE" | "EXPIRED" | "RESOLVED";
  issuedDate: string;
  expiresAt?: string | null;
  resolvedAt?: string | null;
  notes?: string | null;
  employee?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  issuedBy?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  createdAt: string;
  updatedAt: string;
}

export interface HrNote {
  id: string;
  employeeId: string;
  note: string;
  createdById?: string | null;
  isPrivate: boolean;
  employee?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  createdBy?: { id: string; employeeCode: string; user: { id: string; name: string; email: string } } | null;
  createdAt: string;
  updatedAt: string;
}

export interface HrmsDashboard {
  totalReviews: number;
  totalAppraisals: number;
  totalPromotions: number;
  totalWarnings: number;
}
