import { fireEvent, render, screen } from "@testing-library/react";
import SearchPage from "./page";

describe("search page", () => {
  it("renders grouped search headings", () => {
    render(<SearchPage />);
    expect(screen.getByRole("heading", { name: "比較" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "思想家" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "テーマ" })).toBeInTheDocument();
  });

  it("shows calm empty state with starter suggestions", () => {
    render(<SearchPage />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "zzzzzzzz" } });

    expect(screen.getByText("検索結果が見つかりません")).toBeInTheDocument();
    expect(screen.getByText("最初に見るなら")).toBeInTheDocument();
  });
});
