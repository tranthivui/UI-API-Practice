import { mergeTests } from "@playwright/test";
import {test as pageTest} from "./PageFixture.fixture"
import {apiTest} from "./ApiFixture.fixture";
export const test=mergeTests(pageTest,apiTest);
export {expect} from "@playwright/test";

