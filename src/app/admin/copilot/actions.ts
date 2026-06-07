"use server";

import { assertAuthenticated } from "@/lib/auth";
import { answerQuestion, type CopilotAnswer } from "@/lib/copilot";

export async function askCopilotAction(
  question: string,
): Promise<{ success: boolean; answer?: CopilotAnswer; error?: string }> {
  try {
    await assertAuthenticated();
    const answer = await answerQuestion(question);
    return { success: true, answer };
  } catch (e) {
    console.error("askCopilotAction failed:", e);
    return { success: false, error: "Copilot couldn't reach your data. Please try again." };
  }
}
