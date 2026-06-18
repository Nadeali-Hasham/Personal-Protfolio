"use client";

import { useEffect, useState } from "react";

export function TypingName({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), 58);
    return () => window.clearTimeout(timer);
  }, [count, text.length]);

  return (
    <span>
      {text.slice(0, count)}
      <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 animate-pulse bg-mint" />
    </span>
  );
}
