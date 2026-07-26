"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative scroll-mt-24 overflow-hidden py-20 sm:py-24", className)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(20,184,166,0.04),transparent_30%),radial-gradient(circle_at_88%_76%,rgba(37,99,235,0.04),transparent_26%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(20,184,166,0.08),transparent_30%),radial-gradient(circle_at_88%_76%,rgba(37,99,235,0.08),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 max-w-3xl"
        >
          {eyebrow ? (
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-brass dark:text-mint">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-black text-ink dark:text-white sm:text-4xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
