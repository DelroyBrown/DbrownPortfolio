/* ------------------------------------------------------------------ *
 *  Content types — every piece of site copy flows through these.     *
 * ------------------------------------------------------------------ */

export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  statement: string;
  rotatingPhrases: string[];
  availability: string;
  currentFocus: string;
  location: string;
  email: string | null;
  phone: string | null;
  github: string;
  linkedin: string | null;
  cvUrl: string | null;
  siteUrl: string;
  metaDescription: string;
}

export interface ExperienceRole {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  technologies: string[];
}

export interface EducationEntry {
  id: string;
  title: string;
  institution: string;
  period: string;
  note?: string;
  /** highlights an in-progress qualification */
  inProgress?: boolean;
}

export interface PersonalDetail {
  label: string;
  value: string;
}

export type GameKey = "pendulum" | "thread" | "invader";

export interface CodeExcerpt {
  id: string;
  project: GameKey;
  title: string;
  description: string;
  language: string;
  sourcePath: string;
  repositoryUrl: string;
  startLine: number;
  endLine: number;
  highlightedLines?: number[];
  code: string;
  /** Editorial story shown in the Code / Behaviour / Decision / Trade-off tabs. */
  story: {
    question: string;
    behaviour: string;
    decision: string;
    tradeOff: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  year: string;
  role: string;
  status: string;
  technologies: string[];
  keyFeatures: string[];
  engineeringChallenges: string[];
  outcomes: string[];
  image: string;
  imageAlt: string;
  gallery: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  aiAssisted: boolean;
  accent: string;
  codeExcerptIds?: string[];
}

export interface GameProject extends Project {
  subtitle: string;
  embedUrl: string;
  controlHint: string;
  orientationHint?: string;
  experienceDetails: string[];
  aiAssistanceNote: string;
  directed: string[];
  judgement: string[];
  accelerated: string[];
}

export interface WorkflowPhase {
  id: string;
  index: string;
  title: string;
  responsibility: string;
  aiAssistance: string;
  judgement: string;
  risk: string;
  verification: string;
}

export interface Principle {
  id: string;
  title: string;
  body: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  note: string;
  skills: string[];
  accent: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  detail: string;
  /** grid coordinates on a 12 × N layout grid */
  x: number;
  y: number;
  w: number;
  kind: "interface" | "bridge" | "core" | "system";
}

export interface DiagramEdge {
  from: string;
  to: string;
  bidirectional?: boolean;
}

export interface ArchitectureDiagramData {
  id: string;
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}
