import { getSourceById } from "@/lib/content";
import { Quotation } from "@/types/content";
import { SourceReference } from "./SourceReference";

export const QuotationBlock = ({ quotation }: { quotation: Quotation }) => {
  const source = quotation.sourceId ? getSourceById(quotation.sourceId) : undefined;
  if (quotation.isParaphrase) {
    return (
      <section className="mb-5 border-y border-noema-line/70 py-4" aria-labelledby="quotation-kind">
        <p id="quotation-kind" className="mb-2 text-sm font-semibold tracking-wide text-noema-accent">要約・意訳</p>
        <p className="text-base leading-7 text-noema-text">{quotation.text}</p>
        <p className="mt-2 text-sm leading-6 text-noema-muted">{quotation.note ?? "原典の趣旨を学習用に要約しています。"}</p>
        {source ? <details className="mt-2 text-sm text-noema-muted"><summary className="cursor-pointer py-1 font-medium text-noema-text">根拠資料</summary><div className="pt-2"><SourceReference source={source} locator={quotation.locator} /></div></details> : <p className="mt-2 text-sm text-noema-muted">出典未確認</p>}
      </section>
    );
  }
  return (
    <figure className="mb-5 border-y border-noema-line/70 py-4">
      <p className="mb-2 text-sm font-semibold tracking-wide text-noema-accent">直接引用</p>
      <blockquote className="border-l-2 border-noema-accent/60 pl-4 text-lg leading-8">「{quotation.text}」</blockquote>
      <figcaption className="mt-3 text-sm leading-6 text-noema-muted">
        {source ? <><span className="font-medium text-noema-text">出典: </span><SourceReference source={source} locator={quotation.locator} /></> : null}
        <span className="block">{quotation.translationType === "noema" ? "Noema訳" : quotation.translationType === "published" ? `翻訳: ${quotation.translator ?? source?.translator}` : "翻訳情報未確認"}</span>
      </figcaption>
      {(quotation.originalText || quotation.note) ? <details className="mt-2 text-sm text-noema-muted"><summary className="cursor-pointer py-1 font-medium text-noema-text">引用の詳細</summary>{quotation.originalText ? <p lang={quotation.language} className="pt-2">原文: {quotation.originalText}</p> : null}{quotation.note ? <p className="pt-2">{quotation.note}</p> : null}</details> : null}
    </figure>
  );
};
