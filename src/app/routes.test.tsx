import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ReducedMotionProvider } from "../hooks/useReducedMotion";
import { routes } from "./router";

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(
    <ReducedMotionProvider>
      <RouterProvider router={router} />
    </ReducedMotionProvider>,
  );
}

describe("routes", () => {
  it("renders the homepage with hero, name and availability", async () => {
    renderRoute("/");
    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Delroy J\./);
    expect(heading).toHaveTextContent(/Brown/);
    expect(screen.getByText(/available now/i)).toBeInTheDocument();
  });

  it("renders the homepage sections in recruiter order", async () => {
    renderRoute("/");
    await screen.findByRole("heading", { level: 1 });
    // facts first (experience, skills), the AI differentiator, then the work
    const expectedOrder = [
      "experience",
      "skills",
      "ai-development",
      "work",
      "experiments",
      "code",
      "education",
      "approach",
      "about",
      "contact",
    ];
    const sections = expectedOrder.map((id) => {
      const el = document.getElementById(id);
      expect(el, `section #${id}`).toBeInTheDocument();
      return el!;
    });
    for (let i = 1; i < sections.length; i++) {
      const before = sections[i - 1].compareDocumentPosition(sections[i]);
      expect(
        before & Node.DOCUMENT_POSITION_FOLLOWING,
        `#${expectedOrder[i]} should come after #${expectedOrder[i - 1]}`,
      ).toBeTruthy();
    }
  });

  it("renders the work index", async () => {
    renderRoute("/work");
    expect(
      await screen.findByRole("heading", { name: /software shaped around real problems/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("CareCompass")).toBeInTheDocument();
  });

  it("renders the CareCompass case study", async () => {
    renderRoute("/work/care-compass");
    expect(await screen.findByRole("heading", { level: 1, name: "CareCompass" })).toBeInTheDocument();
    expect(screen.getByText(/in active development/i)).toBeInTheDocument();
  });

  it("renders the Pendulum case study with correct external links", async () => {
    renderRoute("/experiments/pendulum");
    expect(await screen.findByRole("heading", { level: 1, name: "Pendulum" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /play live/i })).toHaveAttribute(
      "href",
      "https://delroybrown.github.io/pendulum/",
    );
    expect(screen.getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      "https://github.com/DelroyBrown/pendulum",
    );
  });

  it("renders the Invader Storm case study with correct external links", async () => {
    renderRoute("/experiments/invader-storm");
    expect(
      await screen.findByRole("heading", { level: 1, name: "Invader Storm" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /play live/i })).toHaveAttribute(
      "href",
      "https://delroybrown.github.io/Invader/",
    );
    expect(screen.getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      "https://github.com/DelroyBrown/Invader",
    );
  });

  it("renders the Thread case study with its landscape guidance", async () => {
    renderRoute("/experiments/thread");
    expect(await screen.findByRole("heading", { level: 1, name: "Thread" })).toBeInTheDocument();
    expect(screen.getAllByText(/landscape/i).length).toBeGreaterThan(0);
  });

  it("renders a designed 404 for unknown paths", async () => {
    renderRoute("/this-rope-leads-nowhere");
    expect(await screen.findByText(/404/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to the index/i })).toBeInTheDocument();
  });

  it("static routes render approach, about and contact", async () => {
    renderRoute("/approach");
    expect(await screen.findByRole("heading", { name: /how i build/i })).toBeInTheDocument();

    renderRoute("/about");
    expect(await screen.findAllByRole("heading", { name: /structure meets direction/i })).toBeTruthy();

    renderRoute("/contact");
    expect(
      await screen.findAllByRole("heading", { name: /worth remembering/i }),
    ).toBeTruthy();
  });
});
