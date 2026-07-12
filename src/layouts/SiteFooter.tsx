import { Link } from "react-router-dom";
import { profile } from "../content/profile";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__mark" aria-hidden="true">
          {profile.initials}
        </p>
        <nav aria-label="Footer">
          <ul className="footer__links">
            <li>
              <Link to="/work">Work</Link>
            </li>
            <li>
              <Link to="/experiments">Experiments</Link>
            </li>
            <li>
              <Link to="/approach">Approach</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
        <p className="footer__note">
          © {new Date().getFullYear()} {profile.name}. Designed and built by hand
          and by directed machine — React, TypeScript, GSAP.
        </p>
      </div>
    </footer>
  );
}
