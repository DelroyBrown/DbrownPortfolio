import type { Profile } from "../types/content";
import { withBase } from "../utils/paths";

/**
 * Personal configuration — every name, link and contact detail on the
 * site is read from this file. Edit here, not in components.
 *
 * `email` may be set to null to remove all email links from the site.
 * `siteUrl` is used for canonical/OG metadata — update it when the
 * deployment URL is known.
 */
export const profile: Profile = {
  name: "Delroy J. Brown",
  shortName: "Delroy",
  initials: "DJB",
  title: "Creative Full-Stack Software Developer",
  statement:
    "I create full-stack software, interactive browser experiences and carefully engineered digital products. I use AI to accelerate production, while relying on software-development knowledge to shape architecture, review output and protect quality.",
  rotatingPhrases: [
    "Full-stack systems",
    "AWS cloud infrastructure",
    "Interactive browser experiences",
    "AI-assisted production",
    "Thoughtful software architecture",
    "Creative technical problem-solving",
  ],
  availability: "Available now — full-time or part-time, remote",
  currentFocus: "Care-sector software · browser physics experiments",
  location: "High Wycombe, UK",
  email: "delroybrown.db@gmail.com",
  phone: "07795 128316",
  github: "https://github.com/DelroyBrown",
  linkedin: "https://www.linkedin.com/in/delroy-brown-b83045226",
  cvUrl: withBase("cv/delroy-brown-cv.pdf"), // file lives in /public/cv
  siteUrl: "https://delroybrown.github.io/DbrownPortfolio",
  metaDescription:
    "Full-stack software, interactive browser experiences and AI-assisted development by Delroy J. Brown.",
};
