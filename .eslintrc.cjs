/** @type { import("eslint").Linter.Config } */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:playwright/recommended",
    "next",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "import/order": "error",
    "playwright/no-conditional-in-test": "off",
  },
};
