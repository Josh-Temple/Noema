import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SavedPage from "./page";

const mockUseSavedItems = vi.fn();
const mockUseRecentItems = vi.fn();

vi.mock("@/hooks/useSavedItems", () => ({
  useSavedItems: () => mockUseSavedItems(),
}));

vi.mock("@/hooks/useRecentItems", () => ({
  useRecentItems: () => mockUseRecentItems(),
}));

describe("saved page", () => {
  beforeEach(() => {
    mockUseSavedItems.mockReturnValue({
      savedItems: [
        { kind: "comparison", slug: "mencius-xunzi" },
        { kind: "thinker", slug: "hanfeizi" },
        { kind: "theme", slug: "state-legitimacy" },
      ],
    });
    mockUseRecentItems.mockReturnValue({
      recentItems: [{ kind: "comparison", slug: "mencius-xunzi" }],
    });
  });

  it("groups saved items into a study shelf with next steps", () => {
    render(<SavedPage />);

    expect(screen.getByText("保存した学習棚")).toBeInTheDocument();
    expect(screen.getByText("保存した比較")).toBeInTheDocument();
    expect(screen.getByText("保存した思想家")).toBeInTheDocument();
    expect(screen.getByText("保存したテーマ")).toBeInTheDocument();
    expect(screen.getAllByText(/次の一歩|この人物から入る比較|まずはこの1本/).length).toBeGreaterThan(0);
  });
});
