"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" }
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-ink/78"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.a
          href="#home"
          className="text-sm font-black tracking-[0.18em] text-ink dark:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={closeMenu}
        >
          NAD-E
        </motion.a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-600 transition-colors hover:text-signal dark:text-slate-300 dark:hover:text-mint"
              onHoverStart={() => setHoveredLink(link.label)}
              onHoverEnd={() => setHoveredLink(null)}
              whileHover={{ y: -2, scale: 1.05 }}
            >
              {link.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] bg-signal dark:bg-mint"
                initial={{ width: 0 }}
                animate={{ width: hoveredLink === link.label ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm transition-all hover:-translate-y-1 dark:border-white/10 dark:bg-white/10 dark:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

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
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
