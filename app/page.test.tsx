import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("home page", () => {
  it("renders seeded sections and lightweight learning loop surfaces", () => {
    render(<HomePage />);
    expect(screen.getByText("おすすめ比較")).toBeInTheDocument();
    expect(screen.getByText("1分で振り返る")).toBeInTheDocument();
    expect(screen.getByText("最近見た比較の続き")).toBeInTheDocument();
    expect(screen.getAllByText(/(孟子 vs 荀子|韓非子 vs ホッブズ)/).length).toBeGreaterThan(0);
  });
});
