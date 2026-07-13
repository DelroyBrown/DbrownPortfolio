import type { EducationEntry, ExperienceRole } from "../types/content";

/* ------------------------------------------------------------------ *
 *  Professional history — sourced from the CV. Keep the two in sync: *
 *  when the CV changes, update this file (and /public/cv/).          *
 * ------------------------------------------------------------------ */

export const experienceIntro =
  "Four-plus years of professional development across healthcare, manufacturing and freelance product work — with AWS cloud infrastructure and backend automation as the connecting thread.";

export const experienceRoles: ExperienceRole[] = [
  {
    id: "bina-q",
    company: "BINA-Q",
    role: "Software Developer",
    period: "Nov 2023 — May 2025",
    summary:
      "End-to-end development of a healthcare platform built on Django and React.",
    points: [
      "Designed and implemented secure REST APIs deployed on AWS S3 and Heroku",
      "Built internal React dashboards for real-time data visualisation and monitoring",
      "Worked in an agile/scrum environment with code review and CI/CD deployment",
      "Used AI-assisted debugging and rapid prototyping to accelerate development cycles",
    ],
    technologies: ["Django", "React", "REST APIs", "AWS S3", "Heroku", "CI/CD"],
  },
  {
    id: "freelance",
    company: "Independent / various clients",
    role: "Freelance Software Developer",
    period: "2018 — Present",
    summary:
      "Designed, developed and deployed 20+ responsive websites for SMEs, non-profits and startups.",
    points: [
      "Managed the complete project lifecycle — requirements, build, deployment, maintenance",
      "Integrated Stripe and PayPal for secure payment and booking flows",
      "Migrated 5+ legacy applications to modern cloud infrastructure (AWS S3, Heroku)",
      "Cut deployment time by 40% with automated pipelines; 99.5% uptime across production apps",
    ],
    technologies: ["Django", "React", "Python", "PostgreSQL", "AWS", "Stripe", "PayPal"],
  },
  {
    id: "it-career-switch",
    company: "IT Career Switch Ltd",
    role: "Full Stack Developer Traineeship",
    period: "2023 — 2024",
    summary:
      "A one-year comprehensive programme building production-ready applications across the stack.",
    points: [
      "Worked across 12+ languages and frameworks — Python, Django, React, JavaScript, Java, C, PHP, Node.js",
      "Database design across SQL, MySQL, PostgreSQL, SQLite and Firestore",
      "Cloud deployment to AWS S3 and Heroku with professional Git workflows",
    ],
    technologies: ["Python", "Django", "React", "Node.js", "MySQL", "Firestore"],
  },
  {
    id: "e3d",
    company: "E3D Online Ltd",
    role: "Junior Developer & Production Support",
    period: "2020 — 2022",
    summary:
      "Internal tools and manufacturing systems for a 3D-printing hardware company.",
    points: [
      "Built internal React dashboards for manufacturing metrics and real-time analytics",
      "Automated 10+ manual reporting processes with Python and Django, reducing manual processing by 35%",
      "Delivered 3+ production applications with zero critical bugs in their first quarter",
    ],
    technologies: ["React", "Python", "Django", "Reporting automation"],
  },
];

export const education: EducationEntry[] = [
  {
    id: "code-institute",
    title: "Diploma in Full Stack Web Development",
    institution: "Code Institute & Edinburgh Napier University",
    period: "2019 — 2021",
  },
  {
    id: "codecademy",
    title: "Full Stack Engineer Career Path · Python 3 · React · JavaScript",
    institution: "Codecademy certifications",
    period: "2019 — 2021",
  },
  {
    id: "aws-cert",
    title: "AWS Cloud Certification (Associate level)",
    institution: "In progress",
    period: "Current",
    note: "Alongside ongoing work with IAM, S3 and EC2 in production",
  },
];
