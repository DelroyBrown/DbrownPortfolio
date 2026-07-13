import { useState, type FormEvent } from "react";
import { ArrowUpRight, FileText, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../../components/common/BrandIcons";
import { SectionIntroduction } from "../../components/common/SectionIntroduction";
import { Reveal } from "../../components/common/Reveal";
import { profile } from "../../content/profile";
import "./contact.css";

/**
 * Closing section. The form is honest: no backend is configured, so
 * submitting explains that and points to the email link instead of
 * pretending a message was sent.
 */
export function ContactPanel() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionIntroduction
          index="10"
          eyebrow="Contact"
          title={
            <span id="contact-title">Let's build something worth remembering.</span>
          }
          lede="Have a problem, product or strange idea? I'd like to hear about it."
          accent="var(--gold)"
        />

        <div className="contact">
          <Reveal className="contact__channels">
            {profile.email && (
              <a
                className="contact__channel"
                href={`mailto:${profile.email}`}
                data-cursor="Write"
              >
                <Mail size={18} aria-hidden="true" />
                <span>
                  <strong>Email</strong>
                  {profile.email}
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            {profile.phone && (
              <a
                className="contact__channel"
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                data-cursor="Call"
              >
                <Phone size={18} aria-hidden="true" />
                <span>
                  <strong>Phone</strong>
                  {profile.phone}
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            <a
              className="contact__channel"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
            >
              <GithubIcon size={18} />
              <span>
                <strong>GitHub</strong>
                github.com/DelroyBrown
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {profile.linkedin ? (
              <a
                className="contact__channel"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon size={18} />
                <span>
                  <strong>LinkedIn</strong>
                  Profile
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <p className="contact__channel contact__channel--pending">
                <LinkedinIcon size={18} />
                <span>
                  <strong>LinkedIn</strong>
                  Link coming soon — set it in src/content/profile.ts
                </span>
              </p>
            )}
            {profile.cvUrl ? (
              <a className="contact__channel" href={profile.cvUrl}>
                <FileText size={18} aria-hidden="true" />
                <span>
                  <strong>Curriculum Vitae</strong>
                  Download PDF
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              profile.email && (
                <a
                  className="contact__channel"
                  href={`mailto:${profile.email}?subject=CV%20request`}
                >
                  <FileText size={18} aria-hidden="true" />
                  <span>
                    <strong>Curriculum Vitae</strong>
                    Available on request
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )
            )}
          </Reveal>

          <Reveal className="contact__form-wrap" delay={140}>
            {submitted ? (
              <div className="contact__notice" role="status">
                <p>
                  Contact form integration has not been configured yet — this
                  site never pretends to send a message it can't.
                </p>
                {profile.email ? (
                  <a className="btn" href={`mailto:${profile.email}`}>
                    Use the email link instead
                    <Mail size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
                    Reach me on GitHub
                  </a>
                )}
              </div>
            ) : (
              <form className="contact__form" onSubmit={onSubmit}>
                <label>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label>
                  <span>What are you building?</span>
                  <textarea name="message" rows={4} required />
                </label>
                <button type="submit" className="btn btn--solid">
                  Send
                </button>
              </form>
            )}
          </Reveal>
        </div>

        <Reveal className="contact__signature" delay={200}>
          <svg
            viewBox="0 0 260 90"
            role="img"
            aria-label="DJB — Delroy J. Brown"
          >
            {/* D */}
            <path className="sig" d="M28,18 L28,72 M28,18 C58,18 62,68 28,72" />
            {/* J */}
            <path className="sig" d="M120,18 L120,60 C120,76 96,78 92,64" />
            {/* B */}
            <path
              className="sig"
              d="M176,18 L176,72 M176,18 C204,16 206,42 176,44 C210,44 210,74 176,72"
            />
            <path className="sig sig--underline" d="M20,84 C90,78 190,90 244,80" />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
