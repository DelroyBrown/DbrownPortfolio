/** Prefix a public asset path with the configured Vite base URL. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
