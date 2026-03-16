import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("home page", () => {
  it("renders seeded sections and featured 20th-century bridge comparisons", () => {
    render(<HomePage />);
    expect(screen.getByText("おすすめ比較")).toBeInTheDocument();
    expect(screen.getByText("テーマ")).toBeInTheDocument();
    expect(screen.getAllByText(/(フーコー vs アーレント|サルトル vs ボーヴォワール|アーレント vs マルクス)/).length).toBeGreaterThan(0);
  });
});
