import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CodeStory } from "./CodeStory";
import { excerptById } from "../../content/codeExcerpts";

const excerpt = excerptById("pendulum-rope")!;

describe("CodeStory", () => {
  it("renders real code with line numbers from the source file", () => {
    render(<CodeStory excerpt={excerpt} />);
    expect(screen.getByText(excerpt.sourcePath)).toBeInTheDocument();
    // first line number matches the excerpt's real start line
    expect(screen.getByText(String(excerpt.startLine))).toBeInTheDocument();
  });

  it("links to the exact lines in the original repository", () => {
    render(<CodeStory excerpt={excerpt} />);
    expect(screen.getByRole("link", { name: /source/i })).toHaveAttribute(
      "href",
      excerpt.repositoryUrl,
    );
  });

  it("switches between story tabs", async () => {
    const user = userEvent.setup();
    render(<CodeStory excerpt={excerpt} />);

    await user.click(screen.getByRole("tab", { name: "Decision" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent(excerpt.story.decision);

    await user.click(screen.getByRole("tab", { name: "Trade-off" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/physics engine/i);
  });

  it("supports arrow-key navigation across tabs", async () => {
    const user = userEvent.setup();
    render(<CodeStory excerpt={excerpt} />);
    const codeTab = screen.getByRole("tab", { name: "Code" });
    codeTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Behaviour" })).toHaveFocus();
  });

  it("copies the excerpt to the clipboard", async () => {
    const user = userEvent.setup(); // installs a working clipboard stub
    render(<CodeStory excerpt={excerpt} />);

    await user.click(screen.getByRole("button", { name: /copy/i }));
    expect(await screen.findByText("Copied")).toBeInTheDocument();
    await expect(window.navigator.clipboard.readText()).resolves.toBe(excerpt.code);
  });
});
