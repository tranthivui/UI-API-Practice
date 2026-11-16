import { Page } from "@playwright/test";

export async function getToken(page: Page, keyName: string): Promise<string | null> {
    const token = await page.evaluate((key) => {
        return localStorage.getItem(key);
    }, keyName);
    return token;
}