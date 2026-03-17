import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("home page", () => {
  it("renders seeded sections and surfaces east asian second-wave comparisons", () => {
    render(<HomePage />);
    expect(screen.getByText("おすすめ比較")).toBeInTheDocument();
    expect(screen.getByText("テーマ")).toBeInTheDocument();
    expect(screen.getAllByText(/(孟子 vs 荀子|韓非子 vs ホッブズ)/).length).toBeGreaterThan(0);
  });
});
