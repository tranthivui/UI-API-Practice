import { test, expect } from "@playwright/test";
import { parsePrice } from "../../src/utils/parsePrice";

test.describe("parsePrice", () => {
    test("parse valid price", () => {
        expect(parsePrice("Rs. 500")).toBe(500);
    });

    for (const bad of ["abc", "Rs. 1,500", "", "500"]) {
        test(`throw on invalid: "${bad}"`, () => {
            expect(() => parsePrice(bad)).toThrow(/Cannot parse price/);
        });
    }
});