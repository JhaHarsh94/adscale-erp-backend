import { Router } from "express";
import { protect, allowRoles } from "../../middlewares/auth.middleware";
import {
  getDashboard,
  listInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice,
  listPayments, createPayment, deletePayment,
  listReceipts, createReceipt, deleteReceipt,
  listExpenses, createExpense, updateExpense, deleteExpense,
  listVendors, createVendor, updateVendor, deleteVendor,
  listVendorPayments, createVendorPayment, deleteVendorPayment,
  listTaxDetails, createTaxDetail, updateTaxDetail, deleteTaxDetail,
} from "./finance.controller";

const router = Router();

const roles = ["SUPER_ADMIN", "DIRECTOR", "OPERATIONS_MANAGER", "ACCOUNTS", "SALES_MANAGER"];

router.use(protect);
router.use(allowRoles(...roles));

router.get("/dashboard", getDashboard);

router.get("/invoices", listInvoices);
router.get("/invoices/:id", getInvoice);
router.post("/invoices", createInvoice);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

router.get("/payments", listPayments);
router.post("/payments", createPayment);
router.delete("/payments/:id", deletePayment);

router.get("/receipts", listReceipts);
router.post("/receipts", createReceipt);
router.delete("/receipts/:id", deleteReceipt);

router.get("/expenses", listExpenses);
router.post("/expenses", createExpense);
router.put("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);

router.get("/vendors", listVendors);
router.post("/vendors", createVendor);
router.put("/vendors/:id", updateVendor);
router.delete("/vendors/:id", deleteVendor);

router.get("/vendor-payments", listVendorPayments);
router.post("/vendor-payments", createVendorPayment);
router.delete("/vendor-payments/:id", deleteVendorPayment);

router.get("/tax-details", listTaxDetails);
router.post("/tax-details", createTaxDetail);
router.put("/tax-details/:id", updateTaxDetail);
router.delete("/tax-details/:id", deleteTaxDetail);

export default router;