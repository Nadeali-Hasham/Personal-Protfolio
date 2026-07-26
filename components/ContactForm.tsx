"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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
      const data = (await response.json()) as { message?: string };

      if (!response.ok && response.status !== 202) {
        throw new Error(data.message ?? "Message could not be sent.");
      }

      setStatus("sent");
      setMessage(data.message ?? "Message sent successfully.");
      if (response.ok) form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10 grid gap-4 rounded-2xl border border-black/10 bg-white/95 p-6 shadow-soft backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-[#0f172a]/95 dark:text-white"
      style={{
        transform: isHovered
          ? "perspective(800px) rotateX(2deg) rotateY(-3deg) scale(1.01)"
          : "perspective(800px) rotateX(0) rotateY(0) scale(1)",
        boxShadow: isHovered
          ? "0 30px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(20,184,166,0.2)"
          : "0 10px 30px rgba(0,0,0,0.08)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {["Name", "Email"].map((label, idx) => (
          <motion.label
            key={label}
            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            {label}
            <input
              name={label.toLowerCase()}
              required
              minLength={2}
              type={label === "Email" ? "email" : "text"}
              className="form-field transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.3)]"
              placeholder={label === "Name" ? "Your name" : "you@example.com"}
            />
          </motion.label>
        ))}
      </div>

      <motion.label
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        Subject
        <input
          name="subject"
          required
          minLength={4}
          className="form-field transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.3)]"
          placeholder="Project inquiry"
        />
      </motion.label>

      <motion.label
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        Message
        <textarea
          name="message"
          required
          minLength={20}
          rows={5}
          className="form-field resize-none transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.3)]"
          placeholder="Tell me about the work..."
        />
      </motion.label>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-signal px-5 py-3 text-sm font-black text-white transition-all hover:-translate-y-1 dark:bg-mint dark:text-ink disabled:cursor-not-allowed disabled:opacity-70"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <Send size={17} />
        {status === "sending" ? "Sending..." : "Send Message"}
      </motion.button>

      {message ? (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={
            status === "error"
              ? "text-sm font-semibold text-red-500"
              : "text-sm font-semibold text-emerald-600 dark:text-emerald-300"
          }
        >
          {message}
        </motion.p>
      ) : null}
    </motion.form>
  );
}
