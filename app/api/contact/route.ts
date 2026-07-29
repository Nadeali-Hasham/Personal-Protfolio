import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 4;
const DEFAULT_TO = "syednadealihashamshah@gmail.com";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function rateLimit(key: string) {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  existing.count += 1;
  return existing.count > MAX_REQUESTS;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const headerList = headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again after 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      website?: string;
    };

    // Honeypot
    if (clean(body.website)) {
      return NextResponse.json({ success: true });
    }

    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const subject = clean(body.subject);
    const message = clean(body.message);

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (!subject || subject.length < 4) {
      return NextResponse.json({ error: "Subject must be at least 4 characters." }, { status: 400 });
    }
    if (!message || message.length < 20) {
      return NextResponse.json({ error: "Message must be at least 20 characters." }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
    const fromFormatted = fromEmail.includes("<")
      ? fromEmail
      : `Portfolio <${fromEmail}>`;

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromFormatted,
          to: [toEmail],
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          html: `
            <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
              <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:28px 32px">
                <h1 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:0.5px">New Portfolio Message</h1>
                <p style="margin:6px 0 0;font-size:13px;color:#94a3b8">Someone reached out through your portfolio</p>
              </div>
              <div style="padding:28px 32px">
                <table style="width:100%;border-collapse:collapse;font-size:15px;color:#334155">
                  <tr>
                    <td style="padding:10px 0;color:#64748b;width:80px;vertical-align:top">From</td>
                    <td style="padding:10px 0;font-weight:600">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#64748b;vertical-align:top">Email</td>
                    <td style="padding:10px 0"><a href="mailto:${escapeHtml(email)}" style="color:#3b82f6;text-decoration:none;font-weight:500">${escapeHtml(email)}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#64748b;vertical-align:top">Subject</td>
                    <td style="padding:10px 0;font-weight:600">${escapeHtml(subject)}</td>
                  </tr>
                </table>
                <div style="margin-top:20px;padding:20px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0">
                  <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8">Message</p>
                  <p style="margin:0;font-size:15px;line-height:1.7;color:#1e293b;white-space:pre-line">${escapeHtml(message)}</p>
                </div>
                <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0;text-align:center">
                  <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:10px 28px;background:#0f172a;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px">Reply to ${escapeHtml(name)}</a>
                </div>
              </div>
              <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center">
                <p style="margin:0;font-size:12px;color:#94a3b8">Nade Ali Hasham — Portfolio Contact Form</p>
              </div>
            </div>
          `,
          text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        id?: string;
        message?: string;
        statusCode?: number;
      };

      if (!res.ok) {
        console.error("Resend API error:", data);
        return NextResponse.json(
          {
            error:
              typeof data?.message === "string"
                ? data.message
                : "Failed to send message. Please try again.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Message sent. I will reply soon.",
        id: data?.id,
      });
    }

    // No Resend key — mailto fallback
    const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailto = `mailto:${toEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return NextResponse.json({
      success: true,
      method: "mailto",
      mailto,
      message: "Message sent. I will reply soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
