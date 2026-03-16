import { render, screen } from "@testing-library/react";
import ThemePage from "./page";

describe("theme detail page", () => {
  it("renders knowledge theme content for a valid slug", () => {
    render(<ThemePage params={{ slug: "knowledge" }} />);

    expect(screen.getByRole("heading", { name: "知識" })).toBeInTheDocument();
    expect(screen.getByText("まずデカルト vs ロックで入口を掴み、ロック vs ヒューム、ヒューム vs カントへ進む。")).toBeInTheDocument();
  });

  it("renders happiness pathways with ancient ethics comparisons", () => {
    render(<ThemePage params={{ slug: "happiness" }} />);

    expect(screen.getByRole("heading", { name: "幸福" })).toBeInTheDocument();
    expect(screen.getByText("ストア派 vs エピクロス派")).toBeInTheDocument();
    expect(screen.getByText("エピクテトス vs エピクロス")).toBeInTheDocument();
  });
});
