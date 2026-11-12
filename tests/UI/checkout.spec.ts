import { cardInfo } from "../../src/data/card";
import { listProducts } from "../../src/data/products";
import { expect, test } from "../../src/fixtures/AuthFixture.fixture";
import { parsePrice } from "../../src/utils/parsePrice";

test.describe("Checkout process", () => {

    test.beforeEach("Clear cart", async ({ cartPage }) => {
        await cartPage.goto();
        await expect(cartPage.page).toHaveURL(cartPage.url);
        await cartPage.clearCart();
    });

    test("AE03-06: Checkout end-to-end",{tag: ["@ui","@smoke"]}, async ({ productPage, cartPage, checkOutPage, paymentPage, paymentDonePage, workerAccount, productDetailPage }) => {
        await test.step("Add product to card", async () => {
            await productPage.goto();
            await expect(productPage.page).toHaveURL(productPage.url);
            for (const product of listProducts) {
                await productPage.clickViewProduct(product.name);
                await productDetailPage.fillQuantity(product.quantity);
                await productDetailPage.clickAddToCart();
                await productDetailPage.clickContinueShopping();
                await productPage.goto();
            }
        });

        await test.step("Goto cart", async () => {
            await cartPage.goto();
            await expect(cartPage.page).toHaveURL(cartPage.url);
        });

        await test.step("Procee to checkout", async () => {
            await cartPage.clickCheckOut();
            await expect(checkOutPage.page).toHaveURL(checkOutPage.url);
        });

        await test.step("Verify delivery address", async () => {
            await expect(checkOutPage.name).toHaveText(`${workerAccount.title}. ${workerAccount.firstname} ${workerAccount.lastname}`);
            await expect(checkOutPage.addressLines).toHaveText([
                workerAccount.company,
                workerAccount.address1,
                workerAccount.address2
            ]);

            await expect(checkOutPage.city).toHaveText(`${workerAccount.city} ${workerAccount.state} ${workerAccount.zipcode}`);
            await expect(checkOutPage.country).toHaveText(workerAccount.country);
            await expect(checkOutPage.mobile_number).toHaveText(workerAccount.mobile_number);
        });

        await test.step("Verify total amount", async () => {
            let totalPrice = 0;
            for (const product of listProducts) {
                await expect(checkOutPage.getProductQuantity(product.name)).toHaveText(String(product.quantity));
                const priceText = await checkOutPage.getProductPrice(product.name).innerText();
                const price = parsePrice(priceText);
                totalPrice = totalPrice + price * product.quantity;
            };
            await expect(checkOutPage.getTotalPrice()).toHaveText(`Rs. ${totalPrice}`);
        });

        await test.step("Fill payment info", async () => {
            await checkOutPage.clickPlaceOrder();
            await paymentPage.pay(cardInfo)
        });

        await test.step("Verify payment success", async () => {
            await expect(paymentDonePage.orderSuccessText).toBeVisible();
        })
    })
})