import { expect } from '@playwright/test';
import { test } from "../src/fixtures/PageFixture.fixture"
import { ENV } from '../src/config/env';
import { listUser } from '../src/data/users';
import { describe } from 'node:test';
import { request } from 'node:http';
import { LOGIN_URL } from '../src/config/path';
import { LoginResponse } from '../src/data/response';

const data = {
  incorrectPassMess: "Your email or password is incorrect!",
  loginSuccess: "User exists!",
  loginInvalidPass: "User not found!",
  loginMisingParam: "Bad request, email or password parameter is missing in POST request.",
  loginInvalidMethod: "This request method is not supported."
}

test.describe("Verify login UI", () => {
  test("TC-001: Verify login success", async ({ loginPage, homePage }) => {
    await test.step("Fill login info", async () => {
      await loginPage.goto();
      await loginPage.login(ENV.userEmail, ENV.userPassword);
    });
    await test.step("Verify login success", async () => {
      await loginPage.page.waitForURL("/");
      await expect(homePage.loginHead).toHaveText(`Logged in as ${ENV.userName}`);
      await expect(homePage.logoutLink).toBeVisible();
      await expect(loginPage.loginForm).not.toBeVisible();
    });
  })

  test("TC-002: Login with invalid password", async ({ loginPage, homePage }) => {
    await test.step("Fill login info", async () => {
      await loginPage.goto();
      await loginPage.login(listUser.invalidPass.username, listUser.invalidPass.password);
    });
    await test.step("Verify login fail", async () => {
      await expect(loginPage.errorMess).toHaveText(data.incorrectPassMess);
      await expect(loginPage.page).toHaveURL(loginPage.url);
      await expect(homePage.loginHead).not.toBeVisible();
    });
  });
  test("TC-003: Login out success", async ({ loginPage, homePage }) => {
    await test.step("Fill login info", async () => {
      await loginPage.goto();
      await loginPage.login(ENV.userEmail, ENV.userPassword);
    });
    await test.step("Verify login success", async () => {
      await loginPage.page.waitForURL("/");
      await expect(homePage.loginHead).toHaveText(`Logged in as ${ENV.userName}`);
    });
    await test.step("Logout", async () => {
      await homePage.clickLogout();
    });
    await test.step("Verify logout success", async () => {
      await expect(loginPage.page).toHaveURL(loginPage.url);
      await expect(homePage.loginHead).not.toBeVisible();
    });
  });
});

test.describe("Verify login API", async () => {
  test("Verify login API: Correct user", async ({ request }) => {
    const loginRes = await request.post(LOGIN_URL, {
      form: {
        email: ENV.userEmail,
        password: ENV.userPassword,
      }
    });
    const loginResData: LoginResponse = await loginRes.json();
    expect(loginRes.status()).toBe(200);
    expect(loginResData.responseCode).toBe(200);
    expect(loginResData.message).toContain(data.loginSuccess)
  });

  test("Verify login API: Incorrect password", async ({ request }) => {
    const loginRes = await request.post(LOGIN_URL, {
      form: {
        email: listUser.invalidPass.username,
        password: listUser.invalidPass.password,
      }
    });
    const loginResData: LoginResponse = await loginRes.json();
    expect(loginRes.status()).toBe(200);
    expect(loginResData.responseCode).toBe(404);
    expect(loginResData.message).toContain(data.loginInvalidPass);
  });

  test("Verify login API: Missing email", async ({ request }) => {
    const loginRes = await request.post(LOGIN_URL, {
      form: {
        password: ENV.userPassword,
      }
    });
    const loginResData: LoginResponse = await loginRes.json();
    expect(loginRes.status()).toBe(200);
    expect(loginResData.responseCode).toBe(400);
    expect(loginResData.message).toContain(data.loginMisingParam);
  });

  test("Verify login API: Invalid method", async ({ request }) => {
    const loginRes = await request.delete(LOGIN_URL, {
      form: {
        email: listUser.invalidPass.username,
        password: listUser.invalidPass.password,
      }
    });
    const loginResData: LoginResponse = await loginRes.json();
    expect(loginRes.status()).toBe(200);
    expect(loginResData.responseCode).toBe(405);
    expect(loginResData.message).toContain(data.loginInvalidMethod);
  });

})