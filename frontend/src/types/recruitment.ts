export interface JobOpening {
  id: string;
  title: string;
  departmentId?: string | null;
  department?: { id: string; name: string } | null;
  location?: string | null;
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
  experienceMin: number;
  experienceMax: number;
  salaryMin?: number | null;
  salaryMax?: number | null;
  description?: string | null;
  requirements?: string | null;
  openingsCount: number;
  status: "DRAFT" | "OPEN" | "CLOSED" | "ON_HOLD";
  publishDate?: string | null;
  closingDate?: string | null;
  createdById?: string | null;
  createdBy?: { id: string; name: string; email: string } | null;
  _count?: { applicants: number };
  createdAt: string;
  updatedAt: string;
}

export interface Applicant {
  id: string;
  jobOpeningId?: string | null;
  jobOpening?: { id: string; title: string } | null;
  name: string;
  email: string;
  phone?: string | null;
  resumeUrl?: string | null;
  coverLetter?: string | null;
  status: "APPLIED" | "SCREENING" | "SHORTLISTED" | "INTERVIEWED" | "REJECTED" | "HIRED" | "WITHDREW";
  source?: string | null;
  currentCompany?: string | null;
  currentDesignation?: string | null;
  experienceYears?: number | null;
  noticePeriodDays?: number | null;
  expectedSalary?: number | null;
  currentSalary?: number | null;
  notes?: string | null;
  interviews?: Interview[];
  _count?: { interviews: number };
  createdAt: string;
  updatedAt: string;
}

export interface Interview {
  id: string;
  applicantId: string;
  applicant?: { id: string; name: string; email: string; phone?: string | null } | null;
  interviewType: "TELEPHONIC" | "VIDEO" | "FACE_TO_FACE" | "TECHNICAL" | "HR" | "PANEL";
  scheduledAt: string;
  durationMins: number;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW";
  meetingLink?: string | null;
  location?: string | null;
  interviewerName?: string | null;
  notes?: string | null;
  roundNumber: number;
  feedback?: InterviewFeedback[];
  createdAt: string;
  updatedAt: string;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  reviewerName: string;
  rating: number;
  strengths?: string | null;
  weaknesses?: string | null;
  technicalSkills?: number | null;
  communicationSkills?: number | null;
  overallAssessment?: string | null;
  recommendation: "STRONG_HIRE" | "HIRE" | "ON_HOLD" | "REJECT" | "NEXT_ROUND";
  createdAt: string;
  updatedAt: string;
}

export interface OfferLetter {
  id: string;
  applicantId: string;
  applicant?: { id: string; name: string; email: string } | null;
  offerDate: string;
  joiningDate?: string | null;
  designation?: string | null;
  departmentId?: string | null;
  department?: { id: string; name: string } | null;
  ctc?: number | null;
  basicSalary?: number | null;
  hra?: number | null;
  otherAllowances?: number | null;
  status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";
  documentUrl?: string | null;
  notes?: string | null;
  sentAt?: string | null;
  respondedAt?: string | null;
  responseNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitmentDashboard {
  totalJobs: number;
  totalApplicants: number;
  totalInterviews: number;
  totalOffers: number;
  applicantsByStatus: { status: string; _count: number }[];
}
