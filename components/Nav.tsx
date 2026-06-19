"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-ink/78"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.a
          href="#home"
          className="text-sm font-black tracking-[0.18em] text-ink dark:text-white relative"
          whileHover={{
            scale: 1.1,
            textShadow:
              "0 0 20px rgba(20,184,166,0.5), 0 0 60px rgba(20,184,166,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">NAD-E</span>
          <span className="absolute inset-0 blur-xl bg-teal-400/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-600 transition-colors hover:text-signal dark:text-slate-300 dark:hover:text-mint"
              onHoverStart={() => setHoveredLink(link.label)}
              onHoverEnd={() => setHoveredLink(null)}
              whileHover={{
                y: -2,
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 },
              }}
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

        <motion.button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-sm transition-all hover:-translate-y-1 dark:border-white/10 dark:bg-white/10 dark:text-white"
          whileHover={{
            scale: 1.15,
            rotate: 180,
            boxShadow: "0 0 30px rgba(20,184,166,0.3)",
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </motion.button>
      </nav>
    </motion.header>
  );
}
