import { listProducts } from "../../src/data/products";
import { expect, test } from "../../src/fixtures/AuthFixture.fixture";
import { CartPage } from "../../src/pages/CartPage.page";
import { parsePrice } from "../../src/utils/parsePrice";

test.describe("Verify product", () => {
    test("AE03-01: Logged by storageState", async ({ homePage, workerAccount }) => {
        await homePage.goto();
        await expect(homePage.loggedInUser).toHaveText(` Logged in as ${workerAccount.name}`);
    })

    test("AE03-02: Add product from Product page", async ({ productPage, workerAccount, cartPage }) => {
        const totalProduct = listProducts.length;

                await test.step("Clear cart before add product", async () => {
            await cartPage.clearCart();
        });

        await test.step("Goto product page", async () => {
            await productPage.goto();
            await expect(productPage.productHeading).toBeVisible();
        });

        await test.step("Add product", async () => {
            for (let i = 0; i < totalProduct; i++) {
                await productPage.clickAddProduct(listProducts[i].name);
                await productPage.clickContinuteShopping();
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
            for(const product of listProducts){
                const quantity=1;
                const price=parsePrice(await cartPage.getProductPrice(product.name).innerText());
                await expect(cartPage.getProductQuantity(product.name)).toHaveText(quantity.toString());
                await expect(cartPage.getProductTotal(product.name)).toHaveText(`Rs. ${price * quantity}`);
            }
        })
    })
})