import { expect } from '@playwright/test';
import { test } from "../../src/fixtures/PageFixture.fixture"
import { ENV } from '../../src/config/env';
import { listUser } from '../../src/data/users';
const data = {
  incorrectPassMess: "Your email or password is incorrect!"
}

test.describe("Verify login UI", () => {
  test("AE01-01: Verify login success", async ({ loginPage, homePage }) => {
    await test.step("Fill login info", async () => {
      await loginPage.goto();
      await loginPage.login(ENV.userEmail, ENV.userPassword);
    });
    await test.step("Verify login success", async () => {
      await loginPage.page.waitForURL("/");
      await expect(homePage.loginInUser).toHaveText(`Logged in as ${ENV.userName}`);
      await expect(homePage.logoutLink).toBeVisible();
      await expect(loginPage.loginForm).not.toBeVisible();
    });
  })

  test("AE01-02: Login with invalid password", async ({ loginPage, homePage }) => {
    await test.step("Fill login info", async () => {
      await loginPage.goto();
      await loginPage.login(listUser.invalidPass.email, listUser.invalidPass.password);
    });
    await test.step("Verify login fail", async () => {
      await expect(loginPage.errorMess).toHaveText(data.incorrectPassMess);
      await expect(loginPage.page).toHaveURL(loginPage.url);
      await expect(homePage.loginInUser).not.toBeVisible();
    });
  });
  test("AE01-03: Login out success", async ({ loginPage, homePage }) => {
    await test.step("Fill login info", async () => {
      await loginPage.goto();
      await loginPage.login(ENV.userEmail, ENV.userPassword);
    });
    await test.step("Verify login success", async () => {
      await loginPage.page.waitForURL("/");
      await expect(homePage.loginInUser).toHaveText(`Logged in as ${ENV.userName}`);
    });
    await test.step("Logout", async () => {
      await homePage.clickLogout();
    });
    await test.step("Verify logout success", async () => {
      await expect(loginPage.page).toHaveURL(loginPage.url);
      await expect(homePage.loginInUser).not.toBeVisible();
    });
  });
})