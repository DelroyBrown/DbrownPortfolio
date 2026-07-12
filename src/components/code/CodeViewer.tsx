import { useCallback, useState } from "react";
import { Highlight } from "prism-react-renderer";
import { Check, Copy, ExternalLink } from "lucide-react";
import type { CodeExcerpt } from "../../types/content";
import { codeTheme } from "./codeTheme";
import "./code.css";

interface CodeViewerProps {
  excerpt: CodeExcerpt;
}

/**
 * Editorial code presentation: real line numbers from the source file,
 * highlighted focus lines, copy + open-on-GitHub. Horizontal scrolling
 * on small screens; no per-line animation.
 */
export function CodeViewer({ excerpt }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const highlighted = new Set(excerpt.highlightedLines ?? []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(excerpt.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable (permissions/http) — the source link remains */
    }
  }, [excerpt.code]);

  return (
    <figure className="code-viewer">
      <figcaption className="code-viewer__bar">
        <span className="code-viewer__path" title={excerpt.sourcePath}>
          {excerpt.sourcePath}
          <span className="code-viewer__lines">
            L{excerpt.startLine}–{excerpt.endLine}
          </span>
        </span>
        <span className="code-viewer__actions">
          <span className="code-viewer__lang">{excerpt.language}</span>
          <button
            type="button"
            className="code-viewer__action"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <Copy size={14} aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <a
            className="code-viewer__action"
            href={excerpt.repositoryUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Source
          </a>
        </span>
      </figcaption>

      <Highlight code={excerpt.code} language={excerpt.language} theme={codeTheme}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={`code-viewer__pre ${className}`} tabIndex={0}>
            <code>
              {tokens.map((line, i) => {
                const fileLine = excerpt.startLine + i;
                const lineProps = getLineProps({ line });
                return (
                  <span
                    key={i}
                    {...lineProps}
                    className={`code-viewer__line ${
                      highlighted.has(fileLine) ? "is-highlighted" : ""
                    }`}
                  >
                    <span className="code-viewer__ln" aria-hidden="true">
                      {fileLine}
                    </span>
                    <span className="code-viewer__content">
                      {line.map((token, k) => (
                        <span key={k} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </span>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </figure>
  );
}
