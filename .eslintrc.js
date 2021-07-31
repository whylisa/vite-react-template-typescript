module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "arrow-body-style": 0,
    "jsx-a11y/label-has-for": 0,
    "max-lines-per-function": [
      2,
      { max: 320, skipComments: true, skipBlankLines: true },
    ],
    "no-confusing-arrow": 0,
    "no-nested-ternary": 0,
    "no-console": 2,
    "no-param-reassign": [
      2,
      { props: true, ignorePropertyModificationsFor: ["draft"] },
    ],
    "react/no-this-in-sfc": 0,
  },
};
