"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { filters, projects } from "@/lib/profile";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export function ProjectGrid() {
  const [active, setActive] = useState("All");

  const visible = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter(
      (project) => project.category === active || project.tech.includes(active),
    );
  }, [active]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
              active === filter
                ? "border-signal bg-signal text-white dark:border-mint dark:bg-mint dark:text-ink"
                : "border-black/10 bg-white text-slate-700 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-slate-300",
            )}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      <div className="grid gap-6 [perspective:2000px] lg:grid-cols-3">
        {visible.map((project, index) => (
          <motion.article
            key={project.title}
            layout
            initial={{ opacity: 0, y: 24, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{
              rotateY: 8,
              rotateX: 5,
              y: -15,
              scale: 1.02,
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.25), 0 0 0 2px rgba(20,184,166,0.3)",
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="group relative overflow-hidden rounded-xl border border-black/10 bg-white/90 shadow-sm backdrop-blur [transform-style:preserve-3d] transition-all duration-500 dark:border-white/10 dark:bg-white/10"
          >
            {/* 3D Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 via-blue-500 to-amber-400 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                className="object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-80" />
              <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                {project.category}
              </div>
            </div>

            <div className="relative z-10 p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brass dark:text-mint">
                {project.category}
              </p>
              <h3 className="text-xl font-black text-ink dark:text-white">
                {project.title}
              </h3>
              <p className="mt-3 min-h-24 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <motion.span
                    key={item}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200"
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      backgroundColor: "rgba(20,184,166,0.2)",
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {project.live ? (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-1 dark:bg-white dark:text-ink"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    Live
                  </motion.a>
                ) : null}
                <motion.a
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-ink transition-all hover:-translate-y-1 dark:border-white/10 dark:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} />
                  Code
                </motion.a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
