import { render, screen } from "@testing-library/react";
import ThemePage from "@/app/themes/[slug]/page";

describe("theme detail page", () => {
  it("renders theme content for a valid slug", () => {
    render(<ThemePage params={{ slug: "knowledge" }} />);

    expect(screen.getByRole("heading", { name: "知識" })).toBeInTheDocument();
    expect(screen.getByText("まずはデカルト vs ヒュームで出発点の差をつかむ。"))
      .toBeInTheDocument();
  });
});
