import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { SiteLayout } from "../layouts/SiteLayout";
import { HomePage } from "../pages/HomePage";

/* Case studies and secondary routes are split out of the main bundle. */
const WorkPage = lazy(() => import("../pages/WorkPage"));
const WorkCaseStudyPage = lazy(() => import("../pages/WorkCaseStudyPage"));
const ExperimentsPage = lazy(() => import("../pages/ExperimentsPage"));
const ExperimentCaseStudyPage = lazy(() => import("../pages/ExperimentCaseStudyPage"));
const ApproachPage = lazy(() => import("../pages/ApproachPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function suspended(node: ReactNode): ReactNode {
  return (
    <Suspense
      fallback={
        <div className="container route-loading" role="status" aria-live="polite">
          <span className="section-label">Loading…</span>
        </div>
      }
    >
      {node}
    </Suspense>
  );
}

/** Route table — exported separately so tests can mount it in memory. */
export const routes = [
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "work", element: suspended(<WorkPage />) },
      { path: "work/:slug", element: suspended(<WorkCaseStudyPage />) },
      { path: "experiments", element: suspended(<ExperimentsPage />) },
      { path: "experiments/:slug", element: suspended(<ExperimentCaseStudyPage />) },
      { path: "approach", element: suspended(<ApproachPage />) },
      { path: "about", element: suspended(<AboutPage />) },
      { path: "contact", element: suspended(<ContactPage />) },
      { path: "*", element: suspended(<NotFoundPage />) },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
});
