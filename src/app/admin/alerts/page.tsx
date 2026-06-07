import { getSmartAlerts, isWhatsAppAutoSendEnabled, type SmartAlert } from "@/lib/alerts";
import { AlertsClient } from "./AlertsClient";

export const dynamic = "force-dynamic";

export default async function AlertsPage() {
  let alerts: SmartAlert[] = [];
  try {
    alerts = await getSmartAlerts();
  } catch (e) {
    console.error("Smart alerts query failed:", e);
  }

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-platinum mb-2">Smart Alerts</h1>
        <p className="text-slate">
          Aura watches for overdue invoices and missed milestones, and prepares a WhatsApp
          message you can send in one tap.
        </p>
      </div>

      <AlertsClient initialAlerts={alerts} autoSendEnabled={isWhatsAppAutoSendEnabled()} />
    </div>
  );
}
