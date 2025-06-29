import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

let quotaAlertSent = false;

export async function sendQuotaExceededAlert(errorMessage: string) {
  if (quotaAlertSent) return;
  quotaAlertSent = true;

  try {
    await resend.emails.send({
      from: "iassets-news@origemx.com",
      to: "paulo@origemx.com",
      subject: "iAssets News – Crédito da OpenAI excedido",
      html: `<p>O pipeline de geração de artigos foi interrompido porque o crédito da OpenAI foi excedido.</p><pre>${errorMessage}</pre>`
    });
    console.log("[Email] Quota alert sent to paulo@origemx.com");
  } catch (err) {
    console.error("[Email] Failed to send quota alert", err);
  }
} 