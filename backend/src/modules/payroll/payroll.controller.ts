import { PayrollStatus, BonusStatus, BonusType, type Prisma } from "@prisma/client";
import { Response } from "express";
import PDFDocument from "pdfkit";
import prisma from "../../config/prisma";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";

const clean = (value: unknown) => {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str || null;
};
const enumValue = <T extends Record<string, string>>(values: T, value: unknown, fallback: T[keyof T]) =>
  Object.values(values).includes(String(value)) ? String(value) as T[keyof T] : fallback;

/* ─── Dashboard ─── */
export const dashboard = asyncHandler(async (req, res) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const currentPayroll = await prisma.payroll.findUnique({ where: { month_year: { month: currentMonth, year: currentYear } } });
  const [totalComponents, totalStructures, totalPayrolls, totalBonuses] = await Promise.all([
    prisma.salaryComponent.count({ where: { isActive: true } }),
    prisma.employeeSalaryStructure.count({ where: { isCurrent: true } }),
    prisma.payroll.count(),
    prisma.bonus.count(),
  ]);
  return successResponse(res, 200, "Payroll dashboard", {
    currentPayroll,
    totalComponents,
    totalStructures,
    totalPayrolls,
    totalBonuses,
    currentMonth,
    currentYear,
  });
});

/* ─── Salary Components ─── */
export const listComponents = asyncHandler(async (req, res) => {
  const components = await prisma.salaryComponent.findMany({ orderBy: { sortOrder: "asc" } });
  return successResponse(res, 200, "Components fetched", components);
});

export const createComponent = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.type) throw new AppError("name and type are required", 400);
  const component = await prisma.salaryComponent.create({
    data: {
      name: req.body.name,
      type: req.body.type,
      description: clean(req.body.description),
      isActive: req.body.isActive ?? true,
      sortOrder: req.body.sortOrder ?? 0,
    },
  });
  return successResponse(res, 201, "Component created", component);
});

export const updateComponent = asyncHandler(async (req, res) => {
  const data: Prisma.SalaryComponentUpdateInput = {};
  if (req.body.name) data.name = req.body.name;
  if (req.body.type) data.type = req.body.type;
  if (req.body.description !== undefined) data.description = clean(req.body.description);
  if (req.body.isActive !== undefined) data.isActive = req.body.isActive;
  if (req.body.sortOrder !== undefined) data.sortOrder = req.body.sortOrder;
  const component = await prisma.salaryComponent.update({ where: { id: req.params.id }, data });
  return successResponse(res, 200, "Component updated", component);
});

export const deleteComponent = asyncHandler(async (req, res) => {
  await prisma.salaryComponent.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Component deleted");
});

/* ─── Employee Salary Structure ─── */
export const listStructures = asyncHandler(async (req, res) => {
  const where: Prisma.EmployeeSalaryStructureWhereInput = { isCurrent: true };
  if (req.query.employeeId) where.employeeId = String(req.query.employeeId);
  const structures = await prisma.employeeSalaryStructure.findMany({
    where,
    include: { component: true, employee: { select: { id: true, employeeCode: true, user: { select: { id: true, name: true } } } } },
    orderBy: { effectiveFrom: "desc" },
  });
  return successResponse(res, 200, "Structures fetched", structures);
});

export const upsertStructure = asyncHandler(async (req, res) => {
  const { employeeId, componentId, amount, effectiveFrom } = req.body;
  if (!employeeId || !componentId || amount === undefined || !effectiveFrom) throw new AppError("employeeId, componentId, amount, effectiveFrom are required", 400);
  await prisma.employeeSalaryStructure.upsert({
    where: { employeeId_componentId_effectiveFrom: { employeeId, componentId, effectiveFrom: new Date(effectiveFrom) } },
    update: { amount, isCurrent: true },
    create: { employeeId, componentId, amount: parseFloat(amount), effectiveFrom: new Date(effectiveFrom), isCurrent: true },
  });
  return successResponse(res, 201, "Salary structure saved");
});

export const deleteStructure = asyncHandler(async (req, res) => {
  await prisma.employeeSalaryStructure.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Structure deleted");
});

/* ─── Bonuses / Incentives ─── */
export const listBonuses = asyncHandler(async (req, res) => {
  const where: Prisma.BonusWhereInput = {};
  if (req.query.employeeId) where.employeeId = String(req.query.employeeId);
  if (req.query.status) where.status = enumValue(BonusStatus, req.query.status, BonusStatus.APPROVED);
  const bonuses = await prisma.bonus.findMany({
    where,
    include: { employee: { select: { id: true, employeeCode: true, user: { select: { id: true, name: true } } } } },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(res, 200, "Bonuses fetched", bonuses);
});

export const createBonus = asyncHandler(async (req, res) => {
  if (!req.body.employeeId || !req.body.title || !req.body.amount) throw new AppError("employeeId, title, and amount are required", 400);
  const bonus = await prisma.bonus.create({
    data: {
      employeeId: req.body.employeeId,
      type: enumValue(BonusType, req.body.type, BonusType.PERFORMANCE),
      title: req.body.title,
      description: clean(req.body.description),
      amount: parseFloat(req.body.amount),
      currency: req.body.currency || "INR",
      approvedById: clean(req.body.approvedById),
      payDate: req.body.payDate ? new Date(req.body.payDate) : null,
    },
    include: { employee: { select: { id: true, employeeCode: true, user: { select: { id: true, name: true } } } } },
  });
  return successResponse(res, 201, "Bonus created", bonus);
});

export const updateBonus = asyncHandler(async (req, res) => {
  const data: Prisma.BonusUpdateInput = {};
  if (req.body.type) data.type = enumValue(BonusType, req.body.type, BonusType.PERFORMANCE);
  if (req.body.title) data.title = req.body.title;
  if (req.body.description !== undefined) data.description = clean(req.body.description);
  if (req.body.amount) data.amount = parseFloat(req.body.amount);
  if (req.body.status) data.status = enumValue(BonusStatus, req.body.status, BonusStatus.APPROVED);
  if (req.body.payDate) data.payDate = new Date(req.body.payDate);
  if (req.body.status === "PAID") data.paidAt = new Date();
  const bonus = await prisma.bonus.update({
    where: { id: req.params.id },
    data,
    include: { employee: { select: { id: true, employeeCode: true, user: { select: { id: true, name: true } } } } },
  });
  return successResponse(res, 200, "Bonus updated", bonus);
});

export const deleteBonus = asyncHandler(async (req, res) => {
  await prisma.bonus.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Bonus deleted");
});

/* ─── Payroll Runs ─── */
export const listPayrolls = asyncHandler(async (req, res) => {
  const payrolls = await prisma.payroll.findMany({
    orderBy: [{ year: "desc" }, { month: "desc" }],
    include: { _count: { select: { payslips: true } } },
  });
  return successResponse(res, 200, "Payrolls fetched", payrolls);
});

export const getPayroll = asyncHandler(async (req, res) => {
  const payroll = await prisma.payroll.findUnique({
    where: { id: req.params.id },
    include: {
      payslips: {
        include: {
          employee: { select: { id: true, employeeCode: true, user: { select: { id: true, name: true, email: true } } } },
          components: { include: { component: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      bonuses: { include: { employee: { select: { id: true, employeeCode: true, user: { select: { id: true, name: true } } } } } },
    },
  });
  if (!payroll) throw new AppError("Payroll not found", 404);
  return successResponse(res, 200, "Payroll fetched", payroll);
});

/* ─── Helper: calculate attendance for a month ─── */
async function getAttendanceStats(employeeId: string, month: number, year: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  const totalDays = endDate.getDate();
  const records = await prisma.attendance.findMany({
    where: { employeeId, attendanceDate: { gte: startDate, lte: endDate } },
  });
  let present = 0, absent = 0, late = 0, halfDay = 0, onLeave = 0;
  for (const r of records) {
    if (r.status === "PRESENT" || r.status === "LATE") present++;
    if (r.status === "ABSENT") absent++;
    if (r.status === "LATE") late++;
    if (r.status === "HALF_DAY") halfDay++;
    if (r.status === "ON_LEAVE") onLeave++;
  }
  const workedDays = present + halfDay;
  return { workingDays: totalDays, presentDays: workedDays, absentDays: absent, leaveDays: onLeave };
}

export const createPayroll = asyncHandler(async (req, res) => {
  const { month, year } = req.body;
  if (!month || !year) throw new AppError("month and year are required", 400);
  const existing = await prisma.payroll.findUnique({ where: { month_year: { month, year } } });
  if (existing) throw new AppError("Payroll already exists for this period", 409);
  const employees = await prisma.employee.findMany({ where: { employmentStatus: { in: ["ACTIVE", "ON_PROBATION"] } } });
  const structures = await prisma.employeeSalaryStructure.findMany({
    where: { employeeId: { in: employees.map((e) => e.id) }, isCurrent: true },
    include: { component: true },
  });

  const structMap: Record<string, { earnings: { componentId: string; amount: number }[]; deductions: { componentId: string; amount: number }[] }> = {};
  for (const s of structures) {
    if (!structMap[s.employeeId]) structMap[s.employeeId] = { earnings: [], deductions: [] };
    if (s.component.type === "EARNING") structMap[s.employeeId].earnings.push({ componentId: s.componentId, amount: s.amount });
    else structMap[s.employeeId].deductions.push({ componentId: s.componentId, amount: s.amount });
  }

  const payslips: Prisma.PayslipCreateManyInput[] = [];
  const payslipComponents: { earnings: { componentId: string; amount: number }[]; deductions: { componentId: string; amount: number }[] }[] = [];

  for (const emp of employees) {
    const s = structMap[emp.id];
    if (!s) continue;

    const att = await getAttendanceStats(emp.id, month, year);
    const workingDays = att.workingDays;
    let presentDays = att.presentDays;

    const leaveDays = att.leaveDays;
    const absentDays = att.absentDays;

    const monthlyGross = s.earnings.reduce((sum, c) => sum + c.amount, 0);
    const perDay = workingDays > 0 ? monthlyGross / workingDays : 0;
    const effectiveDays = presentDays + leaveDays;
    const adjustedGross = Math.round(perDay * effectiveDays);

    const totalDeductions = s.deductions.reduce((sum, c) => sum + c.amount, 0);
    const adjustedDeductions = workingDays > 0 ? Math.round((totalDeductions / workingDays) * effectiveDays) : 0;
    const netPay = adjustedGross - adjustedDeductions;

    payslips.push({
      payrollId: "",
      employeeId: emp.id,
      grossPay: adjustedGross,
      totalDeductions: adjustedDeductions,
      netPay,
      workingDays,
      presentDays,
      absentDays,
      leaveDays,
    });
    payslipComponents.push({ earnings: s.earnings, deductions: s.deductions });
  }

  if (payslips.length === 0) throw new AppError("No employees with salary structures", 400);

  const totalGross = payslips.reduce((s, p) => s + p.grossPay, 0);
  const totalDeductions = payslips.reduce((s, p) => s + p.totalDeductions, 0);
  const totalNet = payslips.reduce((s, p) => s + p.netPay, 0);

  const payroll = await prisma.payroll.create({
    data: {
      month, year,
      totalGross, totalDeductions, totalNet,
      employeeCount: payslips.length,
      payslips: {
        create: payslips.map((p, i) => ({
          employeeId: p.employeeId,
          grossPay: p.grossPay,
          totalDeductions: p.totalDeductions,
          netPay: p.netPay,
          workingDays: p.workingDays,
          presentDays: p.presentDays,
          absentDays: p.absentDays,
          leaveDays: p.leaveDays,
          components: {
            create: [
              ...payslipComponents[i].earnings.map((c) => ({ componentId: c.componentId, amount: c.amount })),
              ...payslipComponents[i].deductions.map((c) => ({ componentId: c.componentId, amount: c.amount })),
            ],
          },
        })),
      },
    },
    include: { payslips: { include: { employee: { select: { id: true, employeeCode: true, user: { select: { id: true, name: true } } } }, components: { include: { component: true } } } } },
  });
  return successResponse(res, 201, "Payroll created", payroll);
});

export const processPayroll = asyncHandler(async (req, res) => {
  const payroll = await prisma.payroll.update({
    where: { id: req.params.id },
    data: { status: PayrollStatus.PROCESSED, processedAt: new Date() },
  });
  return successResponse(res, 200, "Payroll processed", payroll);
});

export const approvePayroll = asyncHandler(async (req, res) => {
  const payroll = await prisma.payroll.update({
    where: { id: req.params.id },
    data: { status: PayrollStatus.PROCESSED, processedAt: new Date() },
  });
  return successResponse(res, 200, "Payroll approved", payroll);
});

export const cancelPayroll = asyncHandler(async (req, res) => {
  const payroll = await prisma.payroll.update({
    where: { id: req.params.id },
    data: { status: PayrollStatus.CANCELLED },
  });
  return successResponse(res, 200, "Payroll cancelled", payroll);
});

export const deletePayroll = asyncHandler(async (req, res) => {
  await prisma.payroll.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Payroll deleted");
});

/* ─── Payslip PDF Generation ─── */
export const generatePayslipPdf = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payslip = await prisma.payslip.findUnique({
    where: { id },
    include: {
      employee: { include: { user: true, designation: true, department: true } },
      payroll: true,
      components: { include: { component: true } },
    },
  });
  if (!payslip) throw new AppError("Payslip not found", 404);

  const doc = new PDFDocument({ margin: 40, size: "A4" });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="payslip-${payslip.employee.employeeCode}-${payslip.payroll.month}-${payslip.payroll.year}.pdf"`);
  doc.pipe(res);

  const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const period = `${monthNames[payslip.payroll.month]} ${payslip.payroll.year}`;
  const empName = payslip.employee.user.name;
  const empCode = payslip.employee.employeeCode;
  const dept = payslip.employee.department?.name || "-";
  const desig = payslip.employee.designation?.name || "-";

  /* Header */
  doc.fontSize(20).font("Helvetica-Bold").text("AdScale One ERP", 40, 40);
  doc.fontSize(10).font("Helvetica").text("Payslip", 40, 68);
  doc.fontSize(8).fillColor("#666").text(`Period: ${period}`, 40, 84);

  doc.fontSize(8).fillColor("#666").text(`Generated: ${new Date().toLocaleDateString()}`, 400, 84, { align: "right" });

  /* Employee Info */
  doc.fillColor("#000").fontSize(10).font("Helvetica-Bold");
  doc.text(empName, 40, 120);
  doc.fontSize(8).font("Helvetica").fillColor("#444");
  doc.text(`Employee Code: ${empCode}  |  Department: ${dept}  |  Designation: ${desig}`, 40, 137);

  /* Attendance Summary */
  doc.fontSize(8).fillColor("#444");
  doc.text(`Working Days: ${payslip.workingDays}  |  Present: ${payslip.presentDays}  |  Absent: ${payslip.absentDays}  |  Leave: ${payslip.leaveDays}`, 40, 152);

  doc.moveTo(40, 170).lineTo(555, 170).strokeColor("#ccc").stroke();

  /* Earnings Table */
  let y = 185;
  doc.fontSize(9).font("Helvetica-Bold").fillColor("#333");
  doc.text("Earnings", 40, y);
  doc.text("Amount", 500, y, { align: "right" });
  y += 18;
  doc.moveTo(40, y - 4).lineTo(555, y - 4).strokeColor("#eee").stroke();

  doc.font("Helvetica").fillColor("#444");
  for (const comp of payslip.components) {
    if (comp.component.type !== "EARNING") continue;
    doc.fontSize(9).text(comp.component.name, 50, y);
    doc.text(`₹${comp.amount.toLocaleString()}`, 500, y, { align: "right" });
    y += 16;
  }

  /* Deductions Table */
  y += 8;
  doc.fontSize(9).font("Helvetica-Bold").fillColor("#333");
  doc.text("Deductions", 40, y);
  doc.text("Amount", 500, y, { align: "right" });
  y += 18;
  doc.moveTo(40, y - 4).lineTo(555, y - 4).strokeColor("#eee").stroke();

  doc.font("Helvetica").fillColor("#444");
  for (const comp of payslip.components) {
    if (comp.component.type !== "DEDUCTION") continue;
    doc.fontSize(9).text(comp.component.name, 50, y);
    doc.text(`₹${comp.amount.toLocaleString()}`, 500, y, { align: "right" });
    y += 16;
  }

  /* Total Line */
  y += 12;
  doc.moveTo(40, y - 4).lineTo(555, y - 4).strokeColor("#999").stroke();
  y += 6;
  doc.fontSize(11).font("Helvetica-Bold").fillColor("#000");
  doc.text("Net Pay", 40, y);
  doc.text(`₹${payslip.netPay.toLocaleString()}`, 500, y, { align: "right" });

  y += 24;
  doc.fontSize(8).font("Helvetica").fillColor("#999");
  doc.text("This is a computer-generated payslip from AdScale One ERP.", 40, y);

  doc.end();
});