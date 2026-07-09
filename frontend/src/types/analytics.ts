export interface CeoDashboard {
  revenue: number;
  collected: number;
  outstanding: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  totalInvoices: number;
  totalPayments: number;
  totalExpenses: number;
  employees: { total: number; active: number };
  projects: { total: number; active: number };
  tickets: { total: number; open: number };
  leads: { total: number; converted: number; conversionRate: number };
  clients: number;
  attendance: { today: number; total: number };
  users: number;
  departments: { id: string; name: string; employeeCount: number }[];
}

export interface RevenueData {
  id: string;
  type: string;
  label: string;
  value: number;
  period: string;
  date: string;
}

export interface EmployeeAnalytics {
  total: number;
  active: number;
  inactive: number;
  byDepartment: { id: string; name: string; count: number }[];
  recentJoiners: {
    id: string;
    fullName: string;
    employeeCode: string;
    joiningDate: string;
    department: { id: string; name: string } | null;
    designation: { id: string; name: string } | null;
  }[];
}

export interface ProjectAnalytics {
  total: number;
  byStatus: { status: string; count: number }[];
  recentProjects: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
    client: { id: string; name: string } | null;
  }[];
}

export interface TicketAnalytics {
  total: number;
  byStatus: { status: string; count: number }[];
  byPriority: { priority: string; count: number }[];
  overdue: number;
}

export interface AttendanceAnalytics {
  totalRecords: number;
  present: number;
  late: number;
  absent: number;
  halfDay: number;
  attendanceRate: number;
}

export interface LeadAnalytics {
  total: number;
  conversionRate: number;
  byStatus: { status: string; count: number }[];
  bySource: { source: string; count: number }[];
  convertedClients: { id: string; clientName: string | undefined }[];
}

export interface ProductivityAnalytics {
  totalWorkLogs: number;
  totalHours: number;
  topEmployees: {
    employeeId: string;
    employeeName: string;
    employeeCode: string;
    department: string;
    hours: number;
  }[];
}

export interface DepartmentPerformance {
  id: string;
  name: string;
  totalEmployees: number;
  activeEmployees: number;
  hoursLogged: number;
}

export interface ClientSatisfaction {
  totalClients: number;
  activeProjects: number;
  openTickets: number;
  resolvedTickets: number;
  satisfactionScore: number;
}

export interface AnalyticsSnapshot {
  id: string;
  type: string;
  label: string;
  value: number;
  metadata: Record<string, unknown> | null;
  period: string;
  date: string;
  createdAt: string;
}

export interface KpiMetric {
  id: string;
  name: string;
  label: string;
  category: string;
  value: number;
  target: number | null;
  unit: string;
  trend: string;
  icon: string | null;
  color: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardWidget {
  id: string;
  userId: string;
  type: string;
  config: Record<string, unknown>;
  position: number;
  size: string;
  isVisible: boolean;
  createdAt: string;
}

export interface ReportExport {
  id: string;
  userId: string;
  title: string;
  type: string;
  format: string;
  config: Record<string, unknown> | null;
  fileUrl: string | null;
  status: string;
  generatedAt: string | null;
  createdAt: string;
}
