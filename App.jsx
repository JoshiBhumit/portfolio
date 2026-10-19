// src/App.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  AtSign,
  Check,
  Circle,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  MoveUpRight,
  Sun,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

import { profile, projects, skills, timeline } from "./data";

const nav = ["home", "about", "work", "stack", "journey", "contact"];

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("portfolio-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const [pointer, setPointer] = useState({ x: 50, y: 25 });
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectFilter, setProjectFilter] = useState("All");
  const [stats, setStats] = useState({ projects: 0, skills: 0, degree: 0 });
  const toastTimer = useRef(null);
  const statsFrame = useRef(null);

  const projectFilters = ["All", ...new Set(projects.map((project) => project.type))];
  const visibleProjects = projects.filter(
    (project) => projectFilter === "All" || project.type === projectFilter
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const targets = { projects: projects.length, skills: skills.length, degree: 1 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setStats(targets);
      return undefined;
    }

    const startedAt = performance.now();
    const duration = 900;
    const animateStats = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStats({
        projects: Math.round(targets.projects * eased),
        skills: Math.round(targets.skills * eased),
        degree: Math.round(targets.degree * eased),
      });
      if (progress < 1) statsFrame.current = requestAnimationFrame(animateStats);
    };

    statsFrame.current = requestAnimationFrame(animateStats);
    return () => cancelAnimationFrame(statsFrame.current);
  }, []);

  useEffect(() => {
    const move = (e) => {
      setPointer({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const key = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
        setMenu(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("keydown", key);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("keydown", key);
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
      );

      const current = [...nav]
        .reverse()
        .find((id) => document.getElementById(id)?.getBoundingClientRect().top <= 120);
      setActiveSection(current || "home");
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!selected) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenu(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast("Email copied");
    } catch {
      setToast("Copy failed");
    }

    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 1800);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="app"
      style={{
        "--mx": `${pointer.x}px`,
        "--my": `${pointer.y}px`,
      }}
    >
      <div className="cursor-glow" />
      <div
        className="scroll-progress"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        style={{ "--progress": `${scrollProgress}%` }}
      />

      {/* NAVBAR */}
      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => go("home")}>
            <span className="brand-icon">
              <Code2 size={17} />
            </span>

            <span>
              <span className="accent">BHUMIT WORLD</span>
            </span>
          </button>

          <nav id="site-navigation" className={menu ? "nav mobile" : "nav"} aria-label="Main navigation">
            {nav.map((item) => (
              <button
                key={item}
                className={activeSection === item ? "active" : ""}
                aria-current={activeSection === item ? "location" : undefined}
                onClick={() => go(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="top-actions">
            <button
              className="tiny-btn"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? (
                <Moon size={16} />
              ) : (
                <Sun size={16} />
              )}
            </button>

            <button
              className={`tiny-btn menu-toggle${menu ? " is-open" : ""}`}
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="site-navigation"
              aria-expanded={menu}
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <motion.div
              className="hero-left"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="status-line">
                <span className="live-dot" />
                OPEN TO NEW OPPORTUNITIES
              </div>

              <div className="hero-label">
                / hello_world
              </div>

              <h1>
                I turn ideas
                <br />
                into{" "}
                <span className="grad-word">
                  products.
                </span>
              </h1>

              <p className="hero-role">{profile.role}</p>

              <p className="hero-summary">
                {profile.summary}
              </p>

              <div className="hero-actions">
                <button
                  className="primary-btn"
                  onClick={() => go("work")}
                >
                  Explore work
                  <ArrowUpRight size={17} />
                </button>

                {profile.resume && (
                  <a
                    className="ghost-btn"
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download size={16} />
                    Resume
                  </a>
                )}
              </div>

              <div className="hero-links">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={16} />
                  GitHub
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>

                <button onClick={copyEmail}>
                  <AtSign size={16} />
                  Email
                </button>
              </div>
            </motion.div>

            {/* TERMINAL */}
            <motion.div
              className="console-shell"
              initial={{
                opacity: 0,
                scale: 0.96,
                rotate: 1,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.65,
              }}
            >
              <div className="console-header">
                <div className="traffic">
                  <i />
                  <i />
                  <i />
                </div>

                <span>~/portfolio</span>

                <Circle
                  size={11}
                  fill="currentColor"
                />
              </div>

              <div className="console-body">
                <div className="line muted">
                  1&nbsp;&nbsp; $ whoami
                </div>

                <div className="line output">
                  {profile.name}
                </div>

                <div className="line muted">
                  2&nbsp;&nbsp; $ role
                </div>

                <div className="line output">
                  {profile.role}
                </div>

                <div className="line muted">
                  3&nbsp;&nbsp; $ focus
                </div>

                <div className="line output">
                  full-stack • AI/ML • product
                </div>

                <div className="line muted">
                  4&nbsp;&nbsp; $ status
                </div>

                <div className="line success">
                  ● building_mode = true
                </div>

                <div className="terminal-divider" />

                <div className="console-stat">
                  <div>
                    <strong>{String(stats.projects).padStart(2, "0")}</strong>
                    <span>projects</span>
                  </div>

                  <div>
                    <strong>{String(stats.skills).padStart(2, "0")}</strong>
                    <span>skills</span>
                  </div>

                  <div>
                    <strong>{String(stats.degree).padStart(2, "0")}</strong>
                    <span>degree</span>
                  </div>
                </div>
              </div>

              <div className="console-footer">
                <span>Connected</span>
                <span>localhost:5173</span>
              </div>
            </motion.div>
          </div>

          <button
            className="scroll-cue"
            onClick={() => go("about")}
          >
            <ArrowDown size={15} />
            scroll to inspect
          </button>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="container">
            <div className="eyebrow">
              01 — ABOUT
            </div>

            <div className="section-title-row">
              <h2>
                A portfolio that feels like a product.
              </h2>

              <p>
                Instead of another basic resume page, this portfolio
                presents your work like a developer dashboard.
              </p>
            </div>

            <div className="bento">
              <motion.article
                className="bento-card intro-card"
                whileHover={{ y: -5 }}
              >
                <div className="card-icon purple">
                  <Sparkles size={18} />
                </div>

                <span className="card-kicker">
                  THE IDEA
                </span>

                <h3>
                  Show the person behind the code.
                </h3>

                <p>
                  Use the website to show your thinking,
                  projects, skills, and growth instead of
                  simply listing technologies.
                </p>

                <div className="mini-list">
                  <span>
                    <Check size={14} />
                    Problem-first storytelling
                  </span>

                  <span>
                    <Check size={14} />
                    Interactive projects
                  </span>

                  <span>
                    <Check size={14} />
                    One-click contact
                  </span>
                </div>
              </motion.article>

              <motion.article
                className="bento-card location-card"
                whileHover={{ y: -5 }}
              >
                <div className="card-icon cyan">
                  <Globe2 size={18} />
                </div>

                <span className="card-kicker">
                  CURRENTLY
                </span>

                <strong>Based in</strong>

                <h3>{profile.location}</h3>

                <p>
                  Open to internships, projects,
                  collaborations and learning opportunities.
                </p>

                <div className="pulse-bar">
                  <span />
                  available
                </div>
              </motion.article>

              <motion.article
                className="bento-card quote-card"
                whileHover={{ y: -5 }}
              >
                <div className="quote-mark">
                  “
                </div>

                <p>
                  Build something small. Make it useful.
                  Then make it better.
                </p>

                <span>
                  — personal rule
                </span>
              </motion.article>

              <motion.article
                className="bento-card focus-card"
                whileHover={{ y: -5 }}
              >
                <div className="focus-top">
                  <div className="card-icon orange">
                    <Zap size={18} />
                  </div>

                  <span className="card-kicker">
                    CURRENT FOCUS
                  </span>
                </div>

                <h3>
                  From classroom concepts to production-style projects.
                </h3>

                <div className="focus-tags">
                  <span>APIs</span>
                  <span>AI/ML</span>
                  <span>Databases</span>
                  <span>UI</span>
                  <span>Debugging</span>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="section work-section">
          <div className="container">
            <div className="eyebrow">
              02 — SELECTED WORK
            </div>

            <div className="section-title-row">
              <h2>
                Projects worth opening.
              </h2>

              <p>
                Click a project to inspect the complete
                case-study style popup.
              </p>
            </div>

            <div className="project-list">
              <div className="project-filters" role="group" aria-label="Filter projects">
                {projectFilters.map((filter) => (
                  <button
                    key={filter}
                    className={projectFilter === filter ? "selected" : ""}
                    aria-pressed={projectFilter === filter}
                    onClick={() => setProjectFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="work-card"
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.18,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`work-art ${project.color}`}
                  >
                    <div className="art-grid" />

                    <div className="art-icon">
                      {project.id === "01" ? (
                        <Sparkles size={29} />
                      ) : project.id === "02" ? (
                        <Layers3 size={29} />
                      ) : (
                        <Terminal size={29} />
                      )}
                    </div>

                    <span className="art-index">
                      {project.id}
                    </span>
                  </div>

                  <div className="work-info">
                    <div className="work-meta">
                      <span>{project.type}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3>{project.title}</h3>

                    <p>{project.summary}</p>

                    <div className="work-bottom">
                      <div className="tags">
                        {project.stack
                          .slice(0, 4)
                          .map((tag) => (
                            <span key={tag}>
                              {tag}
                            </span>
                          ))}
                      </div>

                      <button
                        className="project-open"
                        aria-label={`Open ${project.title} case study`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(project);
                        }}
                      >
                        Open
                        <MoveUpRight size={15} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="section">
          <div className="container">
            <div className="eyebrow">
              03 — STACK
            </div>

            <div className="section-title-row">
              <h2>
                Tools I can build with.
              </h2>

              <p>
                Keep only technologies you can confidently
                explain and demonstrate.
              </p>
            </div>

            <div className="stack-layout">
              <div className="skills-panel">
                {skills.map((skill, index) => (
                  <div
                    className="skill-row"
                    key={skill.label}
                  >
                    <div className="skill-heading">
                      <span>{skill.label}</span>
                      <b>{skill.level}%</b>
                    </div>

                    <div className="skill-track">
                      <motion.div
                        className="skill-fill"
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: `${skill.level}%`,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.06,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="stack-terminal">
                <div className="console-header">
                  <div className="traffic">
                    <i />
                    <i />
                    <i />
                  </div>

                  <span>stack.config</span>
                </div>

                <pre>{`const stack = {
  frontend: ["React", "JavaScript", "CSS"],
  backend: ["Python", "Django", "FastAPI"],
  database: ["SQL", "SQLite"],
  ai: ["Pandas", "NumPy", "sklearn"],
  tools: ["Git", "Postman"]
};

build();
ship();
learn();`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="section">
          <div className="container">
            <div className="eyebrow">
              04 — JOURNEY
            </div>

            <h2 className="journey-title">
              Still learning. Still shipping.
            </h2>

            <div className="journey-list">
              {timeline.map((item, index) => (
                <motion.div
                  className="journey-item"
                  key={item.date}
                  initial={{
                    opacity: 0,
                    x: index % 2 ? 18 : -18,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                >
                  <div className="journey-dot" />

                  <div className="journey-date">
                    {item.date}
                  </div>

                  <div className="journey-card">
                    <span>{item.subtitle}</span>

                    <h3>{item.title}</h3>

                    <p>{item.copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="contact-frame">
              <div className="contact-visual">
                <div className="eyebrow">
                  05 — CONTACT
                </div>

                <h2>
                  Let’s make the next project interesting.
                </h2>

                <p>
                  Internship, collaboration, project idea,
                  or just a technical conversation.
                </p>

                <div className="contact-actions">
                  <a
                    className="primary-btn"
                    href={`mailto:${profile.email}`}
                  >
                    <Mail size={17} />
                    Start a conversation
                  </a>

                  <button
                    className="ghost-btn"
                    onClick={copyEmail}
                  >
                    <Copy size={16} />
                    Copy email
                  </button>
                </div>
              </div>

              <div className="contact-terminal">
                <div className="console-header">
                  <div className="traffic">
                    <i />
                    <i />
                    <i />
                  </div>

                  <span>contact.sh</span>
                </div>

                <div className="contact-terminal-body">
                  <div className="muted">
                    # preferred channel
                  </div>

                  <div className="output">
                    {profile.email}
                  </div>

                  <div className="muted">
                    # location
                  </div>

                  <div className="output">
                    {profile.location}
                  </div>

                  <div className="terminal-divider" />

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={16} />
                    github.com →
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin size={16} />
                    linkedin.com →
                  </a>

                  <a
                    href={`mailto:${profile.email}`}
                  >
                    <Mail size={16} />
                    email me →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="footer-top">
            <a className="footer-brand" href="#home" aria-label={`${profile.name}, back to top`}>
              <span className="brand-icon">
                <Code2 size={17} />
              </span>
              <span>
                <strong>{profile.name}</strong>
                <small>Building useful things for the web.</small>
              </span>
            </a>

            <nav className="footer-links" aria-label="Social links">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={17} />
                <span>GitHub</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={17} />
                <span>LinkedIn</span>
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail size={17} />
                <span>Email</span>
              </a>
            </nav>
          </div>

          <div className="footer-bottom">
            <span className="copyright">
              © {currentYear} {profile.name}. All rights reserved.
            </span>

            <div className="footer-tech" aria-label="Built with React, Vite, and Framer Motion">
              <span>React</span>
              <span>Vite</span>
              <span>Motion</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="case-study"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.98,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelected(null)}
              >
                <X size={18} />
              </button>

              <div
                className={`case-hero ${selected.color}`}
              >
                <span>{selected.type}</span>

                <strong>
                  {selected.title}
                </strong>

                <small>
                  {selected.year}
                </small>
              </div>

              <div className="case-body">
                <span className="eyebrow">
                  CASE STUDY
                </span>

                <h2>
                  {selected.summary}
                </h2>

                <p>
                  {selected.description}
                </p>

                <div className="case-grid">
                  <div>
                    <span className="case-label">
                      STACK
                    </span>

                    <div className="tags big">
                      {selected.stack.map((item) => (
                        <span key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="case-label">
                      LINKS
                    </span>

                    <div className="case-links">
                      {selected.github && (
                        <a href={selected.github} target="_blank" rel="noreferrer">
                          <Github size={15} />
                          Source
                          <ExternalLink size={14} />
                        </a>
                      )}

                      {selected.demo && (
                        <a href={selected.demo} target="_blank" rel="noreferrer">
                          <Globe2 size={15} />
                          Demo
                          <ExternalLink size={14} />
                        </a>
                      )}

                      {!selected.github && !selected.demo && (
                        <span className="case-unavailable">Project links not added yet</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            aria-live="polite"
            initial={{
              y: 18,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 18,
              opacity: 0,
            }}
          >
            {toast === "Email copied" ? <Check size={15} /> : <X size={15} />}
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;