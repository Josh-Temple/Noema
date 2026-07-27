import { render, screen } from "@testing-library/react";
import { QuotationBlock } from "./QuotationBlock";
import { sources } from "@/content/sources";

describe("QuotationBlock", () => {
  it("shows a sourced direct Noema translation and links URL sources", () => {
    render(<QuotationBlock quotation={{ text: "啓蒙", sourceId: "kant-enlightenment", isParaphrase: false, translationType: "noema" }} />);
    expect(screen.getByText("直接引用")).toBeInTheDocument();
    expect(screen.getByText("出典:")).toBeInTheDocument();
    expect(screen.getByText("Noema訳")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    expect(document.querySelector("blockquote")).toBeInTheDocument();
  });

  it("labels summaries without presenting them as blockquotes or links", () => {
    const { container } = render(<QuotationBlock quotation={{ text: "学習用本文", isParaphrase: true }} />);
    expect(screen.getByText("要約・意訳")).toBeInTheDocument();
    expect(screen.getByText("出典未確認")).toBeInTheDocument();
    expect(container.querySelector("blockquote")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("shows published translator information without linking a paper source", () => {
    render(<QuotationBlock quotation={{ text: "本文", sourceId: "arendt-human-condition", isParaphrase: false, translationType: "published", translator: "翻訳者名" }} />);
    expect(screen.getByText("翻訳: 翻訳者名")).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders a published translator once whether it comes from source, quotation, or both", () => {
    const source = sources.find((item) => item.id === "kant-enlightenment")!;
    source.translator = "同じ翻訳者";
    const { rerender } = render(<QuotationBlock quotation={{ text: "本文", sourceId: source.id, locator: "冒頭", isParaphrase: false, translationType: "published" }} />);
    expect(screen.getAllByText("翻訳: 同じ翻訳者")).toHaveLength(1);
    rerender(<QuotationBlock quotation={{ text: "本文", sourceId: source.id, locator: "冒頭", isParaphrase: false, translationType: "published", translator: "同じ翻訳者" }} />);
    expect(screen.getAllByText("翻訳: 同じ翻訳者")).toHaveLength(1);
    source.translator = undefined;
    rerender(<QuotationBlock quotation={{ text: "本文", sourceId: source.id, locator: "冒頭", isParaphrase: false, translationType: "published", translator: "引用側翻訳者" }} />);
    expect(screen.getAllByText("翻訳: 引用側翻訳者")).toHaveLength(1);
  });

  it("does not expose source translator for a Noema translation and labels unknown translations", () => {
    const source = sources.find((item) => item.id === "kant-enlightenment")!;
    source.translator = "外部翻訳者";
    const { rerender } = render(<QuotationBlock quotation={{ text: "本文", sourceId: source.id, locator: "冒頭", isParaphrase: false, translationType: "noema" }} />);
    expect(screen.getByText("Noema訳")).toBeInTheDocument();
    expect(screen.queryByText(/外部翻訳者/)).toBeNull();
    source.translator = undefined;
    rerender(<QuotationBlock quotation={{ text: "本文", sourceId: source.id, locator: "冒頭", isParaphrase: false, translationType: "unknown" }} />);
    expect(screen.getByText("翻訳情報未確認")).toBeInTheDocument();
  });

  it("uses the registered Rousseau chapter URL as the source href", () => {
    render(<QuotationBlock quotation={{ text: "本文", sourceId: "rousseau-social-contract", locator: "第1編第1章", isParaphrase: false, translationType: "noema" }} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://fr.wikisource.org/wiki/Du_contrat_social/%C3%89dition_1762/Livre_I/Chapitre_1");
  });
});
