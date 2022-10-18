/* eslint-disable no-undef */
/** @type {import("prettier").Plugin}  */

module.exports = {
  tabWidth: 2,
  useTabs: false,
  arrowParens: "always",
  bracketSpacing: true,
  trailingComma: "none",
  semi: false,
  proseWrap: "always",
  printWidth: 100,
  jsxSingleQuote: true,
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}
