import { Page, test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.page";
import { HomePage } from "../pages/HomePage.page";
import { SignUpPage } from "../pages/SignUpPage.page";
import { CreatedAccountPage } from "../pages/CreatedAccountPage.page";
import { DeleteAccountPage } from "../pages/DeleteAccountPage.page";

type PageFixture = {
    loginPage: LoginPage;
    homePage: HomePage;
    signupPage: SignUpPage;
    createdAccountPage: CreatedAccountPage;
    deleteAccountPage: DeleteAccountPage;
}

export const test = base.extend<PageFixture>({
    page: async ({ page }, use) => {
        await page.route(/googlesyndication\.com|cloudflareinsights\.com|doubleclick\.net|adtrafficquality\.google|2mdn\.net|smartadserver\.com|fundingchoicesmessages\.google\.com/, route => route.abort());
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

    deleteAccountPage: async({ page } ,use)=>{
        const deleteAccountPage=new DeleteAccountPage(page);
        await use(deleteAccountPage);
    }
})