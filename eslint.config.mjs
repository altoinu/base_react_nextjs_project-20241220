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
  {
    // for jest test files
    // files: [
    //   "**/*.{spec,test}.{js,cjs,mjs,jsx,ts,tsx}",
    //   "**/__tests__/**/*.{js,cjs,mjs,jsx,ts,tsx}",
    // ],
    files: [
      "**/*.{spec,test}.?(c|m)[jt]s?(x)",
      "**/__tests__/**/*.?(c|m)[jt]s?(x)",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        fetchMock: "readonly",
      },
    },
  },
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
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  eslintPluginJest.configs["flat/recommended"],
  eslintPluginJestDom.configs["flat/recommended"],
  eslintConfigPrettier,
];

export default eslintConfig;
