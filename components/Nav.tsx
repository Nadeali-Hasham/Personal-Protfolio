"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" }
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-ink/78"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-sm font-black tracking-[0.18em] text-ink dark:text-white">
          NAD-E
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-signal dark:text-slate-300 dark:hover:text-mint"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </motion.header>
  );
}
