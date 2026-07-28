"use client";

import { useEffect } from "react";

/** Scrolls to section when landing on home with a hash or stored target */
export function HomeHashScroll() {
  useEffect(() => {
    const scrollTo = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    const run = () => {
      const stored = sessionStorage.getItem("scrollTo");
      const hash = window.location.hash.replace("#", "");
      const id = stored || hash;
      if (!id) return;
      if (stored) sessionStorage.removeItem("scrollTo");
      if (!scrollTo(id)) {
        window.setTimeout(() => scrollTo(id), 200);
      }
    };

    const timer = window.setTimeout(run, 50);
    window.addEventListener("hashchange", run);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", run);
    };
  }, []);

  return null;
}
