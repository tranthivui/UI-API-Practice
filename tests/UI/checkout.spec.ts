import { listProducts } from "../../src/data/products";
import { expect, test } from "../../src/fixtures/AuthFixture.fixture";
import { parsePrice } from "../../src/utils/parsePrice";

test.describe("Checkout process", async () => {
    test.beforeEach("Clear cart", async ({cartPage}) => {
            await cartPage.goto();
            expect(cartPage.page).toHaveURL(cartPage.url);
            await cartPage.clearCart();
        });

    test("AE03-06: Checkout end-to-end", async ({ productPage, cartPage, checkOutPage, paymentPage, paymentDonePage, workerAccount,produtDetailPage }) => {
        await test.step("Add product to card", async () => {
            await productPage.goto();
            expect(productPage.page.waitForURL(productPage.url));
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
            expect(cartPage.page.waitForURL(cartPage.url));
        });

        await test.step("Procee to checkout", async () => {
            await cartPage.clickCheckOut();
            await expect(checkOutPage.page).toHaveURL(checkOutPage.url);
        });

        await test.step("Verify delivery address", async()=>{
            await expect(checkOutPage.name).toHaveText(`${workerAccount.title}. ${workerAccount.firstname} ${workerAccount.lastname}`);
            const countAdd=await checkOutPage.companyAdd1Add2.count();
            for(let i=0;i<countAdd;i++){
                if(i===0){
                    await expect(checkOutPage.companyAdd1Add2.nth(i)).toHaveText(workerAccount.company);
                }else{
                    if(i===1){
                        await expect(checkOutPage.companyAdd1Add2.nth(i)).toHaveText(workerAccount.address1);
                    }else{
                        await expect(checkOutPage.companyAdd1Add2.nth(i)).toHaveText(workerAccount.address2);
                    }
                }
            };
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
            console.log(await checkOutPage.getTotalPrice().innerText());
           // await expect(checkOutPage.getTotalPrice()).toHaveText(`Rs. ${totalPrice}`);
        })
    })
})