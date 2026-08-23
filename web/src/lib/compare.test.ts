import { describe, expect, it } from "vitest";
import { parseCompareIds } from "./compare";

describe("parseCompareIds", () => {
  it("keeps unique numeric BSC token IDs in order", () => {
    expect(parseCompareIds("293928,293927,293928")).toEqual(["293928", "293927"]);
  });

  it("rejects invalid values and caps the comparison at three", () => {
    expect(parseCompareIds("1,javascript:bad,2,3,4")).toEqual(["1", "2", "3"]);
  });

  it("returns an empty selection for missing input", () => {
    expect(parseCompareIds(undefined)).toEqual([]);
  });
});
