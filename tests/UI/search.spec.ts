import { searchKeyWords } from "../../src/data/searchKeyWords";
import { expect, test } from "../../src/fixtures/index";
import { getSearchResult } from "../helpers/search.helper";

test.describe("Verify search result from UI with API", () => {
    for (const keyword of searchKeyWords.found) {
        test(`AE04-UI-01: search UI "${keyword}" matches API`,{tag: ["@ui","@smoke"]}, async ({ productApi, productPage }) => {
            const productFromApi = await getSearchResult(productApi, keyword);
            await productPage.goto();
            await productPage.search(keyword);
            await expect(productPage.searchTitle).toBeVisible();
            const listProductNames = productPage.getListProductNames();
            await expect(listProductNames).toHaveCount(productFromApi.length);
            await expect(listProductNames).toHaveText(productFromApi.map(p => p.name));
        })
    };

    test("AE04-UI-NEG-01: Not have result",{tag: "@ui"}, async ({ productApi, productPage }) => {
        const productFromApi = await getSearchResult(productApi, searchKeyWords.notFound);
        expect(productFromApi.length).toBe(0);
        await productPage.goto();
        await productPage.search(searchKeyWords.notFound);
        await expect(productPage.searchTitle).toBeVisible();
        await expect(productPage.getListProductNames()).toHaveCount(0);
    })
})