import { render, screen } from "@testing-library/react";
import ThinkerPage from "./page";

describe("thinker detail page", () => {
  it("renders thinker content for a valid slug", async () => {
    render(await ThinkerPage({ params: Promise.resolve({ slug: "kant" }) }));

    expect(screen.getByRole("heading", { name: "カント" })).toBeInTheDocument();
    expect(screen.getByText("核心の問い")).toBeInTheDocument();
  });
});
