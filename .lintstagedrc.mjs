import { relative } from "path";

const buildNextLintCommand = (filenames) => `next lint --fix --file ${filenames.map((f) => relative(process.cwd(), f)).join(" --file ")}`;

const lintstagedConfig = {
  // Target your source files for linting and formatting
  "*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}": [buildNextLintCommand, "prettier --write"],

  // Non-code files (like markdown or css) only need Prettier formatting, not next lint
  "*.{md,css}": ["prettier --write"],
};

export default lintstagedConfig;
