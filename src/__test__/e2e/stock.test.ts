import { maxProfit } from "../stockProfit";

describe("maxProfit", () => {
  it("should return 0 for an empty array", () => {
    expect(maxProfit([])).toBe(0);
  });

  it("should return 0 for an array with one price", () => {
    expect(maxProfit([3])).toBe(0);
  });

  it("should return the correct maximum profit", () => {
    expect(maxProfit([2, 3, 6, 4, 3])).toBe(4);
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
    expect(maxProfit([3, 3, 3, 3, 3])).toBe(0);
    expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
  });
});
