"use client";

import Link from "next/link";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";
import { FormEvent, useState } from "react";

type EmailLog = {
  id: string;
  to: string[];
  from: string;
  subject: string;
  created_at: string;
  last_event?: string;
};

export default function AdminMessagesPage() {
  const [secret, setSecret] = useState("");
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "ready">("idle");
  const [message, setMessage] = useState("");

  async function loadLog(event?: FormEvent) {
    event?.preventDefault();
    if (!secret.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/messages?secret=${encodeURIComponent(secret.trim())}`
      );
      const data = (await response.json()) as {
        emails?: EmailLog[];
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message ?? "Could not load messages.");
      }

      setEmails(data.emails ?? []);
      setStatus("ready");
      if (!data.emails?.length) {
        setMessage("No sent emails found yet. Submit the contact form once, then refresh.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not load messages.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-ink dark:bg-ink dark:text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-signal dark:text-slate-300 dark:hover:text-mint"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-6 flex items-start gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-signal/10 text-signal dark:bg-mint/10 dark:text-mint">
              <Mail size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black">Contact email log</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Check if Resend actually sent your contact emails. Gmail may hide them in Spam or
                Promotions.
              </p>
            </div>
          </div>

          <form onSubmit={loadLog} className="mb-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              placeholder="Admin secret"
              className="form-field flex-1"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-black text-white disabled:opacity-70 dark:bg-mint dark:text-ink"
            >
              <RefreshCw size={16} className={status === "loading" ? "animate-spin" : ""} />
              {status === "loading" ? "Loading..." : "Load emails"}
            </button>
          </form>

          {message ? (
            <p
              className={
                status === "error"
                  ? "mb-4 text-sm font-semibold text-red-500"
                  : "mb-4 text-sm font-semibold text-slate-600 dark:text-slate-300"
              }
            >
              {message}
            </p>
          ) : null}

          {status === "ready" && emails.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/10 dark:text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">To</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email) => (
                    <tr key={email.id} className="border-t border-black/10 dark:border-white/10">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(email.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{email.to.join(", ")}</td>
                      <td className="px-4 py-3">{email.subject}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                          {email.last_event ?? "sent"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-200">
            <p className="font-bold">Gmail not showing emails?</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Check Spam, Promotions, and All Mail tabs.</li>
              <li>
                With <code>onboarding@resend.dev</code>, emails only go to your Resend account
                email during testing.
              </li>
              <li>
                For production, verify your domain in Resend and update{" "}
                <code>RESEND_FROM_EMAIL</code>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
