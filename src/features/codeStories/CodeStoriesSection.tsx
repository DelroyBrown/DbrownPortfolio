import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { Reveal } from "../../components/common/Reveal";
import { CodeStory } from "../../components/code/CodeStory";
import { excerptById } from "../../content/codeExcerpts";
import { pendulum, thread } from "../../content/projects";
import "./codeStories.css";

/**
 * Two engineering stories on the homepage — one per game — with the
 * full sets living on the case-study routes. Every excerpt is real code
 * linked to its exact lines on GitHub.
 */
export function CodeStoriesSection() {
  const ropeStory = excerptById("pendulum-rope");
  const tensionStory = excerptById("thread-tension");

  return (
    <section className="section" id="code" aria-labelledby="code-title">
      <div className="container">
        <SectionIntroduction
          index="04"
          eyebrow="Code & Engineering Stories"
          title={<span id="code-title">The code is part of the story.</span>}
          lede="Real excerpts from the shipped games — what question each one answers, what was decided, and what it cost. Every excerpt links to its exact lines in the repository."
        />

        <div className="code-stories">
          {ropeStory && (
            <Reveal className="code-stories__item">
              <CodeStory excerpt={ropeStory} accent={pendulum.accent} />
              <Link
                className="code-stories__more"
                to="/experiments/pendulum"
                data-cursor="Read"
              >
                More Pendulum engineering
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Reveal>
          )}
          {tensionStory && (
            <Reveal className="code-stories__item" delay={120}>
              <CodeStory excerpt={tensionStory} accent={thread.accent} />
              <Link
                className="code-stories__more"
                to="/experiments/thread"
                data-cursor="Read"
              >
                More Thread engineering
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
