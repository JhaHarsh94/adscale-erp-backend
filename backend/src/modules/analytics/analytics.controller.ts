import prisma from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";
import type { AuthRequest } from "../../middlewares/auth.middleware";

const userSelect = { select: { id: true, name: true, email: true } };
const clientSelect = { select: { id: true, name: true } };
const deptSelect = { select: { id: true, name: true } };
const desigSelect = { select: { id: true, name: true } };

export const getCeoDashboard = asyncHandler(async (req: AuthRequest, res) => {
  const [
    totalEmployees,
    activeEmployees,
    totalProjects,
    activeProjects,
    totalTickets,
    openTickets,
    totalLeads,
    convertedLeads,
    totalClients,
    totalInvoices,
    totalPayments,
    totalExpenses,
    invoiceAgg,
    paymentAgg,
    expenseAgg,
    todayAttendance,
    totalAttendance,
    totalUsers,
    departments,
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.employee.count({ where: { employmentStatus: "ACTIVE" } }),
    prisma.project.count(),
    prisma.project.count({ where: { status: { notIn: ["COMPLETED", "CANCELLED"] } } }),
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: { notIn: ["CLOSED", "RESOLVED"] } } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { convertedClientId: { not: null } } }),
    prisma.client.count(),
    prisma.invoice.count(),
    prisma.payment.count(),
    prisma.expense.count(),
    prisma.invoice.aggregate({ _sum: { total: true, paidAmount: true, balanceDue: true } }),
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.attendance.count({ where: { attendanceDate: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
    prisma.attendance.count(),
    prisma.user.count(),
    prisma.department.findMany({ include: { _count: { select: { employees: true } } } }),
  ]);

  const revenue = invoiceAgg._sum.total || 0;
  const collected = paymentAgg._sum.amount || 0;
  const expenses = expenseAgg._sum.amount || 0;
  const profit = collected - expenses;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const departmentPerformance = departments.map((d) => ({
    id: d.id,
    name: d.name,
    employeeCount: d._count.employees,
  }));

  return successResponse(res, 200, "CEO Dashboard", {
    revenue,
    collected,
    outstanding: invoiceAgg._sum.balanceDue || 0,
    expenses,
    profit,
    profitMargin: revenue > 0 ? Math.round((profit / revenue) * 100) : 0,
    totalInvoices,
    totalPayments,
    totalExpenses,
    employees: { total: totalEmployees, active: activeEmployees },
    projects: { total: totalProjects, active: activeProjects },
    tickets: { total: totalTickets, open: openTickets },
    leads: { total: totalLeads, converted: convertedLeads, conversionRate },
    clients: totalClients,
    attendance: { today: todayAttendance, total: totalAttendance },
    users: totalUsers,
    departments: departmentPerformance,
  });
});

export const getRevenueAnalytics = asyncHandler(async (req: AuthRequest, res) => {
  const { period = "MONTHLY", year } = req.query;
  const targetYear = year ? parseInt(String(year)) : new Date().getFullYear();

  let snapshots;
  if (period === "MONTHLY") {
    snapshots = await prisma.analyticsSnapshot.findMany({
      where: { type: "REVENUE", period: "MONTHLY", date: { gte: new Date(targetYear, 0, 1), lt: new Date(targetYear + 1, 0, 1) } },
      orderBy: { date: "asc" },
    });
  } else {
    snapshots = await prisma.analyticsSnapshot.findMany({
      where: { type: "REVENUE", period: String(period) },
      orderBy: { date: "desc" },
      take: 12,
    });
  }

  return successResponse(res, 200, "Revenue analytics", snapshots);
});

export const getEmployeeAnalytics = asyncHandler(async (req: AuthRequest, res) => {
  const [total, active, byDepartment, recentJoiners] = await Promise.all([
    prisma.employee.count(),
    prisma.employee.count({ where: { employmentStatus: "ACTIVE" } }),
    prisma.department.findMany({
      include: { _count: { select: { employees: true } } },
    }),
    prisma.employee.findMany({
      orderBy: { joiningDate: "desc" },
      take: 10,
      include: {
        user: userSelect,
        department: deptSelect,
        designation: desigSelect,
      },
    }),
  ]);

  return successResponse(res, 200, "Employee analytics", {
    total,
    active,
    inactive: total - active,
    byDepartment: byDepartment.map((d) => ({ id: d.id, name: d.name, count: d._count.employees })),
    recentJoiners: recentJoiners.map((e) => ({
      id: e.id,
      fullName: e.user.name,
      employeeCode: e.employeeCode,
      joiningDate: e.joiningDate,
      department: e.department,
      designation: e.designation,
    })),
  });
});

export const getProjectAnalytics = asyncHandler(async (req: AuthRequest, res) => {
  const [total, byStatus, recentProjects] = await Promise.all([
    prisma.project.count(),
    prisma.project.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { client: clientSelect } }),
  ]);

  return successResponse(res, 200, "Project analytics", {
    total,
    byStatus: byStatus.map((s) => ({ status: s.status, count: s._count.id })),
    recentProjects,
  });
});

export const getTicketAnalytics = asyncHandler(async (req: AuthRequest, res) => {
  const today = new Date();
  const [total, byStatus, byPriority, overdue] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.ticket.groupBy({ by: ["priority"], _count: { id: true } }),
    prisma.ticket.count({ where: { status: { notIn: ["CLOSED", "RESOLVED"] }, dueDate: { lt: today } } }),
  ]);

  return successResponse(res, 200, "Ticket analytics", {
    total,
    byStatus: byStatus.map((s) => ({ status: s.status, count: s._count.id })),
    byPriority: byPriority.map((p) => ({ priority: p.priority, count: p._count.id })),
    overdue,
  });
});

export const getAttendanceAnalytics = asyncHandler(async (req: AuthRequest, res) => {
  const { from, to } = req.query;
  const startDate = from ? new Date(String(from)) : new Date(new Date().setDate(new Date().getDate() - 30));
  const endDate = to ? new Date(String(to)) : new Date();

  const [totalRecords, presentCount, lateCount, absentCount, halfDayCount] = await Promise.all([
    prisma.attendance.count({ where: { attendanceDate: { gte: startDate, lte: endDate } } }),
    prisma.attendance.count({ where: { attendanceDate: { gte: startDate, lte: endDate }, status: "PRESENT" } }),
    prisma.attendance.count({ where: { attendanceDate: { gte: startDate, lte: endDate }, status: "LATE" } }),
    prisma.attendance.count({ where: { attendanceDate: { gte: startDate, lte: endDate }, status: "ABSENT" } }),
    prisma.attendance.count({ where: { attendanceDate: { gte: startDate, lte: endDate }, status: "HALF_DAY" } }),
  ]);

  return successResponse(res, 200, "Attendance analytics", {
    totalRecords,
    present: presentCount,
    late: lateCount,
    absent: absentCount,
    halfDay: halfDayCount,
    attendanceRate: totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0,
  });
});

export const getLeadAnalytics = asyncHandler(async (req: AuthRequest, res) => {
  const [total, byStatus, bySource, converted] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.lead.groupBy({ by: ["source"], _count: { id: true } }),
    prisma.lead.findMany({
      where: { convertedClientId: { not: null } },
      orderBy: { updatedAt: "desc" },
      take: 10,
      include: { convertedClient: clientSelect },
    }),
  ]);

  return successResponse(res, 200, "Lead analytics", {
    total,
    conversionRate: total > 0 ? Math.round((converted.length / total) * 100) : 0,
    byStatus: byStatus.map((s) => ({ status: s.status, count: s._count.id })),
    bySource: bySource.map((s) => ({ source: s.source, count: s._count.id })),
    convertedClients: converted.filter((l) => l.convertedClient).map((l) => ({ id: l.id, clientName: l.convertedClient?.name })),
  });
});

export const getProductivityAnalytics = asyncHandler(async (req: AuthRequest, res) => {
  const { from, to } = req.query;
  const startDate = from ? new Date(String(from)) : new Date(new Date().setDate(new Date().getDate() - 30));
  const endDate = to ? new Date(String(to)) : new Date();

  const [totalWorkLogs, totalDuration, topEmployees] = await Promise.all([
    prisma.workLog.count({ where: { date: { gte: startDate, lte: endDate } } }),
    prisma.workLog.aggregate({ where: { date: { gte: startDate, lte: endDate } }, _sum: { durationMins: true } }),
    prisma.workLog.groupBy({ by: ["employeeId"], _sum: { durationMins: true }, orderBy: { _sum: { durationMins: "desc" } }, take: 10 }),
  ]);

  const employeeIds = topEmployees.map((e) => e.employeeId);
  const employees = employeeIds.length > 0 ? await prisma.employee.findMany({
    where: { id: { in: employeeIds } },
    select: { id: true, employeeCode: true, department: deptSelect, user: userSelect },
  }) : [];

  return successResponse(res, 200, "Productivity analytics", {
    totalWorkLogs,
    totalHours: Math.round((totalDuration._sum.durationMins || 0) / 60),
    topEmployees: topEmployees.map((e) => {
      const emp = employees.find((em) => em.id === e.employeeId);
      return {
        employeeId: e.employeeId,
        employeeName: emp?.user?.name || "Unknown",
        employeeCode: emp?.employeeCode || "",
        department: emp?.department?.name || "",
        hours: Math.round((e._sum.durationMins || 0) / 60),
      };
    }),
  });
});

export const getDepartmentPerformance = asyncHandler(async (req: AuthRequest, res) => {
  const departments = await prisma.department.findMany({
    include: {
      _count: { select: { employees: true } },
      employees: {
        select: { id: true, employmentStatus: true },
      },
    },
  });

  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

  const performance = await Promise.all(departments.map(async (dept) => {
    const employeeIds = dept.employees.map((e) => e.id);
    const activeCount = dept.employees.filter((e) => e.employmentStatus === "ACTIVE").length;
    const workLogResult = employeeIds.length > 0 ? await prisma.workLog.aggregate({
      where: { employeeId: { in: employeeIds }, date: { gte: thirtyDaysAgo } },
      _sum: { durationMins: true },
    }) : { _sum: { durationMins: 0 } };

    return {
      id: dept.id,
      name: dept.name,
      totalEmployees: dept._count.employees,
      activeEmployees: activeCount,
      hoursLogged: Math.round((workLogResult._sum.durationMins || 0) / 60),
    };
  }));

  return successResponse(res, 200, "Department performance", performance);
});

export const getClientSatisfaction = asyncHandler(async (req: AuthRequest, res) => {
  const [totalClients, activeProjects, openTickets, resolvedTickets] = await Promise.all([
    prisma.client.count(),
    prisma.project.count({ where: { status: { notIn: ["COMPLETED", "CANCELLED"] } } }),
    prisma.ticket.count({ where: { status: { notIn: ["CLOSED", "RESOLVED"] } } }),
    prisma.ticket.count({ where: { status: "RESOLVED" } }),
  ]);

  const satisfactionScore = resolvedTickets + openTickets > 0
    ? Math.round((resolvedTickets / (resolvedTickets + openTickets)) * 100)
    : 100;

  return successResponse(res, 200, "Client satisfaction", {
    totalClients,
    activeProjects,
    openTickets,
    resolvedTickets,
    satisfactionScore,
  });
});

export const listSnapshots = asyncHandler(async (req: AuthRequest, res) => {
  const { type, period, limit } = req.query;
  const where: Record<string, unknown> = {};
  if (type) where.type = String(type);
  if (period) where.period = String(period);
  const snapshots = await prisma.analyticsSnapshot.findMany({
    where,
    orderBy: { date: "desc" },
    take: limit ? parseInt(String(limit)) : 50,
  });
  return successResponse(res, 200, "Snapshots", snapshots);
});

export const createSnapshot = asyncHandler(async (req: AuthRequest, res) => {
  const { type, label, value, metadata, period, date } = req.body;
  if (!type || !label || value === undefined) throw new AppError("type, label, and value are required", 400);
  const snapshot = await prisma.analyticsSnapshot.create({
    data: { type, label, value: Number(value), metadata, period: period || "DAILY", date: date ? new Date(date) : new Date() },
  });
  return successResponse(res, 201, "Snapshot created", snapshot);
});

export const listKpis = asyncHandler(async (req: AuthRequest, res) => {
  const { category } = req.query;
  const where: Record<string, unknown> = { isActive: true };
  if (category) where.category = String(category);
  const kpis = await prisma.kpiMetric.findMany({ where, orderBy: { category: "asc" } });
  return successResponse(res, 200, "KPIs", kpis);
});

export const createKpi = asyncHandler(async (req: AuthRequest, res) => {
  const { name, label, category, value, target, unit, trend, icon, color, description } = req.body;
  if (!name || !label || !category) throw new AppError("name, label, and category are required", 400);
  const kpi = await prisma.kpiMetric.create({
    data: { name, label, category, value: Number(value || 0), target: target ? Number(target) : null, unit: unit || "count", trend: trend || "neutral", icon, color, description },
  });
  return successResponse(res, 201, "KPI created", kpi);
});

export const updateKpi = asyncHandler(async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  const { value, target, trend, isActive } = req.body;
  const kpi = await prisma.kpiMetric.update({
    where: { id },
    data: { value: value !== undefined ? Number(value) : undefined, target: target !== undefined ? Number(target) : undefined, trend, isActive },
  });
  return successResponse(res, 200, "KPI updated", kpi);
});

export const deleteKpi = asyncHandler(async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  await prisma.kpiMetric.delete({ where: { id } });
  return successResponse(res, 200, "KPI deleted");
});

export const listWidgets = asyncHandler(async (req: AuthRequest, res) => {
  const widgets = await prisma.dashboardWidget.findMany({
    where: { userId: req.user.id },
    orderBy: { position: "asc" },
  });
  return successResponse(res, 200, "Widgets", widgets);
});

export const createWidget = asyncHandler(async (req: AuthRequest, res) => {
  const { type, config, position, size } = req.body;
  if (!type || !config) throw new AppError("type and config are required", 400);
  const widget = await prisma.dashboardWidget.create({
    data: { userId: req.user.id, type, config, position: position || 0, size: size || "1x1" },
  });
  return successResponse(res, 201, "Widget created", widget);
});

export const updateWidget = asyncHandler(async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  const { config, position, size, isVisible } = req.body;
  const widget = await prisma.dashboardWidget.update({
    where: { id },
    data: { config, position, size, isVisible },
  });
  return successResponse(res, 200, "Widget updated", widget);
});

export const deleteWidget = asyncHandler(async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  const widget = await prisma.dashboardWidget.findUnique({ where: { id } });
  if (!widget) throw new AppError("Widget not found", 404);
  if (widget.userId !== req.user.id && req.user.role !== "SUPER_ADMIN") throw new AppError("Unauthorized", 403);
  await prisma.dashboardWidget.delete({ where: { id } });
  return successResponse(res, 200, "Widget deleted");
});

export const listReportExports = asyncHandler(async (req: AuthRequest, res) => {
  const exports = await prisma.reportExport.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(res, 200, "Report exports", exports);
});

export const createReportExport = asyncHandler(async (req: AuthRequest, res) => {
  const { title, type, format, config } = req.body;
  if (!title || !type) throw new AppError("title and type are required", 400);
  const report = await prisma.reportExport.create({
    data: { userId: req.user.id, title, type, format: format || "PDF", config: config || {} },
  });
  return successResponse(res, 201, "Report export created", report);
});
