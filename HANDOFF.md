# Noema source-model handoff

## Source model design decisions

- Bibliography records live once in `src/content/sources.ts` and are referenced by stable IDs from structured thinker quotations and optional comparison `sourceIds`.
- A quotation always states `isParaphrase`. Direct quotations require a valid source; summaries may remain unsourced during migration. Translation provenance and optional original-language snippets are separate fields.
- Stable work-level chapter, book, section, or traditional text locators are preferred to edition-specific page numbers. The UI separates direct quotation from summary and primary from secondary material.

## Migrated scope

- Thinkers: Kant, Hobbes, Locke, Rousseau, Mencius, Xunzi, Hannah Arendt, and Michel Foucault.
- Comparisons: `mencius-xunzi`, `hanfeizi-hobbes`, `hobbes-locke`, `locke-rousseau`, `arendt-marx`, and `foucault-arendt`.
- Kant, Rousseau, Mencius, and Xunzi are short Noema translations tied to stable locators. Hobbes, Locke, Arendt, and Foucault are explicitly presented as learning summaries rather than verbatim quotations.

## Unmigrated scope

- All other thinker quotation cards are structurally migrated but intentionally marked as unsourced learning summaries pending editorial verification.
- Comparisons outside the six listed above have no bibliography yet; their pages intentionally omit the references section.

## Items requiring confirmation

- A qualified editor should compare each Noema translation against the full original context before publication review.
- The exact section-level locator for Arendt's formulation of freedom and the best locator for Foucault's compressed power formulation need specialist bibliographic review; neither is currently claimed as a direct quotation.
- Published Japanese translations were not copied or attributed because edition and wording were not verified.

## Next migration targets

- Thinkers: Plato, Aristotle, Descartes, Hume, Marx, Confucius, Laozi, and Han Feizi.
- Comparisons: `hume-kant`, `hobbes-rousseau`, `rawls-marx`, `confucius-mencius`, `xunzi-hanfeizi`, and `confucius-laozi`.
