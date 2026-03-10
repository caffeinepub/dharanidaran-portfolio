import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Braces,
  Brain,
  ChevronDown,
  Code2,
  ExternalLink,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home", ocid: "nav.home.link" },
  { label: "About", href: "#about", ocid: "nav.about.link" },
  { label: "Skills", href: "#skills", ocid: "nav.skills.link" },
  { label: "Projects", href: "#projects", ocid: "nav.projects.link" },
  { label: "Contact", href: "#contact", ocid: "nav.contact.link" },
];

const SKILLS = [
  {
    name: "Java",
    icon: <Braces className="w-7 h-7" />,
    description:
      "Object-Oriented Programming, Spring Framework, Data Structures & Algorithms",
    level: "Core Language",
  },
  {
    name: "Python",
    icon: <Code2 className="w-7 h-7" />,
    description:
      "Machine Learning, NLP, Web Scraping, Data Analysis & Scientific Computing",
    level: "Primary Stack",
  },
];

const PROJECTS = [
  {
    title: "Fake News Detection",
    description:
      "An end-to-end ML web application that verifies the authenticity of news articles in real time. The system ingests raw text, applies NLP preprocessing pipelines, and classifies content as Real or Fake with high accuracy — directly tackling digital misinformation at scale.",
    tags: ["Python", "Machine Learning", "NLP", "Web App"],
    icon: <Brain className="w-8 h-8" />,
    highlight: "Real-time misinformation detection",
    year: "2024",
  },
];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function App() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen mesh-bg text-foreground">
      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-400 ${
          scrolled
            ? "bg-background/85 border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => scrollTo("#home")}
            data-ocid="nav.home.link"
            className="font-display font-black text-base tracking-[0.12em] uppercase text-gradient hover:opacity-85 transition-opacity"
          >
            DHARANIDARAN
          </motion.button>

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                type="button"
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.08 + i * 0.07 },
                }}
                onClick={() => scrollTo(link.href)}
                data-ocid={link.ocid}
                className="relative px-4 py-2 text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45 } }}
              className="ml-3"
            >
              <Button
                size="sm"
                onClick={() => scrollTo("#contact")}
                data-ocid="nav.contact.button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs tracking-wide glow-amber"
              >
                Hire Me
              </Button>
            </motion.div>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background/95 nav-blur"
            >
              <nav className="flex flex-col px-6 py-3 gap-0.5">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    data-ocid={link.ocid}
                    className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ── */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center pt-16 px-6 relative overflow-hidden hero-grid"
        >
          {/* Atmospheric glows */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-[600px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/4 blur-[80px]" />
          </div>

          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="order-2 md:order-1"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase">
                  Available for Opportunities
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-black leading-[0.92] mb-5"
              >
                <span className="text-foreground block text-[clamp(2.8rem,8vw,5.5rem)]">
                  DHARANI
                </span>
                <span className="text-gradient block text-[clamp(2.8rem,8vw,5.5rem)]">
                  DARAN
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl font-semibold text-muted-foreground mb-3 tracking-wide"
              >
                Software Developer
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed max-w-md mb-8 text-base"
              >
                B.Sc. IT graduate crafting clean, efficient solutions.
                Passionate about real-world impact through{" "}
                <span className="text-foreground font-medium">Java</span> &{" "}
                <span className="text-foreground font-medium">Python</span>.
              </motion.p>

              <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
                <Button
                  size="lg"
                  onClick={() => scrollTo("#projects")}
                  data-ocid="hero.primary_button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-amber font-bold text-sm tracking-wide group"
                >
                  View My Work
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("#contact")}
                  data-ocid="hero.secondary_button"
                  className="border-border hover:border-primary/60 hover:bg-primary/8 font-semibold text-sm tracking-wide"
                >
                  Get In Touch
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 flex gap-8">
                {[
                  { val: "2+", label: "Core Languages" },
                  { val: "B.Sc.", label: "IT Graduate" },
                  { val: "ML", label: "Specialization" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display font-black text-2xl text-gradient">
                      {stat.val}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Professional photo card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                },
              }}
              className="order-1 md:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-[360px]">
                {/* Decorative offset border */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-primary/30" />
                <div className="absolute -bottom-8 -right-8 w-full h-full rounded-2xl border border-primary/12" />

                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl scale-105 -z-10" />

                {/* Photo card */}
                <div className="relative rounded-2xl overflow-hidden border border-primary/25 shadow-2xl bg-card">
                  <img
                    src="/assets/uploads/1773150394224-1.png"
                    alt="Dharanidaran — Software Developer"
                    className="w-full h-auto object-cover object-top block"
                    style={{ aspectRatio: "3/4" }}
                  />
                  {/* Bottom overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-background/90 via-background/50 to-transparent">
                    <p className="font-display font-black text-lg text-foreground tracking-wide">
                      Dharanidaran
                    </p>
                    <p className="text-xs text-primary font-semibold tracking-[0.15em] uppercase">
                      Software Developer
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.7, duration: 0.5 },
                  }}
                  className="absolute -top-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-primary/30 shadow-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground/80">
                    Open to Work
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.button
            type="button"
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            onClick={() => scrollTo("#about")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            data-ocid="hero.scroll_button"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
              Scroll
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.button>
        </section>

        <div className="section-divider" />

        {/* ── About ── */}
        <section id="about" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={slideLeft}
                className="text-xs font-bold text-primary tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
              >
                <span className="w-8 h-px bg-primary inline-block" />
                About Me
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-4xl md:text-6xl leading-[0.95] mb-12"
              >
                A developer who
                <br />
                <span className="text-gradient">cares about craft.</span>
              </motion.h2>

              <motion.div
                variants={stagger}
                className="grid md:grid-cols-2 gap-10 items-start"
              >
                <motion.div variants={fadeUp} className="space-y-5">
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    Hi, I'm{" "}
                    <strong className="text-foreground font-bold">
                      Dharanidaran
                    </strong>
                    , a recent{" "}
                    <strong className="text-primary">
                      B.Sc. Information Technology
                    </strong>{" "}
                    graduate and aspiring software developer based in Tamil
                    Nadu, India.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    I specialise in{" "}
                    <strong className="text-foreground">Java and Python</strong>{" "}
                    with a passion for machine learning, project management, and
                    building software that genuinely solves problems.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-5">
                  <p className="text-foreground/70 leading-relaxed">
                    I believe great software is measured by the clarity of its
                    thinking —
                    <strong className="text-foreground">
                      {" "}
                      clean code, efficient architecture, and human-first design
                    </strong>{" "}
                    are non-negotiable for me.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      "B.Sc. IT Graduate",
                      "Java Developer",
                      "Python Enthusiast",
                      "ML Explorer",
                      "Problem Solver",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-secondary/80 rounded-full text-xs font-medium text-foreground/70 border border-border hover:border-primary/50 hover:text-foreground transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Skills ── */}
        <section id="skills" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={slideLeft}
                className="text-xs font-bold text-primary tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
              >
                <span className="w-8 h-px bg-primary inline-block" />
                Technical Skills
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-4xl md:text-6xl leading-[0.95] mb-14"
              >
                What I <span className="text-gradient">work with.</span>
              </motion.h2>

              <motion.div
                variants={stagger}
                className="grid sm:grid-cols-2 gap-5"
              >
                {SKILLS.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="bg-card border border-border overflow-hidden h-full">
                      <CardContent className="p-0">
                        <div
                          className={`h-[3px] bg-gradient-to-r ${
                            idx === 0
                              ? "from-primary to-accent"
                              : "from-accent to-primary"
                          }`}
                        />
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-5">
                            <div className="p-3 rounded-lg bg-primary/12 text-primary">
                              {skill.icon}
                            </div>
                            <span className="text-xs font-semibold text-primary/70 tracking-widest uppercase">
                              {skill.level}
                            </span>
                          </div>
                          <h3 className="font-display font-black text-3xl mb-3">
                            {skill.name}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {skill.description}
                          </p>
                          <div className="mt-6 space-y-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Proficiency</span>
                              <span className="text-primary font-semibold">
                                {skill.name === "Java"
                                  ? "Intermediate"
                                  : "Advanced"}
                              </span>
                            </div>
                            <div className="h-1 rounded-full bg-secondary overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{
                                  width: skill.name === "Java" ? "65%" : "80%",
                                }}
                                transition={{
                                  duration: 1.2,
                                  ease: [0.22, 1, 0.36, 1],
                                  delay: 0.2,
                                }}
                                viewport={{ once: true }}
                                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Projects ── */}
        <section id="projects" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={slideLeft}
                className="text-xs font-bold text-primary tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
              >
                <span className="w-8 h-px bg-primary inline-block" />
                Featured Work
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-4xl md:text-6xl leading-[0.95] mb-14"
              >
                What I've <span className="text-gradient">built.</span>
              </motion.h2>

              <motion.div variants={stagger} className="space-y-5">
                {PROJECTS.map((project) => (
                  <motion.div
                    key={project.title}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <Card className="bg-card border border-border overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1.5 bg-gradient-to-b from-primary via-accent to-primary/50 flex-shrink-0 min-h-[8px]" />
                          <div className="p-8 md:p-10 flex-1">
                            <div className="flex items-start justify-between gap-4 mb-6">
                              <div className="flex items-start gap-5">
                                <div className="p-3.5 rounded-xl bg-primary/12 text-primary flex-shrink-0">
                                  {project.icon}
                                </div>
                                <div>
                                  <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-display font-black text-2xl">
                                      {project.title}
                                    </h3>
                                    <span className="text-xs font-semibold text-muted-foreground border border-border rounded-full px-2 py-0.5">
                                      {project.year}
                                    </span>
                                  </div>
                                  <p className="text-sm text-primary font-semibold tracking-wide">
                                    {project.highlight}
                                  </p>
                                </div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 opacity-60" />
                            </div>
                            <p className="text-foreground/70 leading-relaxed mb-7 text-[15px]">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-primary/10 border border-primary/25 text-primary/90 font-medium text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Contact ── */}
        <section id="contact" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={slideLeft}
                className="text-xs font-bold text-primary tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
              >
                <span className="w-8 h-px bg-primary inline-block" />
                Get In Touch
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-4xl md:text-6xl leading-[0.95] mb-4"
              >
                Let's <span className="text-gradient">connect.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-foreground/65 text-lg mb-14 max-w-lg"
              >
                Open to new opportunities, collaborations, or just a
                conversation. Don't hesitate to reach out.
              </motion.p>

              <motion.div
                variants={stagger}
                className="grid sm:grid-cols-3 gap-4 mb-10"
              >
                <motion.a
                  variants={fadeUp}
                  href="mailto:dharanidharanibscit2025@sankara.ac.in"
                  data-ocid="contact.email.link"
                  className="group relative flex flex-col gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-lg bg-primary/12 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <p className="font-display font-bold text-base mb-1">
                      Email
                    </p>
                    <p className="text-xs text-muted-foreground break-all leading-relaxed">
                      dharanidharanibscit2025@sankara.ac.in
                    </p>
                  </div>
                  <span className="text-xs text-primary font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    Send email →
                  </span>
                </motion.a>

                <motion.a
                  variants={fadeUp}
                  href="tel:9597493796"
                  data-ocid="contact.phone.link"
                  className="group relative flex flex-col gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-lg bg-primary/12 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <p className="font-display font-bold text-base mb-1">
                      Phone
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +91 9597493796
                    </p>
                  </div>
                  <span className="text-xs text-primary font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    Call now →
                  </span>
                </motion.a>

                <motion.a
                  variants={fadeUp}
                  href="https://www.linkedin.com/in/dharanidaran-i-9ba916380"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.linkedin.link"
                  className="group relative flex flex-col gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-lg bg-primary/12 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <p className="font-display font-bold text-base mb-1">
                      LinkedIn
                    </p>
                    <p className="text-sm text-muted-foreground">
                      dharanidaran-i
                    </p>
                  </div>
                  <span className="text-xs text-primary font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    View profile →
                  </span>
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="relative p-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card to-accent/5 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <h3 className="font-display font-black text-2xl">
                        Ready to collaborate?
                      </h3>
                    </div>
                    <p className="text-foreground/65 text-sm max-w-sm">
                      Drop me an email and let's build something meaningful
                      together.
                    </p>
                  </div>
                  <a
                    href="mailto:dharanidharanibscit2025@sankara.ac.in"
                    data-ocid="contact.primary_button"
                  >
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground glow-amber font-bold tracking-wide whitespace-nowrap"
                    >
                      <Mail className="mr-2 w-4 h-4" />
                      Send Me an Email
                    </Button>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="font-display font-black text-sm tracking-[0.12em] uppercase text-gradient hover:opacity-80 transition-opacity"
          >
            DHARANIDARAN
          </button>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-2">
            <a
              href="mailto:dharanidharanibscit2025@sankara.ac.in"
              data-ocid="footer.email.link"
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/dharanidaran-i-9ba916380"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.linkedin.link"
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
