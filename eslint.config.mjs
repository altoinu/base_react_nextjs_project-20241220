import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginJest from "eslint-plugin-jest";
import eslintPluginJestDom from "eslint-plugin-jest-dom";
import pluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Next.js & React Hooks baseline configs (broad compatibility layers)
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: eslintPluginReactHooks.configs.recommended.rules,
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // 2. Global Base Rule Configs (Broad plugins applied to the entire project)
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],

  // 3. General Application Code (Broad file-matching environment defaults)
  {
    // for other non test files
    // files: ["**/*.{js,cjs,mjs,jsx,ts,tsx}"],
    files: ["**/*.?(c|m)[jt]s?(x)"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },

  // 4. Specialized Test-Specific Overrides (Narrow file-matching configs)
  // Placing these after ensures they safely layer test environments and rules on top of the browser environment
  {
    // for jest test files
    // files: [
    //   "**/*.{spec,test}.{js,cjs,mjs,jsx,ts,tsx}",
    //   "**/__tests__/**/*.{js,cjs,mjs,jsx,ts,tsx}",
    // ],
    files: ["**/*.{spec,test}.?(c|m)[jt]s?(x)", "**/__tests__/**/*.?(c|m)[jt]s?(x)"],
    plugins: {
      jest: eslintPluginJest,
      "jest-dom": eslintPluginJestDom, // Add your jest-dom plugin here
    },
    languageOptions: {
      globals: {
        ...globals.jest,
        fetchMock: "readonly",
      },
    },
    rules: {
      ...eslintPluginJest.configs["flat/recommended"].rules,
      ...eslintPluginJestDom.configs["flat/recommended"].rules, // Pull the jest-dom rules right inside!
    },
  },

  // 5. Prettier (Must be the last config to override and turn off stylistic rules)
  eslintConfigPrettier,
];

export default eslintConfig;
