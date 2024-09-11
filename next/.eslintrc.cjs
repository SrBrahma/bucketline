// https://github.com/SrBrahma/eslint-config-gev
// This is a workaround for https://github.com/eslint/eslint/issues/3458
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint-config-gev/js", "plugin:valtio/recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "next/core-web-vitals",
        "next/typescript",
        "eslint-config-gev/react",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        ecmaVersion: 12,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
  ignorePatterns: ["/lib/**/*", "/dist/**/*"],
  rules: {},
}
