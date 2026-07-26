import { fireEvent, render, screen } from "@testing-library/react";
import { SaveToggleButton } from "@/components/common/SaveToggleButton";
import { resetStoredItemsStore, STORAGE_KEYS } from "@/lib/storage";

describe("SaveToggleButton integration", () => {
  beforeEach(() => {
    localStorage.clear();
    resetStoredItemsStore();
  });

  it("synchronizes save and unsave between rendered UI consumers and localStorage", () => {
    render(
      <>
        <SaveToggleButton kind="thinker" slug="kant" label="カント（操作側）" />
        <SaveToggleButton kind="thinker" slug="kant" label="カント（参照側）" />
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "カント（操作側）を保存" }));
    expect(screen.getByRole("button", { name: "カント（参照側）を保存解除" })).toHaveTextContent("保存済み");
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.saved) ?? "[]")).toEqual([{ kind: "thinker", slug: "kant" }]);

    fireEvent.click(screen.getByRole("button", { name: "カント（参照側）を保存解除" }));
    expect(screen.getByRole("button", { name: "カント（操作側）を保存" })).toHaveTextContent("保存");
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.saved) ?? "[]")).toEqual([]);
  });
});
