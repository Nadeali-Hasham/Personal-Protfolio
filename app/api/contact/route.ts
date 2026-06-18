import { headers } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 4;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: ContactPayload) {
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

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO_EMAIL } = process.env;
  const to = CONTACT_TO_EMAIL ?? "syednadealihashamshah@gmail.com";

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      {
        message:
          "Contact form is validated, but email is not configured yet. Add SMTP values in .env.local to enable sending."
      },
      { status: 503 }
    );
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

  await transporter.sendMail({
    from: SMTP_FROM ?? SMTP_USER,
    to,
    replyTo: result.data.email,
    subject: `Portfolio contact: ${result.data.subject}`,
    text: [
      `Name: ${result.data.name}`,
      `Email: ${result.data.email}`,
      `Subject: ${result.data.subject}`,
      "",
      result.data.message
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(result.data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(result.data.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(result.data.subject)}</p>
        <p style="white-space:pre-line">${escapeHtml(result.data.message)}</p>
      </div>
    `
  });

  return NextResponse.json({ message: "Message sent. I will reply soon." });
}
