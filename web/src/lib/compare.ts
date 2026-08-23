export function parseCompareIds(value: string | undefined) {
  return Array.from(new Set((value ?? "").split(",").map((id) => id.trim()).filter((id) => /^\d+$/.test(id)))).slice(0, 3);
}
