import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { Reveal } from "../../components/common/Reveal";
import { personalDetails } from "../../content/experience";
import "./about.css";

/** About — editorial fragments, not a wall of text. */
export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionIntroduction
          index="09"
          eyebrow="About"
          title={<span id="about-title">Structure meets direction.</span>}
        />

        <div className="about">
          <Reveal as="p" className="about__fragment about__fragment--a prose">
            I am a full-stack software developer with four-plus years of
            professional experience — a healthcare platform built on Django and
            React, manufacturing dashboards and reporting automation, and more
            than twenty freelance sites shipped for SMEs, non-profits and
            startups. The connecting thread is AWS cloud infrastructure and
            backends that can be trusted.
          </Reveal>

          <Reveal as="blockquote" className="about__pull" delay={120}>
            I am especially interested in the point where technical structure
            and creative direction meet.
          </Reveal>

          <Reveal as="p" className="about__fragment about__fragment--b prose" delay={80}>
            Software that works reliably — but also feels deliberate, clear and
            memorable. That standard applies whether the product is a
            care-records platform or a cathedral you swing through.
          </Reveal>

          <Reveal as="p" className="about__fragment about__fragment--c prose" delay={160}>
            My current development workflow uses AI heavily as a production
            tool. That allows me to explore and implement ambitious ideas
            quickly, while my role remains defining the outcome, reviewing the
            implementation and deciding whether the software is genuinely good
            enough.
          </Reveal>

          <Reveal className="about__details" delay={200}>
            <h3 className="about__details-title">The practical details</h3>
            <dl className="about__details-grid">
              {personalDetails.map((detail) => (
                <div key={detail.label} className="about__detail">
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
