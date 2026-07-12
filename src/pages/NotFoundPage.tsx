import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import "./pages.css";

export default function NotFoundPage() {
  usePageMeta({
    title: `Page not found — ${profile.name}`,
    path: "/404",
  });

  return (
    <div className="container notfound">
      <p className="notfound__code">404 — no anchor here</p>
      <h1 className="notfound__title">This rope leads nowhere.</h1>
      <p className="prose">
        The page you were swinging towards doesn't exist — it may have moved,
        or the link was mistyped.
      </p>
      <Link className="btn" to="/">
        <ArrowLeft size={15} aria-hidden="true" />
        Back to the index
      </Link>
    </div>
  );
}
