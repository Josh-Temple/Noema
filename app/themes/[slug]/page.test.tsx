import { render, screen } from "@testing-library/react";
import ThemePage from "./page";

describe("theme detail page", () => {
  it("renders knowledge theme content for a valid slug", () => {
    render(<ThemePage params={{ slug: "knowledge" }} />);

    expect(screen.getByRole("heading", { name: "知識" })).toBeInTheDocument();
    expect(screen.getByText("まずデカルト vs ロックで入口を掴み、ロック vs ヒューム、ヒューム vs カントへ進む。")).toBeInTheDocument();
  });

  it("renders society-power pathways with bridge comparisons", () => {
    render(<ThemePage params={{ slug: "society-power" }} />);

    expect(screen.getByRole("heading", { name: "社会と権力はどう成り立つか" })).toBeInTheDocument();
    expect(screen.getByText("まずはこの比較から")).toBeInTheDocument();
    expect(screen.getByText("小さな読む順")).toBeInTheDocument();
    expect(screen.getByText("最初の比較")).toBeInTheDocument();
    expect(screen.getByText("寄り道ルート（任意）")).toBeInTheDocument();
    expect(screen.getByText("20世紀への入口")).toBeInTheDocument();
    expect(screen.getAllByText("アーレント vs マルクス").length).toBeGreaterThan(0);
    expect(screen.getAllByText("フーコー vs アーレント").length).toBeGreaterThan(0);
  });
});
