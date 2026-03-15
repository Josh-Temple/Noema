import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("home page", () => {
  it("renders seeded sections", () => {
    render(<HomePage />);
    expect(screen.getByText("おすすめ比較")).toBeInTheDocument();
    expect(screen.getByText("テーマ")).toBeInTheDocument();
  });
});
