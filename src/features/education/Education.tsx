import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { Reveal } from "../../components/common/Reveal";
import {
  certifications,
  continuousLearning,
  formalEducation,
} from "../../content/experience";
import "./education.css";

/** Education & certification — the schooling behind the work. */
export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <div className="container">
        <SectionIntroduction
          index="08"
          eyebrow="Education & Certification"
          title={<span id="education-title">Trained formally, learning constantly.</span>}
          accent="var(--gold)"
        />

        <div className="edu">
          <Reveal className="edu__diploma">
            <p className="edu__kicker">Formal education</p>
            <h3 className="edu__title">{formalEducation.title}</h3>
            <p className="edu__institution">{formalEducation.institution}</p>
            <p className="edu__period">{formalEducation.period}</p>
            {formalEducation.note && <p className="edu__note">{formalEducation.note}</p>}
          </Reveal>

          <Reveal className="edu__certs" delay={100}>
            <p className="edu__kicker">Certifications</p>
            <ul className="edu__cert-list" role="list">
              {certifications.map((cert) => (
                <li
                  key={cert.id}
                  className={`edu__cert ${cert.inProgress ? "edu__cert--live" : ""}`}
                >
                  <span className="edu__cert-title">
                    {cert.title}
                    {cert.inProgress && <span className="edu__badge">in progress</span>}
                  </span>
                  <span className="edu__cert-meta">
                    {cert.institution} · {cert.period}
                  </span>
                  {cert.note && <span className="edu__cert-note">{cert.note}</span>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="edu__learning" delay={180}>
            <p className="edu__kicker">Continuous learning</p>
            <ul className="edu__learning-list" role="list">
              {continuousLearning.map((topic) => (
                <li key={topic} className="tag">
                  {topic}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
