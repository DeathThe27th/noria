export function safeHttpsUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:") return null;
    return { url: parsed.toString(), host: parsed.hostname };
  } catch {
    return null;
  }
}
