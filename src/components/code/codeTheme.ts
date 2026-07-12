import type { PrismTheme } from "prism-react-renderer";

/** Syntax theme tuned to the site palette — quiet, warm, low-contrast
 *  accents so code reads as part of the editorial page, not an IDE. */
export const codeTheme: PrismTheme = {
  plain: {
    color: "#dcd9d1",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#69707d", fontStyle: "italic" },
    },
    { types: ["punctuation"], style: { color: "#8a919d" } },
    { types: ["operator"], style: { color: "#a6adba" } },
    {
      types: ["keyword", "atrule", "boolean"],
      style: { color: "#8ea3e8" },
    },
    { types: ["string", "char", "inserted", "attr-value"], style: { color: "#c9a86a" } },
    { types: ["number", "constant", "symbol"], style: { color: "#d8b46e" } },
    { types: ["function", "deleted", "tag"], style: { color: "#e08d6d" } },
    { types: ["class-name", "maybe-class-name", "builtin"], style: { color: "#5fc8cf" } },
    { types: ["property", "attr-name", "variable", "parameter"], style: { color: "#dcd9d1" } },
    { types: ["regex", "important"], style: { color: "#e08d6d" } },
  ],
};
