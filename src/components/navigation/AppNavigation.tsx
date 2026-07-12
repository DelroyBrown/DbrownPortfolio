import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { GithubIcon } from "../common/BrandIcons";
import { profile } from "../../content/profile";
import { useSectionSpy } from "../../hooks/useSectionSpy";
import { scrollToTarget } from "../../utils/smoothScroll";
import { MobileNavigation } from "./MobileNavigation";
import "./navigation.css";

export interface NavItem {
  label: string;
  /** section id on the homepage */
  section: string | null;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Index", section: null },
  { label: "Work", section: "work" },
  { label: "AI Development", section: "ai-development" },
  { label: "Code", section: "code" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

export function AppNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const spyIds = useMemo(
    () =>
      location.pathname === "/"
        ? NAV_ITEMS.flatMap((item) => (item.section ? [item.section] : []))
        : [],
    [location.pathname],
  );
  const activeSection = useSectionSpy(spyIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = useCallback(
    (item: NavItem) => {
      setMenuOpen(false);
      if (location.pathname === "/") {
        scrollToTarget(item.section ?? undefined);
      } else {
        navigate(item.section ? `/#${item.section}` : "/");
      }
    },
    [location.pathname, navigate],
  );

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container nav__inner">
          <Link to="/" className="nav__mark" aria-label="Delroy J. Brown — home">
            <span className="nav__mark-dot" aria-hidden="true" />
            {profile.initials}
          </Link>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className={`nav__link ${
                      activeSection && activeSection === item.section ? "is-active" : ""
                    }`}
                    onClick={() => goTo(item)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <a
              className="nav__icon-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Delroy J. Brown on GitHub (opens in a new tab)"
            >
              <GithubIcon size={18} />
            </a>
            <button
              type="button"
              className="nav__menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <Menu size={15} aria-hidden="true" />
              Menu
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <MobileNavigation
          items={NAV_ITEMS}
          onNavigate={goTo}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
