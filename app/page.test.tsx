import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("home page", () => {
  it("renders seeded sections and featured ancient ethics comparisons", () => {
    render(<HomePage />);
    expect(screen.getByText("おすすめ比較")).toBeInTheDocument();
    expect(screen.getByText("テーマ")).toBeInTheDocument();
    expect(screen.getAllByText("ストア派 vs エピクロス派").length).toBeGreaterThan(0);
  });
});
