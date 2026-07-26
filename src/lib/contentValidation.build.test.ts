import { assertContentRelations } from "@/lib/contentValidation";

test("production content is valid", () => {
  expect(assertContentRelations).not.toThrow();
});
