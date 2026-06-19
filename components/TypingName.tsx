"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TypingName({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), 58);
    return () => window.clearTimeout(timer);
  }, [count, text.length]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text.slice(0, count)}
      <motion.span
        className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 bg-mint"
        animate={{
          opacity: [1, 0, 1],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.span>
  );
}
