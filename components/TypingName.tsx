"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TypingName({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), 42);
    return () => window.clearTimeout(timer);
  }, [count, text.length]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-gradient-to-r from-ink via-signal to-mint bg-clip-text text-transparent dark:from-white dark:via-mint dark:to-signal"
    >
      {text.slice(0, count)}
      <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-1 animate-pulse bg-mint align-middle" />
    </motion.span>
  );
}
