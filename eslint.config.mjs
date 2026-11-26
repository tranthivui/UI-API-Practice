import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

export default tseslint.config(
  {
    ignores: ["node_modules/", "playwright-report/", "test-results/"],
  },
  {
    // Mọi file TS: src + tests + config
    files: ["**/*.ts"],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true,               // bật type-aware (đọc tsconfig.json)
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error", // quên await – cả trong Page Object
      "@typescript-eslint/no-unused-vars": "error",       // import/biến thừa
    },
  },
  {
    // Rule riêng cho test Playwright
    files: ["tests/**/*.ts"],
    extends: [playwright.configs["flat/recommended"]],
    rules: {
      "playwright/missing-playwright-await": "error",
      "playwright/no-wait-for-timeout": "error",
      "playwright/no-nth-methods": "error",
      "playwright/prefer-web-first-assertions": "error",
      "playwright/no-useless-await": "error",
      "playwright/consistent-spacing-between-blocks": "off", // chỉ là dòng trống, gây nhiễu
    },
  },
);