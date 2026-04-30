import SkillsSection from "@/components/skills-section"

export default function Home() {
  return (
    <>
      <nav>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
        >
          <a href="#" className="logo">
            Subh.06
          </a>
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
          <a href="#work" className="brutal-btn">
            VIEW MY WORK
          </a>
        </div>
        <div className="hero-image">
          <div className="blob"></div>
          <img src="/images/me.jpeg" alt="Max Void Portrait" />
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-content">
          UI/UX DESIGNER // ALGORITHM THINKER // DATA-DRIVEN DEVELOPMENT // PROBLEM SOLVER // FRONTEND ENGINEERING // DATA SCIENCE ENTHUSIAST // SYSTEM DESIGN BASICS //
          UI/UX DESIGNER // ALGORITHM THINKER // DATA-DRIVEN DEVELOPMENT // PROBLEM SOLVER // FRONTEND ENGINEERING // DATA SCIENCE ENTHUSIAST // SYSTEM DESIGN BASICS //
        </div>
      </div>

      <SkillsSection />

      <h2 className="section-title" id="work">
        Selected Damage
      </h2>

      <section className="projects">
        <div className="project-card">
          <img src="/images/project-1.jpg" alt="Project 1" className="project-img" />
          <div className="project-tags">
            <span className="tag">Web Design</span>
            <span className="tag">2023</span>
          </div>
          <h3>CYBER-PUNK E-COMMERCE</h3>
          <p style={{ margin: "15px 0" }}>
            A brutalist approach to modern fashion retail. Conversion rates up by 40% because of the sheer audacity.
          </p>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }}>
            EXPLORE →
          </a>
        </div>
        <div className="project-card">
          <img src="/images/project-2.jpg" alt="Project 2" className="project-img" />
          <div className="project-tags">
            <span className="tag">Branding</span>
            <span className="tag">2024</span>
          </div>
          <h3>NEON NOIR IDENTITY</h3>
          <p style={{ margin: "15px 0" }}>
            Visual identity for a underground music collective. Thick lines, high contrast, maximum impact.
          </p>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }}>
            EXPLORE →
          </a>
        </div>
        <div className="project-card">
          <img src="/images/project-3.jpg" alt="Project 3" className="project-img" />
          <div className="project-tags">
            <span className="tag">App Design</span>
            <span className="tag">2023</span>
          </div>
          <h3>CHAOS DASHBOARD</h3>
          <p style={{ margin: "15px 0" }}>
            A data visualization tool that rejects the minimalism of SaaS. Information density meets raw aesthetic.
          </p>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }}>
            EXPLORE →
          </a>
        </div>
        <div className="project-card">
          <img src="/images/project-4.jpg" alt="Project 4" className="project-img" />
          <div className="project-tags">
            <span className="tag">Development</span>
            <span className="tag">2024</span>
          </div>
          <h3>GLITCH PROTOCOL</h3>
          <p style={{ margin: "15px 0" }}>
            Experimental WebGL site for a tech startup. Optimized for performance, designed for disruption.
          </p>
          <a href="#" style={{ color: "inherit", fontWeight: 700 }}>
            EXPLORE →
          </a>
        </div>
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
          <h2 style={{ fontSize: "5rem", marginBottom: "20px" }}>LET&apos;S TALK.</h2>
          <p style={{ fontSize: "1.5rem", marginBottom: "40px" }}>
            Got a project that&apos;s too bold for the average agency?
          </p>
          <p>
            <strong>EMAIL:</strong> hello@jess.vc
          </p>
          <p>
            <strong>LOCATION:</strong> Berlin / Remote
          </p>
          <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
            <a href="#" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>
              TWITTER
            </a>
            <a href="#" style={{ color: "var(--secondary)", textDecoration: "none", fontWeight: 700 }}>
              DRIBBBLE
            </a>
            <a href="#" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 700 }}>
              INSTAGRAM
            </a>
          </div>
        </div>
        <div className="contact-form">
          <form>
            <div className="input-group">
              <label>YOUR NAME</label>
              <input type="text" placeholder="John 'The Maverick' Doe" />
            </div>
            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <input type="email" placeholder="john@unconventional.com" />
            </div>
            <div className="input-group">
              <label>THE MISSION</label>
              <textarea rows={5} placeholder="Tell me why we should break the internet together..."></textarea>
            </div>
            <button type="submit">SEND TRANSMISSION</button>
          </form>
        </div>
      </section>

      <footer>
        <p>© 2026 JESS.VC NO RIGHTS RESERVED. COPY EVERYTHING.</p>
        <div style={{ marginTop: "20px", fontSize: "0.8rem" }}>BUILT WITH VIBES, CODE, AND BRUTALIST AESTHETICS.</div>
      </footer>
    </>
  )
}
