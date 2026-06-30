export interface PayrollDashboard {
  currentPayroll: PayrollRun | null;
  totalComponents: number;
  totalStructures: number;
  totalPayrolls: number;
  currentMonth: number;
  currentYear: number;
}

export interface SalaryComponent {
  id: string;
  name: string;
  type: "EARNING" | "DEDUCTION";
  description: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface EmployeeSalaryStructure {
  id: string;
  employeeId: string;
  componentId: string;
  amount: number;
  effectiveFrom: string;
  isCurrent: boolean;
  component: SalaryComponent;
  employee: { id: string; employeeCode: string; user: { id: string; name: string } };
}

export interface PayrollRun {
  id: string;
  month: number;
  year: number;
  status: "DRAFT" | "PROCESSED" | "CANCELLED";
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  employeeCount: number;
  processedAt: string | null;
  notes: string | null;
  payslips?: Payslip[];
  _count?: { payslips: number };
}

export interface Payslip {
  id: string;
  payrollId: string;
  employeeId: string;
  grossPay: number;
  totalDeductions: number;
  netPay: number;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  remarks: string | null;
  employee: { id: string; employeeCode: string; user: { id: string; name: string; email: string } };
  components: PayslipComponent[];
}

export interface PayslipComponent {
  id: string;
  payslipId: string;
  componentId: string;
  amount: number;
  component: SalaryComponent;
}
