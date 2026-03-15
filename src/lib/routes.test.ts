import { comparisonPath, themePath, thinkerPath } from "@/lib/routes";

describe("route helpers", () => {
  it("builds all route kinds", () => {
    expect(thinkerPath("kant")).toBe("/thinkers/kant");
    expect(themePath("knowledge")).toBe("/themes/knowledge");
    expect(comparisonPath("descartes", "hume")).toBe("/compare/descartes/hume");
  });
});
