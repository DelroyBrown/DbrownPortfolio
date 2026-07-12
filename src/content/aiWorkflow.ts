import type { WorkflowPhase } from "../types/content";

export const aiIntroduction =
  "AI has changed how quickly complex software can be explored and produced. My role is not to accept generated code blindly. I define the product, direct implementation, inspect architecture, test behaviour, identify weak decisions and refine the result until it meets the intended standard.";

export const aiStatement =
  "AI increases my production speed. Software-development knowledge determines whether the result is acceptable.";

export const workflowPhases: WorkflowPhase[] = [
  {
    id: "define",
    index: "01",
    title: "Define the product",
    responsibility:
      "Decide what the software should do, how it should feel and what quality level it must reach before anything is written.",
    aiAssistance:
      "Explore early implementation paths, component structures and alternative technical approaches quickly.",
    judgement:
      "A generated plan can be plausible and still solve the wrong problem — the definition has to come from me.",
    risk: "Vague direction produces confident, well-formatted software that nobody asked for.",
    verification:
      "A short written brief: the experience, the constraints, the acceptance bar.",
  },
  {
    id: "decompose",
    index: "02",
    title: "Break it into systems",
    responsibility:
      "Split the idea into systems with clear boundaries — what owns state, what renders, what communicates.",
    aiAssistance:
      "Sketch candidate module layouts and surface patterns from comparable systems.",
    judgement:
      "Boundaries decide how painful every future change will be; they are a product decision, not a code style.",
    risk: "Accepting the first decomposition bakes accidental structure into everything that follows.",
    verification:
      "Can each system be described in one sentence? Can it be replaced without touching its neighbours?",
  },
  {
    id: "direct",
    index: "03",
    title: "Direct implementation",
    responsibility:
      "Give precise, scoped instructions — this system, this behaviour, these constraints, this standard.",
    aiAssistance:
      "Produce the implementation fast, across multiple files, with the boring parts done properly.",
    judgement:
      "Precision in equals quality out. Loose prompts create code that must be rewritten rather than reviewed.",
    risk: "Letting the tool decide scope quietly expands the change surface.",
    verification: "The diff matches the instruction — nothing more, nothing less.",
  },
  {
    id: "inspect",
    index: "04",
    title: "Inspect the changes",
    responsibility:
      "Read the implementation. Understand the data flow, the state ownership and what happens at the edges.",
    aiAssistance:
      "Explain unfamiliar sections, map which files a change touches, compare against alternatives.",
    judgement:
      "Code that reads well can still hide a wrong assumption. Inspection is where those surface.",
    risk: "Unread code becomes unowned code — and unowned code fails in production.",
    verification: "I can explain every changed file without looking at it again.",
  },
  {
    id: "test",
    index: "05",
    title: "Test the behaviour",
    responsibility:
      "Exercise the real thing — edge cases, broken input, slow devices, the paths a happy demo never takes.",
    aiAssistance:
      "Generate test suites, trace failures across the codebase, draft verification scripts.",
    judgement:
      "Generated tests confirm the code does what it does — deciding what it should do is still mine.",
    risk: "Green checkmarks on tests that assert the bug.",
    verification: "Behaviour observed directly, not inferred from a passing suite.",
  },
  {
    id: "critique",
    index: "06",
    title: "Find the weaknesses",
    responsibility:
      "Challenge the architecture and the experience: what is fragile, what is over-built, what feels wrong.",
    aiAssistance:
      "Stress ideas quickly — 'what breaks if this grows', 'show me three simpler shapes of this'.",
    judgement:
      "Technically working and actually good are different standards. Only one of them ships.",
    risk: "Working code creates pressure to stop looking.",
    verification: "A named list of weaknesses, each either fixed or consciously accepted.",
  },
  {
    id: "refine",
    index: "07",
    title: "Refine and repeat",
    responsibility:
      "Judge whether the product actually feels complete, reliable and coherent — then loop until it does.",
    aiAssistance:
      "Apply focused changes quickly across interconnected parts of the codebase.",
    judgement:
      "Knowing when to stop iterating is as important as knowing what to change.",
    risk: "Endless polish on one corner while the product stays unfinished.",
    verification: "The acceptance bar from phase one, checked honestly.",
  },
  {
    id: "ship",
    index: "08",
    title: "Ship and document",
    responsibility:
      "Deploy it, write down how it works, and make the next change easy for whoever makes it.",
    aiAssistance: "Draft documentation, deployment scripts and release notes.",
    judgement:
      "Documentation is a claim about the system — it has to be checked like code.",
    risk: "A shipped product nobody can safely modify.",
    verification: "A stranger could run, deploy and extend it from the README alone.",
  },
];
