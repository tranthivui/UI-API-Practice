import { listProducts } from "../../src/data/products";
import { expect, test } from "../../src/fixtures/AuthFixture.fixture";
import { Product } from "../../src/types/Product";
import { GetAllProductListRes } from "../../src/types/response";
import { findProductByName } from "../../src/utils/findProductByName";
import { parsePrice } from "../../src/utils/parsePrice";

test.describe("Verify product", () => {

    test.beforeEach("Clear cart", async ({ cartPage }) => {
        await cartPage.clearCart();
    });

    test("AE03-01: Logged by storageState", async ({ homePage, workerAccount }) => {
        await homePage.goto();
        await expect(homePage.loggedInUser).toHaveText(` Logged in as ${workerAccount.name}`);
    })

    test("AE03-02: Add product from Product page", async ({ productPage, cartPage }) => {
        const totalProduct = listProducts.length;

        await test.step("Goto product page", async () => {
            await productPage.goto();
            await expect(productPage.productHeading).toBeVisible();
        });

        await test.step("Add product", async () => {
            for (let i = 0; i < totalProduct; i++) {
                await productPage.clickAddProduct(listProducts[i].name);
                //    await productPage.clickContinuteShopping();
            }
        });

        await test.step("Goto Cart", async () => {
            await cartPage.goto()
        });

        await test.step("Verify total product in cart and name", async () => {
            await expect(cartPage.cartRows).toHaveCount(totalProduct);
            await expect(cartPage.getListProductNames()).toHaveText(listProducts.map(p => p.name));
        });

        await test.step("Verify quantity and total", async () => {
            for (const product of listProducts) {
                const quantity = 1;
                const price = parsePrice(await cartPage.getProductPrice(product.name).innerText());
                await expect(cartPage.getProductQuantity(product.name)).toHaveText(quantity.toString());
                await expect(cartPage.getProductTotal(product.name)).toHaveText(`Rs. ${price * quantity}`);
            }
        })
    })

    test("AE03-03: Add product from product detail page", async ({ productPage, produtDetailPage, cartPage }) => {
        const product: Product = listProducts[1];
        await test.step("Click view detail", async () => {
            await productPage.goto();
            await expect(productPage.productHeading).toBeVisible();
            await productPage.clickViewProduct(product.name);
            await productPage.page.waitForURL(/\/product_details\/\d+/);
        });

        await test.step("Click add to cart at product detail page", async () => {
            await produtDetailPage.fillQuantity(product.quantity);
            await produtDetailPage.clickAddToCart();
            await produtDetailPage.clickViewCart();
        });

        await test.step("Verify cart detail", async () => {
            await expect(cartPage.getProductQuantity(product.name)).toHaveText(product.quantity.toString());
            const price = parsePrice(await cartPage.getProductPrice(product.name).innerText());
            await expect(cartPage.getProductTotal(product.name)).toHaveText(`Rs. ${price * product.quantity}`);
        })
    })

    test("AE03-04: Delete product from cart", async ({ productPage, cartPage }) => {
        const totalProduct = listProducts.length;
        await test.step("Goto product page", async () => {
            await productPage.goto();
            await expect(productPage.productHeading).toBeVisible();
        });

        await test.step("Add product", async () => {
            for (const product of listProducts) {
                await productPage.clickAddProduct(product.name);
                // await productPage.clickContinuteShopping();
            }
        });

        await test.step("Goto Cart", async () => {
            await cartPage.goto()
        });

        await test.step("Verify total product in cart", async () => {
            await expect(cartPage.cartRows).toHaveCount(totalProduct);
        });

        await test.step("Delete product and verify", async () => {
            const listProductName = listProducts.map(p => p.name);
            for (let i = 0; i < totalProduct; i++) {
                await cartPage.deleteProductByName(listProductName[i]);
                const remaining = listProductName.slice(i + 1);
                if (remaining.length > 0) {
                    await expect(cartPage.getListProductNames()).toHaveText(remaining)
                } else {
                    await expect(cartPage.cartEmtyText).toBeVisible();
                }
            }
        });
    })

    test("AE03-05: Price on UI and API are the same", async ({ productPage, cartPage, productApi }) => {
        const getListProductRes = await productApi.getListProduct();
        expect(getListProductRes.status()).toBe(200);
        const getListProductResDa: GetAllProductListRes = await getListProductRes.json();
        expect(getListProductResDa.responseCode).toBe(200);
        const expectedProducts = listProducts.map(p => findProductByName(getListProductResDa.products, p.name));

        await test.step("Goto product page", async () => {
            await productPage.goto();
            await expect(productPage.productHeading).toBeVisible();
        });

        await test.step("Add product", async () => {
            for (const product of expectedProducts) {
                await productPage.clickAddProduct(product.name);
                // await productPage.clickContinuteShopping();
            }
        });

        await test.step("Goto Cart", async () => {
            await cartPage.goto()
        });

        await test.step("Verify total price on cart and API are the same", async () => {
            for (const product of expectedProducts) {
                await expect(cartPage.getProductPrice(product.name)).toHaveText(product.price);
            }
        });
    })
})