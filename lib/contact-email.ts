import type { ContactData } from "./contact-types";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function ownerEmailBodies(data: ContactData) {
  const text = [
    `New portfolio message`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    ``,
    data.message
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:640px">
      <h2 style="margin:0 0 16px">New portfolio message</h2>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        <tr><td style="padding:8px 0;color:#6b7280;width:90px">Name</td><td style="padding:8px 0"><strong>${escapeHtml(data.name)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Subject</td><td style="padding:8px 0">${escapeHtml(data.subject)}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:12px;white-space:pre-line">${escapeHtml(data.message)}</div>
      <p style="margin-top:20px;font-size:13px;color:#6b7280">Reply directly to this email to reach ${escapeHtml(data.name)}.</p>
    </div>
  `;

  return { text, html };
}

export function confirmationEmailBodies(data: ContactData) {
  const text = [
    `Hi ${data.name},`,
    ``,
    `Thanks for contacting me through my portfolio.`,
    `I received your message about "${data.subject}" and will get back to you soon.`,
    ``,
    `Your message:`,
    data.message,
    ``,
    `— Nade Ali Hasham`,
    `Full-Stack Developer`
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:640px">
      <h2 style="margin:0 0 12px">Message received</h2>
      <p>Hi <strong>${escapeHtml(data.name)}</strong>,</p>
      <p>Thanks for contacting me through my portfolio. I received your message about <strong>${escapeHtml(data.subject)}</strong> and will get back to you soon.</p>
      <div style="margin:20px 0;padding:16px;background:#f8fafc;border-radius:12px">
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280">Your message</p>
        <p style="margin:0;white-space:pre-line">${escapeHtml(data.message)}</p>
      </div>
      <p style="margin:0;color:#6b7280;font-size:14px">— Nade Ali Hasham<br/>Full-Stack Developer</p>
    </div>
  `;

  return { text, html };
}
