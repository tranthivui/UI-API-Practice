import { cardInfo } from "../../src/data/card";
import { listProducts } from "../../src/data/products";
import { expect, test } from "../../src/fixtures/AuthFixture.fixture";
import { parsePrice } from "../../src/utils/parsePrice";

test.describe("Checkout process", async () => {
    test.beforeEach("Clear cart", async ({cartPage}) => {
            await cartPage.goto();
            await expect(cartPage.page).toHaveURL(cartPage.url);
            await cartPage.clearCart();
        });

    test("AE03-06: Checkout end-to-end", async ({ productPage, cartPage, checkOutPage, paymentPage, paymentDonePage, workerAccount,produtDetailPage}) => {
        await test.step("Add product to card", async () => {
            await productPage.goto();
            await expect(productPage.page).toHaveURL(productPage.url);
            for (const product of listProducts) {
                await productPage.clickViewProduct(product.name);
                await produtDetailPage.page.waitForLoadState("load");
                await produtDetailPage.fillQuantity(product.quantity);
                await produtDetailPage.clickAddToCart();
                await produtDetailPage.clickContinueShopping();
                await productPage.goto();
                await productPage.page.waitForLoadState("load");
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

        await test.step("Verify delivery address", async()=>{
            await expect(checkOutPage.name).toHaveText(`${workerAccount.title}. ${workerAccount.firstname} ${workerAccount.lastname}`);
         //   const countAdd=await checkOutPage.companyAdd1Add2.count();
            await expect(checkOutPage.addressLines).toHaveText([
                workerAccount.company,
                workerAccount.address1,
                workerAccount.address2
            ]);

            await expect(checkOutPage.city).toHaveText(`${workerAccount.city} ${workerAccount.state} ${workerAccount.zipcode}`);
            await expect(checkOutPage.country).toHaveText(workerAccount.country);
            await expect(checkOutPage.mobile_number).toHaveText(workerAccount.mobile_number);
        });

        await test.step("Verify total amount", async()=>{
            let totalPrice=0;
            for(const product of listProducts){
                const priceText=await checkOutPage.getProductPrice(product.name).innerText();
                const price=parsePrice(priceText);
                totalPrice=totalPrice+price*product.quantity;
            };
            await expect(checkOutPage.getTotalPrice()).toHaveText(`Rs. ${totalPrice}`);
        });

        await test.step("Fill payment info", async()=>{
            await checkOutPage.clickPlaceOrder();
            await paymentPage.page.waitForLoadState("load");
            await paymentPage.fillCardName(cardInfo.cardName);
            await paymentPage.fillCardNumber(cardInfo.cardNumber);
            await paymentPage.fillCVC(cardInfo.cvc);
            await paymentPage.fillMonth(cardInfo.month);
            await paymentPage.fillYear(cardInfo.year);
            await paymentPage.payBtn.click();
            await paymentDonePage.page.waitForLoadState("load");
        });

        await test.step("Verify payment success", async()=>{
            await expect(paymentDonePage.orderSuccessText).toBeVisible();
        })
    })
})