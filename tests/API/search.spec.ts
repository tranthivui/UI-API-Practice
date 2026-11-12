import { test,expect } from "../../src/fixtures/index";
import { searchKeyWords } from '../../src/data/searchKeyWords';
import { getSearchResult } from '../helpers/search.helper';
import { ApiMessageResponse } from '../../src/types/response';
import { message } from '../../src/data/message';

test.describe("Verify search", () => {
  for (const searchText of searchKeyWords.found) {
    test(`AE04-01: Search API: ${searchText}`,{tag: "@api"}, async ({ productApi }) => {
      const products = await getSearchResult(productApi, searchText);
      expect(products.length, `No product found for ${searchText}`).toBeGreaterThan(0);
      for (const product of products) {
        expect(
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.category.category.toLowerCase().includes(searchText.toLowerCase()),
          `Product ${product.name} has neither name nor category containing ${searchText}`
        ).toBe(true);
      }
    })
  };

  test("AE04-API-NEG-01: Search API with no result",{tag: "@api"}, async ({ productApi }) => {
    const products = await getSearchResult(productApi, searchKeyWords.notFound);
    expect(products).toHaveLength(0);
  })

  test("AE04-API-NEG-02: Search API without keyword",{tag: "@api"}, async ({ productApi }) => {
    const searchRes = await productApi.searchProductWithoutKeyword();
    expect(searchRes.status()).toBe(200);
    const searchResData: ApiMessageResponse = await searchRes.json();
    expect(searchResData.responseCode).toBe(400);
    expect(searchResData.message).toBe(message.searchWithoutKeyMess);
  })
})