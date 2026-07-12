import { useEffect, useRef, type CSSProperties } from "react";
import { X } from "lucide-react";
import { profile } from "../../content/profile";
import type { NavItem } from "./AppNavigation";

interface MobileNavigationProps {
  items: NavItem[];
  onNavigate: (item: NavItem) => void;
  onClose: () => void;
}

/**
 * Full-screen mobile menu. Focus moves in on open, is trapped while
 * open, Escape closes, and focus returns to the trigger on close
 * (the browser restores it because the trigger re-receives focus).
 */
export function MobileNavigation({ items, onNavigate, onClose }: MobileNavigationProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const root = rootRef.current;
    root?.querySelector<HTMLElement>("button, a")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("button, a[href]"),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      ref={rootRef}
    >
      <button type="button" className="mobile-menu__close" onClick={onClose}>
        <X size={15} aria-hidden="true" />
        Close
      </button>

      <nav aria-label="Primary">
        <ul className="mobile-menu__list">
          {items.map((item, i) => (
            <li key={item.label} style={{ "--i": i } as CSSProperties}>
              <button
                type="button"
                className="mobile-menu__link"
                onClick={() => onNavigate(item)}
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mobile-menu__meta">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
        <span>{profile.location}</span>
      </div>
    </div>
  );
}
