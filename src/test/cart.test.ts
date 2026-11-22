import { describe, expect, it } from "vitest";
import { addToCart, cartCount, cartTotal, setQty } from "@/lib/cart";

describe("cart", () => {
  it("adds the same product twice as one line with quantity 2", () => {
    const lines = addToCart(addToCart([], "tarom-5kg"), "tarom-5kg");
    expect(lines).toEqual([{ id: "tarom-5kg", qty: 2 }]);
  });

  it("removes a line when quantity drops to zero", () => {
    expect(setQty([{ id: "tarom-5kg", qty: 1 }], "tarom-5kg", 0)).toEqual([]);
  });

  it("totals prices in Toman across lines", () => {
    const lines = [
      { id: "tarom-2kg", qty: 1 },
      { id: "tarom-10kg", qty: 2 },
    ];
    expect(cartTotal(lines)).toBe(890_000 + 2 * 4_200_000);
    expect(cartCount(lines)).toBe(3);
  });
});
