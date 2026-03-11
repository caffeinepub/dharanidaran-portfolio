import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Code2,
  ExternalLink,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "academics", label: "Academics" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  { name: "Java", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "HTML & CSS", category: "Web" },
  { name: "SQL", category: "Database" },
  { name: "Git", category: "Tools" },
  { name: "Problem Solving", category: "Core" },
];

const PROJECTS = [
  {
    title: "Fake News Deduction",
    description:
      "A machine-learning powered system that analyses news articles and determines their credibility using natural language processing techniques. Built to combat misinformation by classifying headlines and content with high accuracy.",
    tags: ["Python", "NLP", "Machine Learning", "Classification"],
    status: "Completed",
  },
];

// ── Section header ─────────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="text-xs font-mono tracking-[0.25em] uppercase text-primary/70 mb-2">
        {label}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-px w-12 bg-primary/60" />
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}

// ── Skill chip ─────────────────────────────────────────────────────────────
function SkillChip({ name, category }: { name: string; category: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="group relative px-4 py-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 cursor-default"
      style={{
        boxShadow: "none",
      }}
    >
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 blue-glow-sm" />
      <p className="text-sm font-semibold text-foreground relative z-10">
        {name}
      </p>
      <p className="text-xs text-muted-foreground relative z-10">{category}</p>
    </motion.div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Determine active section
      const sections = NAV_LINKS.map((l) => l.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[sections[i]];
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.22 0.022 255 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.22 0.022 255 / 0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Radial glow top */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, oklch(0.62 0.22 252 / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="font-display font-bold text-lg tracking-tight text-foreground hover:text-primary transition-colors"
          >
            D<span className="text-primary">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={`nav.${link.id}.link`}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="md:hidden bg-card/95 backdrop-blur-md border-b border-border px-6 pb-4"
            >
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid={`nav.${link.id}.link`}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border/50 last:border-0"
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          id="home"
          ref={setRef("home")}
          className="min-h-screen pt-16 flex items-center"
        >
          <div className="max-w-6xl mx-auto px-6 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Available for Opportunities
                  </span>
                </div>

                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none mb-4">
                  <span className="gradient-text">DHARANIDARAN</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground font-medium mb-6">
                  Software Developer <span className="text-border mx-2">·</span>{" "}
                  B.Sc. IT
                </p>

                <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  Passionate about building intelligent systems that solve
                  real-world problems. Specialising in Python, Java, and machine
                  learning applications.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    data-ocid="hero.opentowork.button"
                    onClick={() => scrollTo("contact")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity blue-glow-sm"
                  >
                    Get in Touch <ChevronRight size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo("projects")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-card transition-all"
                  >
                    View Projects
                  </button>
                </div>
              </motion.div>

              {/* Right: portrait card */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Ambient glow */}
                  <div
                    className="absolute -inset-8 rounded-2xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, oklch(0.62 0.22 252 / 0.15) 0%, transparent 70%)",
                    }}
                  />
                  {/* Offset border decoration */}
                  <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-primary/30" />
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border border-primary/15" />

                  {/* Portrait card */}
                  <div className="relative w-72 h-96 md:w-80 md:h-[420px] rounded-2xl overflow-hidden border border-border">
                    <img
                      src="/assets/uploads/1773150394224-1.png"
                      alt="Dharanidaran"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Gradient fade bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[oklch(0.10_0.018_255)] via-[oklch(0.10_0.018_255/0.7)] to-transparent" />
                    {/* Name overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <p className="font-display font-bold text-xl text-foreground">
                        DHARANIDARAN
                      </p>
                      <p className="text-sm text-primary font-medium">
                        Software Developer
                      </p>
                    </div>
                    {/* Open to work badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/50 text-primary text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Open to Work
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" ref={setRef("about")} className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeader label="01 — Introduction" title="About Me" />
            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Hi, I'm{" "}
                  <span className="text-foreground font-semibold">
                    Dharanidaran
                  </span>{" "}
                  — a dedicated software developer and B.Sc. IT student at{" "}
                  <span className="text-foreground font-semibold">
                    Sankara College of Arts and Science
                  </span>
                  . I'm passionate about technology and its potential to solve
                  meaningful problems.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  My interest spans machine learning, software engineering, and
                  building clean, efficient solutions. I enjoy transforming
                  complex problems into elegant code — from classifying
                  misinformation to crafting intuitive interfaces.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Currently seeking opportunities where I can grow, contribute,
                  and collaborate with talented teams on impactful projects.
                </p>
              </div>
              <div className="lg:col-span-2 space-y-3">
                {[
                  {
                    icon: <MapPin size={14} />,
                    label: "Location",
                    value: "India",
                  },
                  {
                    icon: <GraduationCap size={14} />,
                    label: "Degree",
                    value: "B.Sc. IT",
                  },
                  {
                    icon: <Code2 size={14} />,
                    label: "Focus",
                    value: "Software Development",
                  },
                  {
                    icon: <Briefcase size={14} />,
                    label: "Status",
                    value: "Open to Work",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                  >
                    <span className="text-primary flex-shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section
          id="skills"
          ref={setRef("skills")}
          className="py-24 bg-card/30"
        >
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeader label="02 — Toolkit" title="Skills & Technologies" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <SkillChip name={skill.name} category={skill.category} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" ref={setRef("projects")} className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeader label="03 — Work" title="Projects" />
            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.title}
                  data-ocid={`projects.item.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 cursor-default"
                  style={{}}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Code2 size={18} className="text-primary" />
                    </div>
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs bg-secondary/50 text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACADEMICS ── */}
        <section
          id="academics"
          ref={setRef("academics")}
          className="py-24 bg-card/30"
        >
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeader label="04 — Education" title="Academics" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              data-ocid="academics.card"
              className="max-w-2xl relative"
            >
              {/* Vertical timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

              <div className="pl-16 pb-2">
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-6 w-4 h-4 rounded-full bg-primary blue-glow-sm" />

                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                      <GraduationCap size={22} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <div>
                          <h3 className="font-display font-bold text-lg text-foreground">
                            B.Sc. Information Technology
                          </h3>
                          <p className="text-sm text-primary font-medium mt-0.5">
                            Sankara College of Arts and Science
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-primary/30 text-primary text-xs flex-shrink-0"
                        >
                          In Progress
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Graduated: 2025 — 2028
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          Tamil Nadu, India
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        Pursuing a Bachelor of Science in Information
                        Technology, building a solid foundation in software
                        development, data structures, algorithms, and emerging
                        technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" ref={setRef("contact")} className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeader label="05 — Connect" title="Get in Touch" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                  I'm currently open to new opportunities. Whether you have a
                  project idea, a job offer, or just want to connect — my inbox
                  is always open.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:dharanidharanibscit2025@sankara.ac.in"
                    data-ocid="contact.email.link"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        dharanidharanibscit2025@sankara.ac.in
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                    />
                  </a>

                  <a
                    href="tel:9597493796"
                    data-ocid="contact.phone.link"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">
                        +91 9597493796
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                    />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/dharanidaran-i-9ba916380"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.linkedin.link"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Linkedin size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">LinkedIn</p>
                      <p className="text-sm font-medium text-foreground">
                        dharanidaran-i
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                    />
                  </a>
                </div>
              </div>

              {/* Decorative side */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, oklch(0.62 0.22 252 / 0.12) 0%, transparent 70%)",
                    }}
                  />
                  <div className="absolute inset-8 rounded-full border border-primary/20 animate-pulse" />
                  <div className="absolute inset-16 rounded-full border border-primary/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-5 rounded-full bg-primary/10 border border-primary/30">
                      <User size={32} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dharanidaran. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
