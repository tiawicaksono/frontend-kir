export function formatMenuName(code: string) {
  return code
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
}
