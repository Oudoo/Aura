import { CopilotClient } from "./CopilotClient";

export const dynamic = "force-dynamic";

export default function CopilotPage() {
  return (
    <div className="p-6 md:p-10 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-platinum mb-2 flex items-center gap-2">
          Aura Copilot
        </h1>
        <p className="text-slate">
          Ask about your business in plain language — Copilot answers instantly from your live data.
        </p>
      </div>
      <CopilotClient />
    </div>
  );
}
