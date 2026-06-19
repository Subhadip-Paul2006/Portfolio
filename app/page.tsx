import Image from "next/image"
import SkillsSection from "@/components/skills-section"
import ContactForm from "@/components/contact-form"
import LinkedInIcon from "@/components/icons/linkedin.svg"
import GitHubIcon from "@/components/icons/github-142-svgrepo-com.svg"
import DiscordIcon from "@/components/icons/discord-svgrepo-com.svg"

export default function Home() {
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <a href="#" className="logo" aria-label="Subh.06 home">
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
            <a href="#services">Services</a>
            <a href="#contact">Hire Me</a>
          </div>
        </div>
      </nav>

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
          {/* TODO: compress /images/me.jpeg (~3.1 MB). Even with next/image optimization,
              the source asset is the dominant LCP contributor. */}
          <Image
            src="/images/me.jpeg"
            alt="Portrait of Subh.06"
            width={1200}
            height={1200}
            priority
            sizes="(max-width: 1200px) 50vw, 600px"
          />
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

      <h2 className="section-title" id="work">
        Selected Damage
      </h2>

      <section className="projects">
        <article className="project-card">
          <Image
            src="/images/project-1.jpg"
            alt="Cyber-punk e-commerce website preview"
            width={800}
            height={400}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="project-img"
          />
          <div className="project-tags">
            <span className="tag">Web Design</span>
            <span className="tag">2023</span>
          </div>
          <h3>CYBER-PUNK E-COMMERCE</h3>
          <p style={{ margin: "15px 0" }}>
            A brutalist approach to modern fashion retail. Conversion rates up by 40% because of the sheer audacity.
          </p>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }} aria-disabled="true">
            EXPLORE →
          </a>
        </article>
        <article className="project-card">
          <Image
            src="/images/project-2.jpg"
            alt="Neon Noir music collective brand identity"
            width={800}
            height={400}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="project-img"
          />
          <div className="project-tags">
            <span className="tag">Branding</span>
            <span className="tag">2024</span>
          </div>
          <h3>NEON NOIR IDENTITY</h3>
          <p style={{ margin: "15px 0" }}>
            Visual identity for a underground music collective. Thick lines, high contrast, maximum impact.
          </p>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }} aria-disabled="true">
            EXPLORE →
          </a>
        </article>
        <article className="project-card">
          <Image
            src="/images/project-3.jpg"
            alt="Chaos Dashboard data visualization tool"
            width={800}
            height={400}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="project-img"
          />
          <div className="project-tags">
            <span className="tag">App Design</span>
            <span className="tag">2023</span>
          </div>
          <h3>CHAOS DASHBOARD</h3>
          <p style={{ margin: "15px 0" }}>
            A data visualization tool that rejects the minimalism of SaaS. Information density meets raw aesthetic.
          </p>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }} aria-disabled="true">
            EXPLORE →
          </a>
        </article>
        <article className="project-card">
          <Image
            src="/images/project-4.jpg"
            alt="Glitch Protocol experimental WebGL website"
            width={800}
            height={400}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="project-img"
          />
          <div className="project-tags">
            <span className="tag">Development</span>
            <span className="tag">2024</span>
          </div>
          <h3>GLITCH PROTOCOL</h3>
          <p style={{ margin: "15px 0" }}>
            Experimental WebGL site for a tech startup. Optimized for performance, designed for disruption.
          </p>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }} aria-disabled="true">
            EXPLORE →
          </a>
        </article>
      </section>

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

      <footer>
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} JESS.VC NO RIGHTS RESERVED. COPY EVERYTHING.
        </p>
        <div style={{ marginTop: "20px", fontSize: "0.8rem" }}>
          BUILT WITH VIBES, CODE, AND BRUTALIST AESTHETICS.
        </div>
      </footer>
    </>
  )
}
