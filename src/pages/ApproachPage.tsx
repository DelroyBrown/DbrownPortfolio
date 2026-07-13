import { DevelopmentPrinciples } from "../features/approach/DevelopmentPrinciples";
import { AiDevelopment } from "../features/aiDevelopment/AiDevelopment";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import "./pages.css";

export default function ApproachPage() {
  usePageMeta({
    title: `Approach — ${profile.name}`,
    description:
      "How Delroy J. Brown builds software: backend-first thinking, systems over screens, and a directed, verified AI-assisted workflow.",
    path: "/approach",
  });

  return (
    <div className="page">
      <AiDevelopment />
      <DevelopmentPrinciples />
    </div>
  );
}
