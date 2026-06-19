"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image, { type StaticImageData } from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  Code2,
  Terminal,
  Database,
  Layers,
  Cpu,
  Globe,
  Braces,
  FileJson,
  Layout,
  Server,
  Wind,
  Box,
  Zap,
  Table2,
  History,
  Search,
  PenTool,
  Monitor,
  Github,
  Smartphone,
  BarChart,
  LineChart,
  BrainCircuit,
  Settings,
  PieChart
} from "lucide-react"
import styles from "./skills-section.module.css"

// Import custom icons
import CIcon from "./icons/c.png"
import CPPIcon from "./icons/cpp-svgrepo-com.png"
import PythonIcon from "./icons/python-127-svgrepo-com.png"
import JSIcon from "./icons/js01-svgrepo-com.png"
import KotlinIcon from "./icons/kotlin-svgrepo-com.png"
import ReactIcon from "./icons/react-svgrepo-com.png"
import NodeIcon from "./icons/node-fill-svgrepo-com.png"
import TailwindIcon from "./icons/tailwind-css-svgrepo-com.png"
import DjangoIcon from "./icons/django-fill-svgrepo-com.png"
import MySQLIcon from "./icons/mysql-svgrepo-com.png"
import PostgreIcon from "./icons/dbs-postgresql-svgrepo-com.png"
import OracleIcon from "./icons/oracle-svgrepo-com.png"
import SQLiteIcon from "./icons/sqlite-svgrepo-com.png"
import FigmaIcon from "./icons/figma-svgrepo-com.png"
import VSCodeIcon from "./icons/vs-code-svgrepo-com.png"
import GithubIcon from "./icons/github-142-svgrepo-com.png"
import AndroidIcon from "./icons/androidstudio-svgrepo-com.png"
import MatplotlibIcon from "./icons/matplotlib-icon.webp"
import SeabornIcon from "./icons/seaborn-1.svg"
import ScikitIcon from "./icons/scikitlearn-svgrepo-com.png"
import TensorFlowIcon from "./icons/tensorflow-svgrepo-com.png"
import ThreeJSIcon from "./icons/three js logo.png"
import NumPyIcon from "./icons/numpy-svgrepo-com.png"
import MongoDBIcon from "./icons/mongodb-svgrepo-com.png"

/* ──────────────────────────── DATA ──────────────────────────── */

interface Skill {
  name: string
  level: number
  icon: LucideIcon | StaticImageData
}

interface SkillCategory {
  title: string
  category: string
  skills: Skill[]
}

const ROTATING_WORDS = ["DESIGN", "ALGORITHMS", "DATA", "SYSTEMS", "CODE"]

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "WEB 1.0",
    category: "Programming Languages",
    skills: [
      { name: "C", icon: CIcon, level: 92 },
      { name: "C++", icon: CPPIcon, level: 80 },
      { name: "Python", icon: PythonIcon, level: 95 },
      { name: "JavaScript", icon: JSIcon, level: 80 },
      { name: "Kotlin", icon: KotlinIcon, level: 65 },
    ],
  },
  {
    title: "WEB 2.0",
    category: "Dev & Frameworks",
    skills: [
      { name: "React.JS", icon: ReactIcon, level: 80 },
      { name: "Node.JS", icon: NodeIcon, level: 60 },
      { name: "Tailwind CSS", icon: TailwindIcon, level: 90 },
      { name: "Three.js", icon: ThreeJSIcon, level: 80 },
      { name: "Django", icon: DjangoIcon, level: 65 },
    ],
  },
  {
    title: "WEB 3.0",
    category: "DBMS",
    skills: [
      { name: "MySQL", icon: MySQLIcon, level: 92 },
      { name: "PostgreSQL", icon: PostgreIcon, level: 80 },
      { name: "MongoDB", icon: MongoDBIcon, level: 95 },
      { name: "Oracle DB", icon: OracleIcon, level: 80 },
      { name: "SQLite", icon: SQLiteIcon, level: 65 },
    ],
  },
  {
    title: "WEB 4.0",
    category: "Tools",
    skills: [
      { name: "Figma", icon: FigmaIcon, level: 95 },
      { name: "VS Code", icon: VSCodeIcon, level: 80 },
      { name: "GitHub", icon: GithubIcon, level: 80 },
      { name: "Android Studio", icon: AndroidIcon, level: 60 },
    ],
  },
  {
    title: "WEB 5.0",
    category: "Data Science & ML (progress)",
    skills: [
      { name: "NumPy & Pandas", icon: NumPyIcon, level: 70 },
      { name: "Matplotlib", icon: MatplotlibIcon, level: 58 },
      { name: "TensorFlow", icon: TensorFlowIcon, level: 50 },
      { name: "Seaborn", icon: SeabornIcon, level: 45 },
      { name: "Scikit-Learn", icon: ScikitIcon, level: 40 },
    ],
  },
]

/* ──────────────────────── ROTATING HEADER ──────────────────── */

function RotatingHeading() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex]
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length - 1))
      }, 60)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1))
      }, 120)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [displayText, isDeleting, wordIndex])

  return (
    <h2 className={styles.heading} id="skills">
      <span className={styles.headingStatic}>CORE.</span>
      <span className={styles.headingDynamic}>
        {displayText}
        <span className={styles.cursor} aria-hidden="true">
          _
        </span>
      </span>
    </h2>
  )
}

/* ──────────────────────── PROGRESS BAR ─────────────────────── */

function ProgressBar({ level, animate, delay }: { level: number; animate: boolean; delay: number }) {
  return (
    <div className={styles.barTrack}>
      <div
        className={styles.barFill}
        style={{
          width: animate ? `${level}%` : "0%",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

/* ──────────────────────── SKILL CARD ───────────────────────── */

function SkillCard({
  category,
  animate,
  index,
}: {
  category: SkillCategory
  animate: boolean
  index: number
}) {
  return (
    <div
      className={`${styles.card} ${animate ? styles.cardVisible : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      data-cursor-target
    >
      <div className={styles.cardTitle}>{category.title}</div>

      <div className={styles.skillList}>
        {category.skills.map((skill, i) => {
          const Icon = skill.icon
          const isLucide = typeof Icon === "function"

          return (
            <div key={skill.name} className={styles.skillRow}>
              <div className={styles.skillInfo}>
                <span className={styles.skillIcon}>
                  {isLucide ? (
                    <Icon size={18} color="#000" strokeWidth={2.5} />
                  ) : (
                    <Image 
                      src={Icon} 
                      alt={skill.name} 
                      className={styles.skillIconImage}
                      width={18}
                      height={18}
                    />
                  )}
                </span>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillPercent}>{skill.level}%</span>
              </div>
              <ProgressBar
                level={skill.level}
                animate={animate}
                delay={index * 120 + i * 150}
              />
            </div>
          )
        })}
      </div>

      <div className={styles.categoryLabel}>{category.category}</div>
    </div>
  )
}

/* ──────────────────────── MAIN SECTION ─────────────────────── */

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setInView(true)
      })
    },
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [handleIntersect])

  // Once the section is in view we never need to react to scroll again —
  // unobserve the target so the callback stops firing on every scroll/resize.
  useEffect(() => {
    if (!inView) return
    const observer = new IntersectionObserver(() => undefined, { threshold: 0.1 })
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
      observer.unobserve(sectionRef.current)
    }
    observer.disconnect()
  }, [inView])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <RotatingHeading />

        <div className={styles.grid}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} animate={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
