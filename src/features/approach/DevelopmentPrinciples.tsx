import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { Reveal } from "../../components/common/Reveal";
import { principles } from "../../content/principles";
import "./approach.css";

/** "How I Build" — a quiet technical manifesto. */
export function DevelopmentPrinciples() {
  return (
    <section className="section" id="approach" aria-labelledby="approach-title">
      <div className="container approach">
        <div className="approach__aside">
          <div className="approach__sticky">
            <SectionIntroduction
              index="05"
              eyebrow="Development Approach"
              title={<span id="approach-title">How I build.</span>}
              lede="Principles that survive contact with real projects — not personality claims."
            />
          </div>
        </div>

        <ol className="approach__list" role="list">
          {principles.map((principle, i) => (
            <Reveal as="li" key={principle.id} className="principle" delay={i * 60}>
              <span className="principle__index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="principle__title">{principle.title}</h3>
                <p className="principle__body">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
