import { SourceReference as SourceReferenceData } from "@/types/content";

const description = (source: SourceReferenceData, locator?: string) =>
  [source.author, `『${source.title}』`, locator ?? source.locator, source.translator && `翻訳: ${source.translator}`, source.publisher, source.edition]
    .filter(Boolean)
    .join("、");

export const SourceReference = ({ source, locator, linked = true }: { source: SourceReferenceData; locator?: string; linked?: boolean }) => {
  const label = description(source, locator);
  return (
    <span>
      {linked && source.url ? (
        <a className="underline decoration-noema-line underline-offset-4 hover:text-white" href={source.url} target="_blank" rel="noreferrer noopener" aria-label={`${source.title}の出典を新しいタブで開く`}>
          {label}
        </a>
      ) : label}
    </span>
  );
};
