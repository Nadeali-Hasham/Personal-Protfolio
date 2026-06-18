"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/profile";

export function Testimonials() {
  return (
    <div className="grid gap-5 [perspective:1400px] md:grid-cols-3">
      {testimonials.map((item, index) => (
        <motion.article
          key={item.name}
          initial={{ opacity: 0, rotateY: -18, y: 20 }}
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
          whileHover={{ rotateY: 9, rotateX: 3, y: -8 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="rounded-lg border border-black/10 bg-white/90 p-6 shadow-sm backdrop-blur [transform-style:preserve-3d] dark:border-white/10 dark:bg-white/10"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-black/10 bg-slate-50 text-lg font-black text-signal shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-mint">
              {item.name.slice(0, 2).toUpperCase()}
            </div>
            <Quote className="text-brass dark:text-mint" />
          </div>
          <p className="text-base leading-7 text-slate-700 dark:text-slate-200">"{item.quote}"</p>
          <div className="mt-8 border-t border-black/10 pt-5 dark:border-white/10">
            <p className="font-black text-ink dark:text-white">{item.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
