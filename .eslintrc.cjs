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
  plugins: ["@typescript-eslint", "no-relative-import-paths"],
  root: true,
  rules: {
    "import/order": "error",
    "import/no-default-export": "error",
    "no-relative-import-paths/no-relative-import-paths": "error",
    "playwright/no-conditional-in-test": "off",
  },
  overrides: [
    {
      files: ["src/pages/**/*", "src/pages/api/**/*"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
