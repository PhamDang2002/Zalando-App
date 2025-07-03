import { currencyFormatter } from "./utils";
import { describe, it, expect } from "@jest/globals";

describe("currencyFormatter", () => {
  it("format số thành VND", () => {
    expect(currencyFormatter(1000000)).toBe("₫1,000,000");
    expect(currencyFormatter(0)).toBe("₫0");
  });
});
