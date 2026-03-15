import { validateContentRelations } from "@/lib/contentValidation";

describe("content relation validation", () => {
  it("has no unresolved relation references", () => {
    expect(validateContentRelations()).toEqual([]);
  });
});
