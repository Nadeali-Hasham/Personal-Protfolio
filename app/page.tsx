import { ArrowDown, Award, BriefcaseBusiness, Code2, Database, Github, Layers3, Linkedin, Mail, MapPin, Phone, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { HeroScene, SectionScene } from "@/components/Scene3D";
import { MotionDiv } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Section } from "@/components/Section";
import { Testimonials } from "@/components/Testimonials";
import { TypingName } from "@/components/TypingName";
import { experiences, profile, services, skills } from "@/lib/profile";

export default function Home() {
  const serviceIcons = [Layers3, Database, Code2, ShoppingBag];

  return (
    <main className="overflow-hidden">
      <Nav />
      <section id="home" className="relative min-h-screen overflow-hidden border-b border-black/10 dark:border-white/10">
        <HeroScene />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(20,184,166,0.14),transparent_34%),linear-gradient(115deg,rgba(248,250,252,0.9),rgba(248,250,252,0.62)_46%,rgba(248,250,252,0.12))] dark:bg-[radial-gradient(circle_at_70%_20%,rgba(20,184,166,0.16),transparent_32%),linear-gradient(115deg,rgba(17,24,39,0.96),rgba(17,24,39,0.72)_48%,rgba(17,24,39,0.34))]" />
        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-3xl">
            <MotionDiv
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/78 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            >
              <Sparkles size={16} className="text-brass dark:text-mint" />
              Lahore based full-stack developer
            </MotionDiv>
            <h1 className="max-w-4xl text-5xl font-black leading-tight text-ink dark:text-white sm:text-6xl lg:text-7xl">
              <TypingName text={profile.displayName} />
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-slate-700 dark:text-slate-200">
              {profile.headline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              I build reliable web applications where the database, API, authentication, and user interface work together cleanly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-ink">
                View My Work
                <ArrowDown size={17} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-black text-ink transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white">
                Contact Me
                <Mail size={17} />
              </a>
            </div>
          </div>
          <MotionDiv
            initial={{ opacity: 0, scale: 0.94, rotateY: -14 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md [perspective:1200px]"
          >
            <div className="absolute -inset-6 rounded-full bg-mint/20 blur-3xl dark:bg-signal/25" />
            <div className="group relative overflow-hidden rounded-lg border border-white/40 bg-white/70 p-4 shadow-soft backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:rotate-1 dark:border-white/10 dark:bg-white/10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src={profile.profileImage}
                  alt="Nade Ali Hasham profile placeholder"
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 420px, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-mint">Portfolio Avatar</p>
                  <p className="mt-2 text-2xl font-black text-white">Full-stack systems with depth</p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <Section id="about" eyebrow="About me" title="A practical builder with a full-stack mindset">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            {profile.story.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-slate-700 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
            <div className="grid gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-brass dark:text-mint" size={20} />
                <div>
                  <p className="font-black text-ink dark:text-white">Location</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{profile.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="mt-1 text-brass dark:text-mint" size={20} />
                <div>
                  <p className="font-black text-ink dark:text-white">Certificate</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{profile.certificate.title}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-black/10 bg-white/90 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/10">
            <div className="mb-6 grid grid-cols-3 gap-3">
              {["API", "SQL", "UI", "AUTH", "MVC", "AI"].map((item) => (
                <div key={item} className="grid aspect-square place-items-center rounded-lg border border-black/10 bg-slate-50 text-sm font-black text-signal shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-mint">
                  {item}
                </div>
              ))}
            </div>
            <div className="mb-5 flex items-center gap-3">
              <BriefcaseBusiness className="text-signal dark:text-mint" />
              <h3 className="text-xl font-black text-ink dark:text-white">Technical Strength</h3>
            </div>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{skill.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <MotionDiv
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-signal to-mint"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="experience" eyebrow="Experience" title="From frontend delivery to full-stack ownership" className="bg-white/70 dark:bg-white/[0.03]">
        <div className="grid gap-6 lg:grid-cols-2">
          {experiences.map((item) => (
            <article key={item.role} className="rounded-lg border border-black/10 bg-paper/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brass dark:text-mint">{item.period}</p>
              <h3 className="mt-3 text-2xl font-black text-ink dark:text-white">{item.role}</h3>
              <p className="mt-1 font-semibold text-slate-700 dark:text-slate-200">{item.company}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.location}</p>
              <ul className="mt-5 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="work" eyebrow="Selected work" title="Projects built around real workflows">
        <ProjectGrid />
      </Section>

      <Section id="services" eyebrow="Services" title="What I can build for teams and clients" className="bg-white/70 dark:bg-white/[0.03]">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            (() => {
              const Icon = serviceIcons[index] ?? Sparkles;
              return (
            <MotionDiv
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group rounded-lg border border-black/10 bg-paper/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/10"
            >
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-lg border border-black/10 bg-white text-signal shadow-sm transition group-hover:rotate-6 group-hover:scale-105 dark:border-white/10 dark:bg-ink dark:text-mint">
                <Icon size={25} />
              </div>
              <h3 className="text-lg font-black text-ink dark:text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>
              <div className="mt-6 flex gap-2">
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className="h-2 w-2 rounded-full bg-mint/70 dark:bg-mint" />
                ))}
              </div>
            </MotionDiv>
              );
            })()
          ))}
        </div>
      </Section>

      <Section id="testimonials" eyebrow="Signals" title="How collaborators describe the work">
        <Testimonials />
      </Section>

      <Section id="contact" eyebrow="Contact" title="Tell me what you want to build" className="relative bg-white/70 dark:bg-white/[0.03]">
        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10">
            <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
              For job opportunities, freelance builds, API work, dashboard systems, or frontend implementation, send a clear message and I will reply as soon as possible.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {["Email", "API", "Dashboard"].map((item) => (
                <div key={item} className="rounded-lg border border-black/10 bg-white/80 p-4 text-center text-sm font-black text-ink shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint">
                <Mail size={18} />
                {profile.email}
              </a>
              <a href={`tel:${profile.phone.replaceAll(" ", "")}`} className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint">
                <Phone size={18} />
                {profile.phone}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint">
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint">
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>

      <footer className="relative overflow-hidden border-t border-black/10 bg-ink py-8 text-white dark:border-white/10">
        <SectionScene variant="footer" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright {new Date().getFullYear()} Nade Ali Hasham. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#about" className="hover:text-mint">About</a>
            <a href="#work" className="hover:text-mint">Work</a>
            <a href="#contact" className="hover:text-mint">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
