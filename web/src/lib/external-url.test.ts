import { describe, expect, it } from "vitest";
import { safeHttpsUrl } from "./external-url";

describe("safeHttpsUrl", () => {
  it("accepts HTTPS and returns the normalized URL and host", () => {
    expect(safeHttpsUrl("https://agent.example/path")).toEqual({ url: "https://agent.example/path", host: "agent.example" });
  });

  it("rejects insecure or executable schemes", () => {
    expect(safeHttpsUrl("http://agent.example")).toBeNull();
    expect(safeHttpsUrl("javascript:alert(1)")).toBeNull();
    expect(safeHttpsUrl("not-a-url")).toBeNull();
  });
});
