"use client";

import { CodeFloaters } from "@/components/CodeFloaters";
import { NetworkField } from "@/components/NetworkField";

export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-paper dark:bg-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(20,184,166,0.14),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(183,121,31,0.08),transparent_34%)]" />
      <div className="hero-grid absolute inset-0 opacity-25 dark:opacity-15" />
      <CodeFloaters />
      <NetworkField />
    </div>
  );
}
