import { describe, expect, it } from "vitest";
import { games, projects } from "./projects";
import { codeExcerpts, excerptById } from "./codeExcerpts";
import { workflowPhases } from "./aiWorkflow";
import { skillGroups } from "./skills";
import { principles } from "./principles";
import { pendulumDiagram, threadDiagram } from "./diagrams";
import { profile } from "./profile";

describe("project content integrity", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every project has the required narrative fields", () => {
    for (const p of projects) {
      expect(p.title).toBeTruthy();
      expect(p.shortDescription).toBeTruthy();
      expect(p.fullDescription.length).toBeGreaterThan(40);
      expect(p.technologies.length).toBeGreaterThan(0);
      expect(p.keyFeatures.length).toBeGreaterThan(0);
      expect(p.imageAlt).toBeTruthy();
    }
  });

  it("games point at the real GitHub Pages builds and repos", () => {
    for (const g of games) {
      expect(g.embedUrl).toMatch(
        /^https:\/\/delroybrown\.github\.io\/(pendulum|thread|Invader)\/$/,
      );
      expect(g.repositoryUrl).toMatch(
        /^https:\/\/github\.com\/DelroyBrown\/(pendulum|thread|Invader)$/,
      );
      expect(g.controlHint).toBeTruthy();
      expect(g.aiAssistanceNote).toBeTruthy();
      expect(g.directed.length).toBeGreaterThan(2);
      expect(g.judgement.length).toBeGreaterThan(2);
      expect(g.accelerated.length).toBeGreaterThan(2);
    }
  });

  it("every excerpt id referenced by a game exists", () => {
    for (const g of games) {
      for (const id of g.codeExcerptIds ?? []) {
        expect(excerptById(id), `missing excerpt ${id}`).toBeDefined();
      }
    }
  });
});

describe("code excerpts", () => {
  it("contain real code linked to exact lines on GitHub", () => {
    expect(codeExcerpts.length).toBeGreaterThanOrEqual(9);
    for (const e of codeExcerpts) {
      expect(e.code.split("\n").length).toBe(e.endLine - e.startLine + 1);
      // "i" flag: the Invader repo is capitalised, its excerpt key is not
      expect(e.repositoryUrl).toMatch(
        new RegExp(
          `^https://github\\.com/DelroyBrown/${e.project}/blob/.+#L${e.startLine}-L${e.endLine}$`,
          "i",
        ),
      );
      expect(e.story.question).toBeTruthy();
      expect(e.story.decision).toBeTruthy();
      expect(e.story.tradeOff).toBeTruthy();
    }
  });

  it("highlighted lines fall inside their excerpt range", () => {
    for (const e of codeExcerpts) {
      for (const line of e.highlightedLines ?? []) {
        expect(line).toBeGreaterThanOrEqual(e.startLine);
        expect(line).toBeLessThanOrEqual(e.endLine);
      }
    }
  });
});

describe("supporting content", () => {
  it("workflow has eight phases with full detail", () => {
    expect(workflowPhases).toHaveLength(8);
    for (const phase of workflowPhases) {
      expect(phase.responsibility).toBeTruthy();
      expect(phase.aiAssistance).toBeTruthy();
      expect(phase.judgement).toBeTruthy();
      expect(phase.risk).toBeTruthy();
      expect(phase.verification).toBeTruthy();
    }
  });

  it("skills carry no fake percentages", () => {
    for (const group of skillGroups) {
      for (const skill of group.skills) {
        expect(skill).not.toMatch(/\d+\s*%/);
      }
    }
  });

  it("has six principles and a valid profile", () => {
    expect(principles).toHaveLength(6);
    expect(profile.github).toBe("https://github.com/DelroyBrown");
    expect(profile.initials).toBe("DJB");
  });

  it("diagram edges reference existing nodes", () => {
    for (const diagram of [pendulumDiagram, threadDiagram]) {
      const ids = new Set(diagram.nodes.map((n) => n.id));
      for (const edge of diagram.edges) {
        expect(ids.has(edge.from), `${diagram.id}: ${edge.from}`).toBe(true);
        expect(ids.has(edge.to), `${diagram.id}: ${edge.to}`).toBe(true);
      }
    }
  });
});
