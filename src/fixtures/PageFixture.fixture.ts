import { Page, test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.page";
import { HomePage } from "../pages/HomePage.page";
import { SignUpPage } from "../pages/SignUpPage.page";
import { CreatedAccountPage } from "../pages/CreatedAccountPage.page";
import { DeleteAccountPage } from "../pages/DeleteAccountPage.page";
import { blockAds } from "../utils/blockAds";
import { ProductPage } from "../pages/ProductPage.Page";
import { CartPage } from "../pages/CartPage.page";

type PageFixture = {
    loginPage: LoginPage;
    homePage: HomePage;
    signupPage: SignUpPage;
    createdAccountPage: CreatedAccountPage;
    deleteAccountPage: DeleteAccountPage;
    productPage: ProductPage;
    cartPage: CartPage
}

export const test = base.extend<PageFixture>({
    page: async ({ page }, use) => {
        await blockAds(page);
        await use(page);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    signupPage: async({ page }, use)=>{
        const signupPage=new SignUpPage(page);
        await use(signupPage);
    },

    createdAccountPage: async({ page } ,use)=>{
        const accountCreatedPage=new CreatedAccountPage(page);
        await use(accountCreatedPage);
    },

    productPage: async({page},use)=>{
        const productPage=new ProductPage(page);
        await use(productPage);
    },

    cartPage: async({page},use)=>{
        const cartPage=new CartPage(page);
        await use(cartPage);
    },


    deleteAccountPage: async({ page } ,use)=>{
        const deleteAccountPage=new DeleteAccountPage(page);
        await use(deleteAccountPage);
    }
})