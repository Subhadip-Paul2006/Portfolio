"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github, Linkedin, X } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { PROJECTS, type Project } from "@/components/projects/project-data"
import styles from "@/components/projects/projects-section.module.css"

const toneClass: Record<Project["tone"], string> = {
  orange: styles.toneOrange,
  violet: styles.toneViolet,
  amber: styles.toneAmber,
  blue: styles.toneBlue,
}

function ProjectCover({
  project,
  className,
  priority = false,
}: {
  project: Project
  className: string
  priority?: boolean
}) {
  return (
    <div className={`${styles.coverFrame} ${className}`}>
      {project.imageSrc ? (
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          priority={priority}
          className={styles.coverImage}
        />
      ) : (
        <div className={`${styles.coverFallback} ${toneClass[project.tone]}`}>
          <span className={styles.coverLabel}>{project.category}</span>
          <strong className={styles.coverKicker}>{project.yearOrStack}</strong>
        </div>
      )}
    </div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const projectId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

  return (
    <div className={styles.modalShell}>
      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close project details"
      >
        <X size={19} aria-hidden="true" />
      </button>

      <ProjectCover project={project} className={styles.modalCover} priority />

      <div className={styles.modalBody}>
        <header className={styles.modalHeader}>
          <div className={styles.modalTags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.modalChip}>
                {tag}
              </span>
            ))}
          </div>
          <DialogTitle className={styles.modalTitle}>{project.title}</DialogTitle>
          <DialogDescription className={styles.modalDescription}>
            {project.description}
          </DialogDescription>
        </header>

        <div className={styles.modalGrid}>
          <section aria-labelledby={`${projectId}-tech-stack`}>
            <span id={`${projectId}-tech-stack`} className={styles.sectionLabel}>
              Tech Stack
            </span>
            <div className={styles.techList}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techChip}>
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.linkPanel} aria-labelledby={`${projectId}-links`}>
            <span id={`${projectId}-links`} className={styles.sectionLabel}>
              Links
            </span>
            <div className={styles.linkActions}>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                title="GitHub repository"
                className={styles.iconLink}
              >
                <Github size={19} aria-hidden="true" />
              </a>
              <a
                href={project.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} LinkedIn post`}
                title="LinkedIn post"
                className={styles.iconLink}
              >
                <Linkedin size={19} aria-hidden="true" />
              </a>
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                title="Live demo"
                className={styles.iconLink}
              >
                <ExternalLink size={19} aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <h2 className="section-title" id="work">
        Selected Damage
      </h2>

      <section className="projects">
        {PROJECTS.map((project) => (
          <article key={project.title} className="project-card">
            <ProjectCover project={project} className={styles.cardCover} />
            <div className={`project-tags ${styles.cardTags}`}>
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <h3>{project.title}</h3>
            <p className={styles.cardSummary}>{project.summary}</p>
            <button
              type="button"
              className="project-link"
              onClick={() => setSelectedProject(project)}
              aria-haspopup="dialog"
              aria-controls="project-details"
            >
              EXPLORE -&gt;
            </button>
          </article>
        ))}
      </section>

      <Dialog
        open={Boolean(selectedProject)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null)
          }
        }}
      >
        <DialogContent
          id="project-details"
          showCloseButton={false}
          className={styles.dialogContent}
        >
          {selectedProject ? (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}