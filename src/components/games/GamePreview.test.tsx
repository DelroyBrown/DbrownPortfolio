import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GamePreview } from "./GamePreview";
import { PlayableGameFrame } from "./PlayableGameFrame";
import { pendulum } from "../../content/projects";

describe("GamePreview — staged playable embed", () => {
  it("shows the local screenshot and no iframe before interaction", () => {
    render(<GamePreview game={pendulum} />);
    expect(screen.getByAltText(pendulum.imageAlt)).toBeInTheDocument();
    expect(screen.queryByTitle("Play Pendulum")).not.toBeInTheDocument();
  });

  it("creates the iframe only after play is pressed, pointing at the live build", async () => {
    const user = userEvent.setup();
    render(<GamePreview game={pendulum} />);
    await user.click(screen.getByRole("button", { name: /play inside the portfolio/i }));

    const iframe = screen.getByTitle("Play Pendulum");
    expect(iframe).toHaveAttribute("src", "https://delroybrown.github.io/pendulum/");
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveAttribute("allow", expect.stringContaining("fullscreen"));
  });

  it("tears the iframe down on close and restores focus to the play control", async () => {
    const user = userEvent.setup();
    render(<GamePreview game={pendulum} />);
    await user.click(screen.getByRole("button", { name: /play inside the portfolio/i }));
    expect(screen.getByTitle("Play Pendulum")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close pendulum embed/i }));
    expect(screen.queryByTitle("Play Pendulum")).not.toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /play inside the portfolio/i })).toHaveFocus(),
    );
  });

  it("falls back to an external link when the embed never loads", async () => {
    // jsdom never fires iframe load events, which conveniently simulates
    // a blocked embed — with a short timeout the failover shows quickly.
    render(<PlayableGameFrame game={pendulum} onClose={vi.fn()} loadTimeoutMs={40} />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/prevented the embedded version/i);
    const fallback = screen.getByRole("link", { name: /open the full game in a new tab/i });
    expect(fallback).toHaveAttribute("href", "https://delroybrown.github.io/pendulum/");
    expect(screen.queryByTitle("Play Pendulum")).not.toBeInTheDocument();
  });

  it("shows a designed fallback when the screenshot is missing", async () => {
    render(<GamePreview game={{ ...pendulum, image: "missing.webp" }} />);
    fireEvent.error(screen.getByAltText(pendulum.imageAlt));
    expect(await screen.findByText(pendulum.subtitle)).toBeInTheDocument();
  });
});
