import { assertContentRelations, formatContentIssues, validateContentWarnings } from "@/lib/contentValidation";

test("production content is valid", () => {
  const warnings = validateContentWarnings();
  if (warnings.length) console.warn(formatContentIssues("Content validation warnings:", warnings));
  expect(assertContentRelations).not.toThrow();
});
