import { ContactPanel } from "../features/contact/ContactPanel";
import { usePageMeta } from "../hooks/usePageMeta";
import { profile } from "../content/profile";
import "./pages.css";

export default function ContactPage() {
  usePageMeta({
    title: `Contact — ${profile.name}`,
    description: "Get in touch with Delroy J. Brown about roles, products or strange ideas.",
    path: "/contact",
  });

  return (
    <div className="page">
      <ContactPanel />
    </div>
  );
}
