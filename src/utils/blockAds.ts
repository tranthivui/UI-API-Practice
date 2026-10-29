import { Page } from "@playwright/test";
const AD_DOMAINS=/googlesyndication\.com|cloudflareinsights\.com|doubleclick\.net|adtrafficquality\.google|2mdn\.net|smartadserver\.com|fundingchoicesmessages\.google\.com/;

export async function blockAds(page:Page) {
    await page.route(AD_DOMAINS,route => route.abort());
}