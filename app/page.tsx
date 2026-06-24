import Image from "next/image"
import Link from "next/link"
import ProjectsSection from "@/components/projects/projects-section"
import SkillsSection from "@/components/skills-section"
import ContactForm from "@/components/contact-form"
// Static SVG icons are imported as paths so Next can fingerprint them as
// cacheable static assets instead of bundling them through the client graph.
import LinkedInIcon from "@/components/icons/linkedin.svg"
import GitHubIcon from "@/components/icons/github-142-svgrepo-com.svg"
import DiscordIcon from "@/components/icons/discord-svgrepo-com.svg"

// Computed once at build time - avoids per-render Date allocation and
// removes the need for suppressHydrationWarning on the footer.
const YEAR = new Date().getFullYear()

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <nav>
        <div className="container nav-inner">
          <a href="#" className="logo">
            Subh.06
          </a>
          {/* CSS-only hamburger: the checkbox drives .nav-links visibility
              via the sibling selector in app/globals.css. No JS required. */}
          <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-label="Toggle navigation" />
          <label htmlFor="nav-toggle" className="nav-burger" aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </label>
          <div className="nav-links">
            <a href="#skills">Skills</a>
            <a href="#work">Projects</a>
            <Link href="/art-gallery">Art Gallery</Link>
            <a href="#contact">Hire Me</a>
          </div>
        </div>
      </nav>

      <main id="main">
        <section className="hero">
          <div className="hero-text">
            <p className="hero-tagline">UI UX // DSA PRACTITIONER // DATA SCIENCE</p>
            <h1>DESIGN ANALYZE BUILD.</h1>
            <p style={{ fontSize: "1.2rem", maxWidth: "500px", marginBottom: "30px" }}>
              I create intuitive user experiences, solve problems using data structures and algorithms, and explore data to uncover meaningful insights. Focused on building efficient, scalable, and user-centered solutions.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "15px" }}>
              <a href="#work" className="brutal-btn">
                MY WORK
              </a>
              <a
                href="https://github.com/Subhadip-Paul2006/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "var(--border-width) solid var(--black)", boxShadow: "4px 4px 0 var(--black)", background: "var(--bg)", padding: "8px" }}
              >
                <Image src={GitHubIcon} alt="GitHub" width={32} height={32} />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="blob" aria-hidden="true"></div>
            {/* Two source variants so phones don't download the desktop
                master. next/image picks the right one from `src`; the
                <picture> wrapper adds AVIF/WebP via the optimizer while
                still letting the browser choose between two resolutions
                by media query. */}
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/_next/image?url=%2Fimages%2Fme-720.png&w=750&q=75&f=avif 1x, /_next/image?url=%2Fimages%2Fme-720.png&w=1080&q=75&f=avif 2x"
                type="image/avif"
              />
              <Image
                src="/images/me.png"
                alt=""
                width={1200}
                height={1200}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </picture>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          {/* The marquee text is duplicated so the translateX(-50%) loop
              is seamless. aria-hidden keeps screen readers from reading it
              twice. */}
          <div className="marquee-content">
            UI/UX DESIGNER // ALGORITHM THINKER // DATA-DRIVEN DEVELOPMENT // PROBLEM SOLVER // FRONTEND ENGINEERING // DATA SCIENCE ENTHUSIAST // SYSTEM DESIGN BASICS //&nbsp;
            UI/UX DESIGNER // ALGORITHM THINKER // DATA-DRIVEN DEVELOPMENT // PROBLEM SOLVER // FRONTEND ENGINEERING // DATA SCIENCE ENTHUSIAST // SYSTEM DESIGN BASICS //&nbsp;
          </div>
        </div>

        <SkillsSection />

        <ProjectsSection />

        <section className="services" id="services">
          <div className="service-box">
            <h3>VIBE CODE</h3>
            <p>React, Next.js, TypeScript. Code that performs and looks incredible.</p>
          </div>
          <div className="service-box">
            <h3>UI CRAFT</h3>
            <p>Brutalist interfaces that prioritize character and usability.</p>
          </div>
          <div className="service-box">
            <h3>ANIMATIONS</h3>
            <p>Smooth interactions and motion that enhance the experience.</p>
          </div>
          <div className="service-box">
            <h3>ARCHITECTURE</h3>
            <p>Clean, scalable code that developers actually enjoy working with.</p>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-info">
            <h2 className="contact-title">LET&apos;S TALK.</h2>
            <p className="contact-lead">
              Got a project that&apos;s too bold for the average agency?
            </p>
            <p>
              <strong>EMAIL:</strong>{" "}
              <a href="mailto:hello@jess.vc" className="contact-link">
                futurecareergoal@gmail.com
              </a>
            </p>
            <p>
              <strong>LOCATION:</strong> Durgapur / Remote
            </p>
            <div className="contact-socials">
              <a
                href="https://www.linkedin.com/in/subhadip-paul-471186339/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <Image src={LinkedInIcon} alt="LinkedIn" width={32} height={32} />
              </a>
              <a
                href="https://github.com/Subhadip-Paul2006/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-icon"
              >
                <Image src={GitHubIcon} alt="GitHub" width={32} height={32} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="social-icon"
              >
                <Image src={DiscordIcon} alt="Discord" width={32} height={32} />
              </a>
            </div>
          </div>
          <div className="contact-form">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <p>
          {"\u00A9"} {YEAR} JESS.VC NO RIGHTS RESERVED. COPY EVERYTHING.
        </p>
        <div className="footer-tag">
          BUILT WITH VIBES, CODE, AND BRUTALIST AESTHETICS.
        </div>
      </footer>
    </>
  )
}
