"use client";
import { cn } from "@/lib/utils";
import { SectionScene } from "@/components/Scene3D";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sceneBySection = {
  about: "about",
  experience: "experience",
  work: "work",
  services: "services",
  testimonials: "testimonials",
  contact: "contact",
} as const;

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const scene = sceneBySection[id as keyof typeof sceneBySection];
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative scroll-mt-24 overflow-hidden py-20 sm:py-24",
        className,
      )}
    >
      {scene ? (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <SectionScene variant={scene} />
        </motion.div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(20,184,166,0.035),transparent_30%),radial-gradient(circle_at_88%_76%,rgba(15,23,42,0.045),transparent_26%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(20,184,166,0.10),transparent_30%),radial-gradient(circle_at_88%_76%,rgba(37,99,235,0.10),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 max-w-3xl"
        >
          {eyebrow ? (
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-brass dark:text-mint"
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h2
            initial={{ scale: 0.95, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            className="text-3xl font-black text-ink dark:text-white sm:text-4xl"
          >
            {title}
          </motion.h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
