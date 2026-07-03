import { importLeadsFromSheet } from "./googleSheets.service";
import { getIO } from "../config/socket";

let intervalId: ReturnType<typeof setInterval> | null = null;

const POLL_INTERVAL_MS = 2 * 60 * 1000;

export function startSheetPoller(): void {
  if (intervalId) return;

  const poll = async () => {
    try {
      const result = await importLeadsFromSheet();
      if (result.imported > 0) {
        console.log(
          `[SheetPoller] Auto-imported ${result.imported} new leads from sheet`
        );
        try {
          getIO().emit("leads:imported", { count: result.imported });
        } catch {}
      }
    } catch (error) {
      console.error("[SheetPoller] Poll failed:", error);
    }
  };

  poll();
  intervalId = setInterval(poll, POLL_INTERVAL_MS);
  console.log(`[SheetPoller] Started — checking sheet every ${POLL_INTERVAL_MS / 1000}s`);
}

export function stopSheetPoller(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("[SheetPoller] Stopped");
  }
}
