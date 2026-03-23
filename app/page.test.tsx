import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("home page", () => {
  it("renders seeded sections and Sprint 10 pathway entry surfaces", () => {
    render(<HomePage />);
    expect(screen.getByText("おすすめ比較")).toBeInTheDocument();
    expect(screen.getByText("1分で振り返る")).toBeInTheDocument();
    expect(screen.getByText("テーマから入る")).toBeInTheDocument();
    expect(screen.getByText("20世紀への入口")).toBeInTheDocument();
    expect(screen.getByText("東洋思想への入口")).toBeInTheDocument();
  });
});
