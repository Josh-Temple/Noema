import { getSourceById } from "@/lib/content";
import { Quotation } from "@/types/content";
import { SourceReference } from "./SourceReference";

export const QuotationBlock = ({ quotation }: { quotation: Quotation }) => {
  const source = quotation.sourceId ? getSourceById(quotation.sourceId) : undefined;
  const effectiveTranslator = quotation.translator ?? source?.translator;
  if (quotation.isParaphrase) {
    return (
      <section className="mb-8 rounded-2xl border border-noema-line bg-slate-50 p-5" aria-labelledby="quotation-kind">
        <p id="quotation-kind" className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-noema-blue">SUMMARY / 要約・意訳</p>
        <p className="text-base leading-8 text-noema-text">{quotation.text}</p>
        <p className="mt-3 text-sm leading-6 text-noema-muted">{quotation.note ?? "原典の趣旨を学習用に要約しています。"}</p>
        {source ? <details className="mt-4 text-sm text-noema-muted"><summary className="cursor-pointer py-1 font-bold text-noema-text">根拠資料</summary><div className="pt-2"><SourceReference source={source} locator={quotation.locator} /></div></details> : <p className="mt-3 text-sm text-noema-muted">出典未確認</p>}
      </section>
    );
  }
  return (
    <figure className="mb-8 rounded-2xl border border-noema-line border-l-4 border-l-noema-accent bg-white p-5 shadow-sm">
      <p className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-noema-accent">DIRECT QUOTATION / 直接引用</p>
      <blockquote className="text-lg leading-8 text-noema-text">「{quotation.text}」</blockquote>
      <figcaption className="mt-4 text-sm leading-6 text-noema-muted">
        {source ? <><span className="font-medium text-noema-text">出典: </span><SourceReference source={source} locator={quotation.locator} showTranslator={false} /></> : <span className="font-medium text-noema-text">出典未確認</span>}
        <span className="block">{quotation.translationType === "noema" ? "Noema訳" : quotation.translationType === "published" ? `翻訳: ${effectiveTranslator}` : "翻訳情報未確認"}</span>
      </figcaption>
      {(quotation.originalText || quotation.note) ? <details className="mt-3 text-sm text-noema-muted"><summary className="cursor-pointer py-1 font-medium text-noema-text">引用の詳細</summary>{quotation.originalText ? <p lang={quotation.language} className="pt-2">原文: {quotation.originalText}</p> : null}{quotation.note ? <p className="pt-2">{quotation.note}</p> : null}</details> : null}
    </figure>
  );
};
