import {
  ArrowDown,
  Award,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HomeHashScroll } from "@/components/HomeHashScroll";
import { MotionDiv } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Section } from "@/components/Section";
import { SiteBackground } from "@/components/SiteBackground";
import { Testimonials } from "@/components/Testimonials";
import { TypingName } from "@/components/TypingName";
import { experiences, profile, services, skills } from "@/lib/profile";

export default function Home() {
  const serviceIcons = [Layers3, Database, Code2, ShoppingBag];

  return (
    <main className="relative overflow-x-hidden">
      <SiteBackground />
      <div className="relative z-10">
      <HomeHashScroll />
      <Nav />
      <section
        id="home"
        className="relative min-h-screen overflow-hidden border-b border-black/10 dark:border-white/10"
      >
        <HeroBackdrop />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(248,250,252,0.35),rgba(248,250,252,0.12)_52%,transparent)] dark:bg-[linear-gradient(115deg,rgba(17,24,39,0.45),rgba(17,24,39,0.18)_52%,transparent)]" />
        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-3xl">
            <MotionDiv
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/78 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                <Sparkles size={16} className="text-brass dark:text-mint" />
                Lahore based full-stack developer
              </span>
              {profile.fiverrActive ? (
                <a
                  href={profile.fiverr}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm backdrop-blur dark:text-emerald-300"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  Fiverr 24/7 Active
                </a>
              ) : null}
            </MotionDiv>
            <h1 className="max-w-4xl text-5xl font-black leading-tight text-ink dark:text-white sm:text-6xl lg:text-7xl">
              <TypingName text={profile.displayName} />
            </h1>
            <MotionDiv
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-slate-700 dark:text-slate-200">
                {profile.headline}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                I build reliable web applications where the database, API, authentication, and user
                interface work together cleanly.
              </p>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-black text-white shadow-soft transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.28)] dark:bg-white dark:text-ink"
              >
                View My Work
                <ArrowDown size={17} className="animate-bounce" />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 dark:bg-mint dark:text-ink"
              >
                <Download size={17} />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-black text-ink transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                Contact Me
                <Mail size={17} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-black text-ink transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <Github size={17} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-black text-ink transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <Linkedin size={17} />
                LinkedIn
              </a>
              <a
                href={profile.fiverr}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-black text-ink transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <ShoppingBag size={17} />
                Fiverr
              </a>
              <a
                href={`https://wa.me/${profile.whatsapp.replaceAll(/[^\d]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-black text-emerald-700 transition hover:-translate-y-1 dark:text-emerald-300"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </MotionDiv>
          </div>
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 120 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-mint/30 via-signal/20 to-brass/20 blur-3xl" />
            <div className="animate-spin-slow pointer-events-none absolute -inset-3 rounded-[2rem] border border-dashed border-mint/40 dark:border-mint/30" />
            <div className="animate-float-y group relative overflow-hidden rounded-2xl border border-white/50 bg-white/75 p-4 shadow-soft backdrop-blur-xl transition duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-white/10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={profile.profileImage}
                  alt="Nade Ali Hasham"
                  fill
                  priority
                  className="object-cover object-top transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 420px, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-mint">
                    {profile.title}
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{profile.location}</p>
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
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {profile.certificate.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-black/10 bg-white/90 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/10">
              <div className="mb-6 grid grid-cols-3 gap-3">
                {[
                  { label: "API", src: "/images/skills/api.svg" },
                  { label: "SQL", src: "/images/skills/sql.svg" },
                  { label: "UI", src: "/images/skills/ui.svg" },
                  { label: "AUTH", src: "/images/skills/auth.svg" },
                  { label: "MVC", src: "/images/skills/mvc.svg" },
                  { label: "AI", src: "/images/skills/ai.svg" }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-black/10 shadow-sm transition hover:-translate-y-0.5 dark:border-white/10"
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
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

      <Section
        id="experience"
        eyebrow="Experience"
        title="From frontend delivery to full-stack ownership"
        className="bg-transparent"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {experiences.map((item) => (
            <article
              key={item.role}
              className="rounded-lg border border-black/10 bg-paper/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/10"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brass dark:text-mint">
                {item.period}
              </p>
              <h3 className="mt-3 text-2xl font-black text-ink dark:text-white">{item.role}</h3>
              <p className="mt-1 font-semibold text-slate-700 dark:text-slate-200">{item.company}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.location}</p>
              <ul className="mt-5 space-y-3">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"
                  >
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

      <Section
        id="services"
        eyebrow="Services"
        title="What I can build for teams and clients"
        className="bg-transparent"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
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
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </MotionDiv>
            );
          })}
        </div>
      </Section>

      <Section id="testimonials" eyebrow="Signals" title="How collaborators describe the work">
        <Testimonials />
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Tell me what you want to build"
        className="relative bg-transparent"
      >
        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10">
            <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
              For job opportunities, freelance builds, API work, dashboard systems, or frontend
              implementation, send a clear message and I will reply as soon as possible.
            </p>
            <div className="mt-8 grid gap-4">
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint"
              >
                <Download size={18} />
                Download Resume (PDF)
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint"
              >
                <Mail size={18} />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replaceAll(" ", "")}`}
                className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint"
              >
                <Phone size={18} />
                {profile.phone}
              </a>
              <a
                href={`https://wa.me/${profile.whatsapp.replaceAll(/[^\d]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint"
              >
                <MessageCircle size={18} />
                WhatsApp Business {profile.whatsapp}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href={profile.fiverr}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-bold text-ink transition hover:text-signal dark:text-white dark:hover:text-mint"
              >
                <ShoppingBag size={18} />
                Fiverr — syed_nade_ali
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>

      <Footer />
      </div>
    </main>
  );
}
