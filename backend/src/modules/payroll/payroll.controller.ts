import { PayrollStatus, type Prisma } from "@prisma/client";
import { Response } from "express";
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
  const [totalComponents, totalStructures, totalPayrolls] = await Promise.all([
    prisma.salaryComponent.count({ where: { isActive: true } }),
    prisma.employeeSalaryStructure.count({ where: { isCurrent: true } }),
    prisma.payroll.count(),
  ]);
  return successResponse(res, 200, "Payroll dashboard", {
    currentPayroll,
    totalComponents,
    totalStructures,
    totalPayrolls,
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
    include: { payslips: { include: { employee: { select: { id: true, employeeCode: true, user: { select: { id: true, name: true, email: true } } } }, components: { include: { component: true } } }, orderBy: { createdAt: "desc" } } },
  });
  if (!payroll) throw new AppError("Payroll not found", 404);
  return successResponse(res, 200, "Payroll fetched", payroll);
});

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
    const grossPay = s.earnings.reduce((sum, c) => sum + c.amount, 0);
    const totalDeductions = s.deductions.reduce((sum, c) => sum + c.amount, 0);
    const netPay = grossPay - totalDeductions;
    payslips.push({ payrollId: "", employeeId: emp.id, grossPay, totalDeductions, netPay, workingDays: 0, presentDays: 0, absentDays: 0, leaveDays: 0 });
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

export const deletePayroll = asyncHandler(async (req, res) => {
  await prisma.payroll.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Payroll deleted");
});
