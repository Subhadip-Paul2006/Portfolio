export type Project = {
  title: string
  category: string
  yearOrStack: string
  summary: string
  description: string
  imageSrc?: string
  imageAlt: string
  tone: "orange" | "violet" | "amber" | "blue"
  tags: string[]
  techStack: string[]
  links: {
    github: string
    linkedin: string
    demo: string
  }
}

export const PROJECTS: Project[] = [
  {
    title: "R3FLEX",
    category: "Supply Chain",
    yearOrStack: "Hackathon",
    summary:
      "AI-powered supply chain platform for real-time tracking, optimization, and logistics management.",
    description:
      "R3FLEX is an AI-assisted supply chain platform built to make logistics decisions faster and easier to understand. It brings shipment tracking, inventory visibility, route insights, and operational alerts into one focused workspace. The project explores how predictive intelligence and clear data visualization can help teams identify risks early, reduce delays, and coordinate complex supply networks with confidence.",
    imageSrc: "/images/R3FLEX.png",
    imageAlt: "R3FLEX project preview",
    tone: "orange",
    tags: ["Supply Chain", "Hackathon"],
    techStack: ["Next.js", "TypeScript", "Fast API", "Supabase", "TensorFlow"],
    links: {
      github: "https://github.com/Subhadip-Paul2006/Supply_Chain_Logistics",
      linkedin: "https://www.linkedin.com/in/subhadip-paul-471186339/",
      demo: "https://r3flex.vercel.app/",
    },
  },
  {
    title: "NEETI AI",
    category: "Interview Agent",
    yearOrStack: "Hackathon",
    summary:
      "Visual identity for an underground music collective. Thick lines, high contrast, maximum impact.",
    description:
      "NEON NOIR is a visual identity system created for an underground music collective with a loud, cinematic presence. The direction combines heavy typography, saturated color, stark contrast, and flexible graphic elements for digital releases, posters, and social campaigns. Every asset is designed to remain recognizable across formats while preserving the raw energy and mystery of the collective.",
    imageAlt: "Neon Noir identity banner",
    tone: "violet",
    tags: ["Branding", "2024"],
    techStack: ["Next.js", "TypeScript", "Python", "Supabase", "Fast API"],
    links: {
      github: "https://github.com/Subhadip-Paul2006",
      linkedin: "https://www.linkedin.com/in/subhadip-paul-471186339/",
      demo: "https://neetiai.vercel.app/",
    },
  },
  {
    title: "DHRISTI",
    category: "Cyber Security",
    yearOrStack: "2026",
    summary:
      "Same scan. Reprioritized by reachability. Drishti tells you where to actually look.",
    description:
      "A vulnerability scanner produces thousands of findings, each with a severity score and no context. You can't fix thousands of things at once, and a 'critical' bug on an unreachable server matters less than a 'medium' bug one hop from the internet and wired to your customer database.",
    imageSrc: "/images/Dhristi.png",
    imageAlt: "Dhristi project preview",
    tone: "amber",
    tags: ["CyberSecurity", "Hackathon"],
    techStack: ["Nmap", "FastAPI", "Google virus Scanner", "TypeScript", "NetworkX"],
    links: {
      github: "https://github.com/soumyachk101/Drishti---Citadel",
      linkedin: "https://www.linkedin.com/posts/subhadip-paul-471186339_hackathon-cybersecurity-development-ugcPost-7482467252332851202-tHiJ/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFTrzxUBwrfRTniXJOW9Q-1AKyxH3syt-Ig",
      demo: "https://web-one-virid-58.vercel.app/",
    },
  },
  {
    title: "PyGames - Android",
    category: "Under Development",
    yearOrStack: "Flutter | Android",
    summary:
      "Multi-game platform combining Python games into one unified Android experience.",
    description:
      "PyGames brings a collection of Python-inspired casual games into one unified Android application. Players can discover titles, manage a profile, track achievements, and compare scores without moving between separate apps. The project focuses on creating a consistent Flutter interface around varied game mechanics while building a scalable foundation for cloud saves, leaderboards, and future multiplayer experiences.",
    imageSrc: "/images/PyGame_Application.png",
    imageAlt: "PyGames Android project preview",
    tone: "blue",
    tags: ["Under Development", "Flutter | Android"],
    techStack: ["Flutter", "Kotlin", "Python", "C#", "Firebase"],
    links: {
      github: "https://github.com/Subhadip-Paul2006",
      linkedin: "https://www.linkedin.com/in/subhadip-paul-471186339/",
      demo: "#",
    },
  },
]
