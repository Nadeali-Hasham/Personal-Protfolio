"use client";

import { motion } from "framer-motion";

const snippets = [
  {
    lang: "js",
    left: "4%",
    top: "16%",
    delay: 0,
    duration: 12,
    lines: ["const dev = {", "  name: 'Nade',", "  stack: 'MERN'", "};"]
  },
  {
    lang: "cs",
    left: "78%",
    top: "12%",
    delay: 1.4,
    duration: 14,
    lines: ["app.MapGet(\"/api\", () =>", "  Results.Ok(user));"]
  },
  {
    lang: "ts",
    left: "82%",
    top: "62%",
    delay: 0.8,
    duration: 13,
    lines: ["type User = {", "  id: number;", "  role: 'admin';", "};"]
  },
  {
    lang: "sql",
    left: "6%",
    top: "66%",
    delay: 2.1,
    duration: 15,
    lines: ["SELECT * FROM users", "WHERE active = 1;"]
  },
  {
    lang: "jsx",
    left: "46%",
    top: "80%",
    delay: 1.1,
    duration: 12.5,
    lines: ["<Button onClick={ship}>", "  Deploy 🚀", "</Button>"]
  },
  {
    lang: "js",
    left: "40%",
    top: "8%",
    delay: 1.8,
    duration: 13.5,
    lines: ["for (const t of tasks)", "  done(t);"]
  }
];

const helloCode = [
  { t: "function", c: "text-signal dark:text-sky-400" },
  { t: " greet", c: "text-brass dark:text-amber-300" },
  { t: "() {", c: "text-slate-500 dark:text-slate-300" }
];

export function CodeFloaters() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {snippets.map((s, i) => (
        <motion.pre
          key={i}
          className="absolute hidden rounded-lg border border-black/10 bg-white/40 px-3 py-2 font-mono text-[11px] leading-4 text-slate-500 shadow-sm backdrop-blur-sm md:block dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
          style={{ left: s.left, top: s.top }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0.35, 0.75, 0.35], y: [0, -14, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-mint">
            {s.lang}
          </span>
          {s.lines.join("\n")}
        </motion.pre>
      ))}

      {/* Featured "hello Nade Ali" code card */}
      <motion.div
        className="absolute right-[8%] top-[38%] hidden w-64 rounded-xl border border-mint/30 bg-white/60 p-4 font-mono text-xs shadow-soft backdrop-blur-md lg:block dark:border-mint/25 dark:bg-[#0b1220]/70"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.4 },
          scale: { duration: 0.8, delay: 0.4 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            welcome.js
          </span>
        </div>
        <div className="space-y-1">
          <p>
            {helloCode.map((part, i) => (
              <span key={i} className={part.c}>
                {part.t}
              </span>
            ))}
          </p>
          <p className="pl-4">
            <span className="text-signal dark:text-sky-400">console</span>
            <span className="text-slate-500 dark:text-slate-300">.log(</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              &quot;Hello, Nade Ali 👋&quot;
            </span>
            <span className="text-slate-500 dark:text-slate-300">);</span>
          </p>
          <p className="text-slate-500 dark:text-slate-300">{"}"}</p>
          <p>
            <span className="text-brass dark:text-amber-300">greet</span>
            <span className="text-slate-500 dark:text-slate-300">();</span>
            <span className="ml-1 inline-block h-3 w-[7px] translate-y-0.5 animate-pulse bg-mint" />
          </p>
        </div>
      </motion.div>
    </div>
  );
}
