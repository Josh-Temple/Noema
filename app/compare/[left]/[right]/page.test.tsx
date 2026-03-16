import { render, screen } from "@testing-library/react";
import ComparePage from "./page";

describe("compare detail page", () => {
  it("renders comparison content for a valid thinker pair", () => {
    render(<ComparePage params={{ left: "descartes", right: "hume" }} />);

    expect(screen.getByRole("heading", { name: "合理主義 vs 経験主義" })).toBeInTheDocument();
    expect(screen.getByText("次の一歩")).toBeInTheDocument();
    expect(screen.getByText("次に見ると流れがつかみやすい")).toBeInTheDocument();
  });
});
