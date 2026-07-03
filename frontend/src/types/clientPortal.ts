export interface ClientUser {
  id: string;
  clientId: string;
  name: string;
  email: string;
  phone?: string | null;
  isActive: boolean;
  lastLogin?: string | null;
  clientName: string;
  portalAccess?: ClientPortalAccess | null;
}

export interface ClientPortalAccess {
  canViewProjects: boolean;
  canRaiseTickets: boolean;
  canDownloadFiles: boolean;
  canApproveWork: boolean;
  canViewReports: boolean;
  canViewMeetings: boolean;
}

export interface ClientLoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: ClientUser;
  };
}

export interface ClientDashboardData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  openTickets: number;
  resolvedTickets: number;
  totalFiles: number;
  pendingApprovals: number;
  upcomingMeetings: number;
}

export interface ClientProject {
  id: string;
  projectCode: string;
  name: string;
  description?: string | null;
  status: string;
  priority: string;
  health: string;
  progress: number;
  startDate?: string | null;
  endDate?: string | null;
  budget?: number | null;
  manager?: {
    id: string;
    employeeCode: string;
    user: { id: string; name: string; email: string };
  } | null;
  milestones?: Array<{
    id: string;
    title: string;
    status: string;
    dueDate?: string | null;
  }>;
  members?: Array<{
    id: string;
    role: string;
    employee: {
      id: string;
      employeeCode: string;
      user: { id: string; name: string };
    };
  }>;
  timelines?: Array<{
    id: string;
    title: string;
    details?: string | null;
    eventDate: string;
  }>;
  createdAt: string;
}

export interface ClientTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  source: string;
  createdAt: string;
  category?: { id: string; name: string } | null;
  assignedTo?: {
    id: string;
    user: { id: string; name: string };
  } | null;
  comments?: Array<{
    id: string;
    body: string;
    isInternal: boolean;
    createdAt: string;
    author?: { id: string; name: string } | null;
  }>;
  statusLogs?: Array<{
    id: string;
    fromStatus?: string | null;
    toStatus: string;
    createdAt: string;
  }>;
}

export interface ClientFile {
  id: string;
  name: string;
  fileUrl: string;
  fileType?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
  version: number;
  createdAt: string;
  folder?: { id: string; name: string } | null;
  uploadedBy?: { id: string; name: string } | null;
}

export interface ClientFolder {
  id: string;
  name: string;
  parentId?: string | null;
}

export interface ClientApproval {
  id: string;
  title: string;
  description?: string | null;
  type: string;
  status: string;
  priority: string;
  createdAt: string;
  createdBy?: { id: string; name: string; email: string } | null;
  files: Array<{ id: string; fileName: string; fileUrl: string; fileType?: string | null }>;
  steps: Array<{
    id: string;
    stepOrder: number;
    status: string;
    comments?: string | null;
    reviewer?: {
      id: string;
      user: { id: string; name: string };
    } | null;
  }>;
}

export interface ClientMeeting {
  id: string;
  title: string;
  description?: string | null;
  meetingDate: string;
  startTime?: string | null;
  endTime?: string | null;
  location?: string | null;
  status: string;
  createdBy?: { id: string; name: string } | null;
  agendaItems: Array<{
    id: string;
    title: string;
    description?: string | null;
    sortOrder: number;
  }>;
  minutes?: { id: string; content: string } | null;
  actionItems: Array<{
    id: string;
    description: string;
    status: string;
    dueDate?: string | null;
    assignedTo?: {
      id: string;
      user: { id: string; name: string };
    } | null;
  }>;
}

export interface ClientNotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string | null;
  isRead: boolean;
  createdAt: string;
}
