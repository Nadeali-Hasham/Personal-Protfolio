import { cn } from "@/lib/utils";
import { SectionScene } from "@/components/Scene3D";

const sceneBySection = {
  about: "about",
  experience: "experience",
  work: "work",
  services: "services",
  testimonials: "testimonials",
  contact: "contact"
} as const;

export function Section({
  id,
  eyebrow,
  title,
  children,
  className
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const scene = sceneBySection[id as keyof typeof sceneBySection];

  return (
    <section id={id} className={cn("relative scroll-mt-24 overflow-hidden py-20 sm:py-24", className)}>
      {scene ? <SectionScene variant={scene} /> : null}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(20,184,166,0.035),transparent_30%),radial-gradient(circle_at_88%_76%,rgba(15,23,42,0.045),transparent_26%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(20,184,166,0.10),transparent_30%),radial-gradient(circle_at_88%_76%,rgba(37,99,235,0.10),transparent_26%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-brass dark:text-mint">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-black text-ink dark:text-white sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
