"use client";

import { usePathname, useRouter } from "next/navigation";

const sectionLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" }
];

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  function goToSection(sectionId: string) {
    if (pathname !== "/") {
      sessionStorage.setItem("scrollTo", sectionId);
      router.push(`/#${sectionId}`);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-ink/90 py-8 text-white backdrop-blur-sm dark:border-white/10 dark:bg-ink/80">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Copyright {new Date().getFullYear()} Nade Ali Hasham. All rights reserved.</p>
        <div className="flex flex-wrap gap-5">
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goToSection(link.id)}
              className="hover:text-mint"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
