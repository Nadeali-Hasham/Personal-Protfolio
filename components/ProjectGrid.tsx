"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { filters, projects } from "@/lib/profile";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export function ProjectGrid() {
  const [active, setActive] = useState("All");

  const visible = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter(
      (project) =>
        project.category === active ||
        project.tech.some((t) => t.includes(active) || active.includes(t))
    );
  }, [active]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
              active === filter
                ? "border-signal bg-signal text-white dark:border-mint dark:bg-mint dark:text-ink"
                : "border-black/10 bg-white text-slate-700 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {visible.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="group relative overflow-hidden rounded-xl border border-black/10 bg-white/90 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-signal/20 via-ink/80 to-mint/20">
                  <p className="px-4 text-center text-lg font-black text-white">{project.title}</p>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                {project.category}
              </div>
            </div>

            <div className="relative z-10 p-6">
              <h3 className="text-xl font-black text-ink dark:text-white">{project.title}</h3>
              <p className="mt-3 min-h-24 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-ink"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                ) : null}
                {project.code ? (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-ink transition hover:-translate-y-0.5 dark:border-white/10 dark:text-white"
                  >
                    <Github size={16} />
                    Code
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-6 py-3 text-sm font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          Show More Projects
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
