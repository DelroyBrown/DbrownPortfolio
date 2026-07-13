import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { Reveal } from "../../components/common/Reveal";
import { experienceIntro, experienceRoles } from "../../content/experience";
import "./experience.css";

/** Professional history — an editorial timeline drawn from the CV. */
export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionIntroduction
          index="07"
          eyebrow="Experience"
          title={<span id="experience-title">Where the judgement comes from.</span>}
          lede={experienceIntro}
        />

        <ol className="xp" role="list">
          {experienceRoles.map((role, i) => (
            <Reveal as="li" key={role.id} className="xp__role" delay={i * 60}>
              <div className="xp__rail" aria-hidden="true">
                <span className="xp__dot" />
              </div>
              <header className="xp__head">
                <p className="xp__period">{role.period}</p>
                <h3 className="xp__title">
                  {role.role}
                  <span className="xp__company"> — {role.company}</span>
                </h3>
                <p className="xp__summary">{role.summary}</p>
              </header>
              <ul className="xp__points">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="xp__tech">
                {role.technologies.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
