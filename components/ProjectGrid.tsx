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
    return projects.filter((project) => project.category === active || project.tech.includes(active));
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
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              active === filter
                ? "border-signal bg-signal text-white dark:border-mint dark:bg-mint dark:text-ink"
                : "border-black/10 bg-white text-slate-700 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-6 [perspective:1400px] lg:grid-cols-3">
        {visible.map((project, index) => (
          <motion.article
            key={project.title}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ rotateX: 3, rotateY: -5, y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group overflow-hidden rounded-lg border border-black/10 bg-white/90 shadow-sm backdrop-blur [transform-style:preserve-3d] transition hover:shadow-soft dark:border-white/10 dark:bg-white/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent opacity-80" />
              <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                3D card
              </div>
            </div>
            <div className="p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brass dark:text-mint">
                {project.category}
              </p>
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
                <a
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-ink transition hover:-translate-y-0.5 dark:border-white/10 dark:text-white"
                >
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
