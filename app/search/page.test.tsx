import { render, screen } from "@testing-library/react";
import SearchPage from "@/app/search/page";

describe("search page", () => {
  it("renders grouped search headings", () => {
    render(<SearchPage />);
    expect(screen.getByRole("heading", { name: "比較" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "思想家" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "テーマ" })).toBeInTheDocument();
  });
});
