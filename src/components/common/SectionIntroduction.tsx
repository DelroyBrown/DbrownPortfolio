import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionIntroductionProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  accent?: string;
}

/** Editorial section opener: numbered eyebrow, display title, optional lede. */
export function SectionIntroduction({
  index,
  eyebrow,
  title,
  lede,
  accent,
}: SectionIntroductionProps) {
  return (
    <header
      className="section-introduction"
      style={accent ? { ["--accent" as string]: accent } : undefined}
    >
      <Reveal as="p" className="section-label">
        <span className="index">{index}</span>
        {eyebrow}
      </Reveal>
      <Reveal as="h2" className="section-introduction__title" delay={80}>
        {title}
      </Reveal>
      {lede && (
        <Reveal as="div" className="section-introduction__lede prose" delay={160}>
          {lede}
        </Reveal>
      )}
    </header>
  );
}
