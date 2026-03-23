import { fireEvent, render, screen } from "@testing-library/react";
import SearchPage from "./page";

describe("search page", () => {
  it("renders grouped search headings and theme entry rail", () => {
    render(<SearchPage />);
    expect(screen.getByText("テーマから入る")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "比較" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "思想家" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "テーマ" })).toBeInTheDocument();
  });

  it("keeps theme entry guidance visible when search needs direction", () => {
    render(<SearchPage />);
    expect(screen.getByText("テーマから入る")).toBeInTheDocument();
    expect(screen.getAllByText("人間とは何か").length).toBeGreaterThan(0);
  });

  it("shows pathway highlights for directed searches", () => {
    render(<SearchPage />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "power" } });

    expect(screen.getByText("この検索から入りやすい比較")).toBeInTheDocument();
    expect(screen.getAllByText("フーコー vs アーレント").length).toBeGreaterThan(0);
  });
});
