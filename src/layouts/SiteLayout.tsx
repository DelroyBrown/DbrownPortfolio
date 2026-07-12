import { Outlet } from "react-router-dom";
import { AppNavigation } from "../components/navigation/AppNavigation";
import { CustomCursor } from "../components/motion/CustomCursor";
import { IntroLoader } from "../components/motion/IntroLoader";
import { PageTransition } from "../components/motion/PageTransition";
import { useLenis } from "../hooks/useLenis";
import { SiteFooter } from "./SiteFooter";
import "./layout.css";

export function SiteLayout() {
  useLenis();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <IntroLoader />
      <AppNavigation />
      <PageTransition>
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <SiteFooter />
      </PageTransition>
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
    </>
  );
}
