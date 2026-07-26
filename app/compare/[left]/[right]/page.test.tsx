import { render, screen } from "@testing-library/react";
import ComparePage from "./page";

describe("compare detail page", () => {
  it("renders comparison content for a valid thinker pair", () => {
    render(<ComparePage params={{ left: "descartes", right: "hume" }} />);

    expect(screen.getByRole("heading", { name: "合理主義 vs 経験主義" })).toBeInTheDocument();
    expect(screen.getByText("次の一歩")).toBeInTheDocument();
    expect(screen.getAllByText("このテーマの次の一歩").length).toBeGreaterThan(0);
  });

  it("renders the lightweight review block", () => {
    render(<ComparePage params={{ left: "sartre", right: "beauvoir" }} />);

    expect(screen.getByText("理解確認")).toBeInTheDocument();
    expect(screen.getByText("この比較の要点")).toBeInTheDocument();
    expect(screen.getByText("短く確認する問い")).toBeInTheDocument();
  });

  it("shows categorized references only for migrated comparisons", () => {
    const { unmount } = render(<ComparePage params={{ left: "hobbes", right: "locke" }} />);
    expect(screen.getByText("参照資料")).toBeInTheDocument();
    expect(screen.getByText("一次資料")).toBeInTheDocument();
    expect(screen.getByText("参考資料")).toBeInTheDocument();
    unmount();
    render(<ComparePage params={{ left: "descartes", right: "hume" }} />);
    expect(screen.queryByText("参照資料")).not.toBeInTheDocument();
  });
});
