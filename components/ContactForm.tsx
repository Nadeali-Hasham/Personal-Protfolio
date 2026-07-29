"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        message?: string;
        mailto?: string;
      };

      if (!response.ok || data.error) {
        throw new Error(data.error ?? data.message ?? "Message could not be sent.");
      }

      if (data.mailto) {
        window.open(data.mailto, "_blank");
      }

      setStatus("sent");
      setMessage(data.message ?? "Message sent successfully.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative z-10 grid gap-4 rounded-2xl border border-black/10 bg-white/95 p-6 shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-[#0f172a]/95 dark:text-white"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {["Name", "Email"].map((label) => (
          <label
            key={label}
            className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            {label}
            <input
              name={label.toLowerCase()}
              required
              minLength={2}
              type={label === "Email" ? "email" : "text"}
              className="form-field"
              placeholder={label === "Name" ? "Your name" : "you@example.com"}
            />
          </label>
        ))}
      </div>

      <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Subject
        <input
          name="subject"
          required
          minLength={4}
          className="form-field"
          placeholder="Project inquiry"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Message
        <textarea
          name="message"
          required
          minLength={20}
          rows={5}
          className="form-field resize-none"
          placeholder="Tell me about the work..."
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 dark:bg-mint dark:text-ink disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send size={17} />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {message ? (
        <p
          className={
            status === "error"
              ? "text-sm font-semibold text-red-500"
              : "text-sm font-semibold text-emerald-600 dark:text-emerald-300"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
