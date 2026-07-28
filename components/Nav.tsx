"use client";

import {
  Github,
  Linkedin,
  Menu,
  MessageCircle,
  Moon,
  ShoppingBag,
  Sun,
  X
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { profile } from "@/lib/profile";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" }
];

const whatsappHref = `https://wa.me/${profile.whatsapp.replaceAll(/[^\d]/g, "")}`;

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function closeMenu() {
    setMenuOpen(false);
  }

  function goToSection(sectionId: string) {
    closeMenu();

    if (pathname !== "/") {
      sessionStorage.setItem("scrollTo", sectionId);
      router.push(`/#${sectionId}`);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  }

  function goHome() {
    closeMenu();
    if (pathname !== "/") {
      router.push("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "#home");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-black/10 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-ink/90">
      <nav className="relative z-[101] mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={goHome}
          className="text-sm font-black tracking-[0.18em] text-ink dark:text-white"
        >
          NAD-E
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goToSection(link.id)}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-signal dark:text-slate-300 dark:hover:text-mint"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Business"
            className="hidden h-10 w-10 place-items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 shadow-sm transition hover:-translate-y-0.5 sm:grid dark:text-emerald-300"
          >
            <MessageCircle size={16} />
          </a>
          <a
            href={profile.fiverr}
            target="_blank"
            rel="noreferrer"
            aria-label="Fiverr profile"
            className="hidden h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm transition hover:-translate-y-0.5 sm:grid dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <ShoppingBag size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hidden h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm transition hover:-translate-y-0.5 sm:grid dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="hidden h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm transition hover:-translate-y-0.5 lg:grid dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <Linkedin size={16} />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm md:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-black/10 md:hidden dark:border-white/10"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goToSection(link.id)}
                  className="rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                WhatsApp
              </a>
              <a
                href={profile.fiverr}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Fiverr
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
