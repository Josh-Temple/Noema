import { render, screen } from "@testing-library/react";
import { QuotationBlock } from "./QuotationBlock";

describe("QuotationBlock", () => {
  it("shows a sourced direct Noema translation and links URL sources", () => {
    render(<QuotationBlock quotation={{ text: "啓蒙", sourceId: "kant-enlightenment", isParaphrase: false, translationType: "noema" }} />);
    expect(screen.getByText("直接引用")).toBeInTheDocument();
    expect(screen.getByText("出典:")).toBeInTheDocument();
    expect(screen.getByText("Noema訳")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
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
});
