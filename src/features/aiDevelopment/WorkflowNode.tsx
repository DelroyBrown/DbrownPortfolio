import type { WorkflowPhase } from "../../types/content";

interface WorkflowNodeProps {
  phase: WorkflowPhase;
  side: "left" | "right";
}

export function WorkflowNode({ phase, side }: WorkflowNodeProps) {
  return (
    <li className={`workflow-node workflow-node--${side}`}>
      <span className="workflow-node__dot" aria-hidden="true" />
      <span className="workflow-node__branch" aria-hidden="true" />
      <div className="workflow-node__panel">
        <p className="workflow-node__index">{phase.index}</p>
        <h3 className="workflow-node__title">{phase.title}</h3>

        <div className="workflow-node__grid">
          <div>
            <h4 className="workflow-node__label">My responsibility</h4>
            <p>{phase.responsibility}</p>
          </div>
          <div>
            <h4 className="workflow-node__label workflow-node__label--ai">
              AI assistance
            </h4>
            <p>{phase.aiAssistance}</p>
          </div>
        </div>

        <details className="workflow-node__details">
          <summary>Judgement · Risk · Verification</summary>
          <dl>
            <dt>Where judgement is needed</dt>
            <dd>{phase.judgement}</dd>
            <dt>Typical risk</dt>
            <dd>{phase.risk}</dd>
            <dt>How it's verified</dt>
            <dd>{phase.verification}</dd>
          </dl>
        </details>
      </div>
    </li>
  );
}
