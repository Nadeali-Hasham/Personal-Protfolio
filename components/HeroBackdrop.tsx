"use client";

import { motion } from "framer-motion";

const orbs = [
  { className: "left-[-8%] top-[12%] h-72 w-72 bg-mint/20 dark:bg-mint/14", delay: 0 },
  { className: "right-[-6%] top-[18%] h-80 w-80 bg-signal/16 dark:bg-signal/12", delay: 1.2 },
  { className: "bottom-[8%] left-[28%] h-64 w-64 bg-brass/14 dark:bg-brass/10", delay: 2.1 }
];

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.className}
          aria-hidden
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={{
            scale: [1, 1.16, 1],
            x: [0, 20, -10, 0],
            y: [0, -14, 12, 0]
          }}
          transition={{
            duration: 14,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
