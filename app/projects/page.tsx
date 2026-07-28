import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SiteBackground } from "@/components/SiteBackground";
import { moreProjectNames, profile } from "@/lib/profile";

export const metadata = {
  title: "All Projects | Nade Ali Hasham",
  description: "Full list of projects by Nade Ali Hasham."
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <SiteBackground />
      <div className="relative z-10">
        <Nav />
        <section className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <Link
            href="/#work"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-signal dark:text-slate-300 dark:hover:text-mint"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-brass dark:text-mint">
            Projects
          </p>
          <h1 className="text-4xl font-black text-ink dark:text-white sm:text-5xl">
            More projects by name
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            A clean list of repositories and builds. Featured work stays on the home page; this page
            shows the wider set by name.
          </p>

          <ul className="mt-10 divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm backdrop-blur dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
            {moreProjectNames.map((name, index) => (
              <li key={name}>
                <a
                  href={`${profile.github}/${name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50 dark:hover:bg-white/10"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="w-8 shrink-0 text-sm font-bold text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate font-semibold text-ink dark:text-white">{name}</span>
                  </span>
                  <ExternalLink size={16} className="shrink-0 text-slate-400" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl border border-mint/30 bg-white/80 p-6 text-center shadow-soft backdrop-blur dark:bg-white/5">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
              For more information, go to this link:
            </p>
            <a
              href={profile.githubRepos}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 break-all text-lg font-black text-signal underline-offset-4 hover:underline dark:text-mint"
            >
              github.com/Nadeali-Hasham?tab=repositories
              <ExternalLink size={18} className="shrink-0" />
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
