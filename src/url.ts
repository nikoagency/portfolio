// handles base url
export function url(path: string) {
  const base = import.meta.env.BASE_URL ?? '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  return path.startsWith('/') ? `${b}${path}` : `${b}/${path}`;
}
