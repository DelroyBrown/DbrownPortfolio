import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileNavigation } from "./MobileNavigation";
import { NAV_ITEMS } from "./AppNavigation";

function renderMenu(overrides?: { onClose?: () => void; onNavigate?: () => void }) {
  const onClose = overrides?.onClose ?? vi.fn();
  const onNavigate = overrides?.onNavigate ?? vi.fn();
  render(<MobileNavigation items={NAV_ITEMS} onClose={onClose} onNavigate={onNavigate} />);
  return { onClose, onNavigate };
}

describe("MobileNavigation", () => {
  it("renders as a modal dialog with every primary destination", () => {
    renderMenu();
    expect(screen.getByRole("dialog", { name: /site menu/i })).toBeInTheDocument();
    for (const item of NAV_ITEMS) {
      expect(screen.getByRole("button", { name: new RegExp(item.label, "i") })).toBeInTheDocument();
    }
  });

  it("moves focus into the menu on open", () => {
    renderMenu();
    expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
  });

  it("closes on Escape and restores body scroll", async () => {
    const user = userEvent.setup();
    const { onClose } = renderMenu();
    expect(document.body.style.overflow).toBe("hidden");
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("navigates when a destination is chosen", async () => {
    const user = userEvent.setup();
    const { onNavigate } = renderMenu();
    await user.click(screen.getByRole("button", { name: /work/i }));
    expect(onNavigate).toHaveBeenCalled();
  });
});
