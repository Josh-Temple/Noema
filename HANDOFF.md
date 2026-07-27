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

## PR #21 follow-up

- Kant remains a direct Noema translation, now restoring the omitted “self-incurred” qualification (`自ら招いた`) and retaining the German original and language metadata.
- Direct quotations now need both a source ID and an effective quotation- or source-level locator. `workType` is required and runtime-validated as `primary` or `secondary`; whitespace-only citation metadata is rejected.
- For published translations, quotation-level translator metadata takes display precedence over source metadata. Either location is accepted, equal duplicate values render once, and differing values fail validation. Noema translations do not display external translator metadata.
- The Rousseau source URL was corrected from `Chapitre_I` to the registered Wikisource chapter path ending in `Chapitre_1`, identifying Book I, Chapter 1; tests pin both the stored value and rendered link.
- Remaining bibliographic checks are unchanged: specialist review is still needed for every Noema translation in full context and for the Arendt/Foucault summary locators. No other thinkers or comparisons were migrated in this follow-up.

## Next migration targets

- Thinkers: Plato, Aristotle, Descartes, Hume, Marx, Confucius, Laozi, and Han Feizi.
- Comparisons: `hume-kant`, `hobbes-rousseau`, `rawls-marx`, `confucius-mencius`, `xunzi-hanfeizi`, and `confucius-laozi`.
