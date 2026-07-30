export function parseCityHash(
  hash: string,
): { city: string; area: string; category: string } | null {
  const path = hash.replace(/^#?\/?/, "");
  const parts = path.split("/");

  if (parts[0] !== "city" || parts.length < 3) return null;

  const unslug = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    city: unslug(parts[1] || ""),
    area: unslug(parts[2] || ""),
    category: unslug(parts[3] || ""),
  };
}
