"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/profile";
import { useState } from "react";

export function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-5 [perspective:2000px] md:grid-cols-3">
      {testimonials.map((item, index) => (
        <motion.article
          key={item.name}
          initial={{ opacity: 0, rotateY: -20, y: 30 }}
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
          whileHover={{
            rotateY: 12,
            rotateX: 6,
            y: -12,
            scale: 1.02,
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.2), 0 0 0 2px rgba(20,184,166,0.3)",
          }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="relative rounded-xl border border-black/10 bg-white/90 p-6 shadow-sm backdrop-blur [transform-style:preserve-3d] transition-all duration-500 dark:border-white/10 dark:bg-white/10"
        >
          {/* 3D Glow */}
          <div
            className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-amber-400 opacity-0 blur-md transition-opacity duration-500 ${hoveredIndex === index ? "opacity-100" : ""}`}
          />

          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <motion.div
                className="grid h-16 w-16 place-items-center rounded-full border border-black/10 bg-slate-50 text-lg font-black text-signal shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-mint"
                whileHover={{
                  scale: 1.15,
                  rotate: 10,
                  boxShadow: "0 0 30px rgba(20,184,166,0.3)",
                }}
              >
                {item.name.slice(0, 2).toUpperCase()}
              </motion.div>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="text-brass dark:text-mint"
              >
                <Quote />
              </motion.div>
            </div>

            <p className="text-base leading-7 text-slate-700 dark:text-slate-200">
              "{item.quote}"
            </p>

            <div className="mt-8 border-t border-black/10 pt-5 dark:border-white/10">
              <p className="font-black text-ink dark:text-white">{item.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.role}
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
