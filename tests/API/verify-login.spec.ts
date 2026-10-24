import { expect } from '@playwright/test';
import { test } from "../../src/fixtures/PageFixture.fixture"
import { ENV } from '../../src/config/env';
import { listUser } from '../../src/data/users';
import { VERIFY_LOGIN_API } from '../../src/config/path';
import { LoginResponse } from '../../src/data/response';

const data = {
  loginSuccess: "User exists!",
  loginInvalidPass: "User not found!",
  loginMisingParam: "Bad request, email or password parameter is missing in POST request.",
  loginInvalidMethod: "This request method is not supported."
}

test.describe("Verify login API", async () => {
  test("AE01-04: Verify login API: Correct user", async ({ request }) => {
    const loginRes = await request.post(VERIFY_LOGIN_API, {
      form: {
        email: ENV.userEmail,
        password: ENV.userPassword,
      }
    });
    expect(loginRes.status()).toBe(200);
    const loginResData: LoginResponse = await loginRes.json();
    expect(loginResData.responseCode).toBe(200);
    expect(loginResData.message).toBe(data.loginSuccess)
  });

  test("AE01-05: Verify login API: Incorrect password", async ({ request }) => {
    const loginRes = await request.post(VERIFY_LOGIN_API, {
      form: {
        email: listUser.invalidPass.email,
        password: listUser.invalidPass.password,
      }
    });
    expect(loginRes.status()).toBe(200);
    const loginResData: LoginResponse = await loginRes.json();
    expect(loginResData.responseCode).toBe(404);
    expect(loginResData.message).toBe(data.loginInvalidPass);
  });

  test("AE01-06: Verify login API: Missing email", async ({ request }) => {
    const loginRes = await request.post(VERIFY_LOGIN_API, {
      form: {
        password: ENV.userPassword,
      }
    });
    expect(loginRes.status()).toBe(200);
    const loginResData: LoginResponse = await loginRes.json();
    expect(loginResData.responseCode).toBe(400);
    expect(loginResData.message).toBe(data.loginMisingParam);
  });

  test("AE01-07: Verify login API: Invalid method", async ({ request }) => {
    const loginRes = await request.delete(VERIFY_LOGIN_API);
    expect(loginRes.status()).toBe(200);
    const loginResData: LoginResponse = await loginRes.json();
    expect(loginResData.responseCode).toBe(405);
    expect(loginResData.message).toBe(data.loginInvalidMethod);
  })
})