import { headers } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot
};

type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 4;
const DEFAULT_TO = "syednadealihashamshah@gmail.com";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: ContactPayload) {
  // Honeypot: bots fill hidden fields; humans leave it empty.
  if (clean(payload.website)) {
    return { ok: true as const, spam: true as const };
  }

  const name = clean(payload.name);
  const email = clean(payload.email).toLowerCase();
  const subject = clean(payload.subject);
  const message = clean(payload.message);

  if (name.length < 2 || name.length > 80) return { error: "Name must be 2-80 characters." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (subject.length < 4 || subject.length > 120) return { error: "Subject must be 4-120 characters." };
  if (message.length < 20 || message.length > 3000) return { error: "Message must be 20-3000 characters." };

  return { data: { name, email, subject, message } };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function emailBodies(data: ContactData) {
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    data.message
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h2>New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p style="white-space:pre-line">${escapeHtml(data.message)}</p>
    </div>
  `;

  return { text, html };
}

async function sendViaSmtp(data: ContactData, to: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  const { text, html } = emailBodies(data);

  await transporter.sendMail({
    from: SMTP_FROM ?? SMTP_USER,
    to,
    replyTo: data.email,
    subject: `Portfolio contact: ${data.subject}`,
    text,
    html
  });

  return true;
}

async function sendViaWeb3Forms(data: ContactData, to: string) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return false;

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio contact: ${data.subject}`,
      from_name: data.name,
      email: data.email,
      name: data.name,
      message: data.message,
      to
    })
  });

  const result = (await response.json()) as { success?: boolean; message?: string };
  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Web3Forms could not send the message.");
  }

  return true;
}

async function sendViaFormSubmit(data: ContactData, to: string) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      _subject: `Portfolio contact: ${data.subject}`,
      _replyto: data.email,
      _template: "table",
      _captcha: "false"
    })
  });

  const result = (await response.json()) as { success?: string | boolean; message?: string };

  if (!response.ok) {
    throw new Error(result.message ?? "FormSubmit could not send the message.");
  }

  // First-time activation often returns a confirmation notice.
  if (typeof result.message === "string" && /confirm|activate|check your email/i.test(result.message)) {
    return {
      pending: true as const,
      message:
        "Almost ready: check your inbox and confirm FormSubmit once. After that, contact emails will arrive normally."
    };
  }

  return { pending: false as const };
}

export async function POST(request: Request) {
  const headerList = headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (rateLimit(ip)) {
    return NextResponse.json({ message: "Too many messages. Try again after 15 minutes." }, { status: 429 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const result = validate(payload);
  if ("error" in result) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  // Silent success for honeypot spam.
  if ("spam" in result && result.spam) {
    return NextResponse.json({ message: "Message sent. I will reply soon." });
  }

  if (!("data" in result) || !result.data) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO;

  try {
    if (await sendViaSmtp(result.data, to)) {
      return NextResponse.json({ message: "Message sent. I will reply soon." });
    }

    if (await sendViaWeb3Forms(result.data, to)) {
      return NextResponse.json({ message: "Message sent. I will reply soon." });
    }

    const formSubmit = await sendViaFormSubmit(result.data, to);
    if (formSubmit.pending) {
      return NextResponse.json({ message: formSubmit.message }, { status: 202 });
    }

    return NextResponse.json({ message: "Message sent. I will reply soon." });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      {
        message:
          "Message could not be delivered right now. Please email me directly at syednadealihashamshah@gmail.com."
      },
      { status: 502 }
    );
  }
}
