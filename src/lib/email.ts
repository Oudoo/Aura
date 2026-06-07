import nodemailer, { type Transporter } from "nodemailer";

/**
 * SMTP email for Aura — sends client proposals and invoices from your own
 * mailbox (e.g. info@getaura.business). All credentials come from environment
 * variables so nothing sensitive is ever committed:
 *
 *   SMTP_HOST       e.g. smtp.hostinger.com
 *   SMTP_PORT       465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER       info@getaura.business
 *   SMTP_PASS       the mailbox password (set in Hostinger env, never in git)
 *   SMTP_FROM       optional display-from, defaults to "Aura <SMTP_USER>"
 *   SMTP_SECURE     optional "true"/"false"; defaults to true when port is 465
 */

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

let cached: Transporter | null = null;

function getTransport(): Transporter {
  if (cached) return cached;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure =
    process.env.SMTP_SECURE != null ? process.env.SMTP_SECURE === "true" : port === 465;

  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return cached;
}

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer | string; contentType?: string }[];
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!isEmailConfigured()) {
    return {
      success: false,
      error: "Email is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in your environment.",
    };
  }

  const from = process.env.SMTP_FROM || `Aura <${process.env.SMTP_USER}>`;

  try {
    const info = await getTransport().sendMail({
      from,
      to: input.to,
      subject: input.subject,
      text: input.text || stripHtml(input.html),
      html: input.html,
      replyTo: input.replyTo,
      attachments: input.attachments,
    });
    return { success: true, messageId: info.messageId };
  } catch (e) {
    console.error("[email] send failed:", e);
    const msg = e instanceof Error ? e.message : "Unknown SMTP error";
    return { success: false, error: msg };
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Brand-consistent HTML wrapper for all outbound Aura email. */
export function emailShell(bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
    <div style="background:#0f172a;padding:24px 32px">
      <span style="color:#fff;font-size:22px;font-weight:bold;letter-spacing:1px">AURA</span>
    </div>
    <div style="padding:32px">${bodyHtml}</div>
    <div style="padding:20px 32px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px">
      Aura · Strategic Business Solutions · <a href="https://getaura.business" style="color:#0284c7;text-decoration:none">getaura.business</a>
    </div>
  </div></body></html>`;
}
