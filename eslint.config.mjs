import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: {
      "no-undef": "error", // 🔴 Reports use of undefined variables
      "no-unused-vars": "warn", // 🟡 Warns about unused variables
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
      ...globals.node, // ✅ Add Node.js globals like `process`, `__dirname`, etc.
    },
  },
]);
