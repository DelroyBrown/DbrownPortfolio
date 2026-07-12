import { useEffect, useRef } from "react";
import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { Reveal } from "../../components/common/Reveal";
import { aiIntroduction, aiStatement, workflowPhases } from "../../content/aiWorkflow";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { gsap } from "../../utils/motion";
import { WorkflowNode } from "./WorkflowNode";
import "./aiDevelopment.css";

/**
 * The workflow renders as a branching spine: a centre line that draws
 * itself as the reader scrolls, with each phase docking onto it left
 * and right. Reduced motion shows the finished structure immediately.
 */
export function AiDevelopment() {
  const spineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const spine = spineRef.current;
    const list = listRef.current;
    if (!spine || !list) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (reduced || typeof IntersectionObserver === "undefined") {
      list
        .querySelectorAll(".workflow-node")
        .forEach((el) => el.classList.add("is-active"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    list.querySelectorAll(".workflow-node").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section className="section" id="ai-development" aria-labelledby="ai-title">
      <div className="container">
        <SectionIntroduction
          index="02"
          eyebrow="AI-Assisted Development"
          title={<span id="ai-title">Directed, inspected, verified.</span>}
          lede={aiIntroduction}
          accent="var(--coral)"
        />

        <div className="workflow">
          <div className="workflow__spine" aria-hidden="true">
            <div className="workflow__spine-line" ref={spineRef} />
          </div>
          <ol className="workflow__list" ref={listRef} role="list">
            {workflowPhases.map((phase, i) => (
              <WorkflowNode key={phase.id} phase={phase} side={i % 2 ? "right" : "left"} />
            ))}
          </ol>
        </div>

        <Reveal as="blockquote" className="workflow__statement">
          <p>{aiStatement}</p>
        </Reveal>
      </div>
    </section>
  );
}
