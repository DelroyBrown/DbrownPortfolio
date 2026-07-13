import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { Reveal } from "../../components/common/Reveal";
import { skillGroups } from "../../content/skills";
import "./skills.css";

/**
 * Skills as a layered technical index — grouped, annotated, no fake
 * percentages. Hovering a group brings it forward; without a pointer or
 * without animation it reads as a plain, accessible list.
 */
export function TechnologyMap() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionIntroduction
          index="02"
          eyebrow="Skills & Technologies"
          title={<span id="skills-title">A working ecosystem.</span>}
          lede="Grouped by how they are actually used together — no progress bars, no percentages."
        />

        <div className="tech-map">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.id}
              as="article"
              className="tech-group"
              delay={i * 70}
            >
              <div
                className="tech-group__inner"
                style={{ ["--accent" as string]: group.accent }}
              >
                <header className="tech-group__head">
                  <h3 className="tech-group__title">{group.title}</h3>
                  <p className="tech-group__note">{group.note}</p>
                </header>
                <ul className="tech-group__list" role="list">
                  {group.skills.map((skill) => (
                    <li key={skill} className="tag">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
