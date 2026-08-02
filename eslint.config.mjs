// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated output — linting it produced ~450 phantom errors in minified bundles.
    "dist/**",
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"],
  {
    // `_`-prefixed names are the conventional "intentionally unused" marker, and
    // `{ image: _img, ...rest }` is how we strip keys from an object — both are
    // deliberate, not dead code.
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],
    },
  },
  {
    // Node CLI tooling — CommonJS is correct here, and the repo is not "type": "module".
    files: ["scripts/**/*.js"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  {
    // This is a published library, not a Next app. `next/image` is unavailable to
    // consumers — `next` is a devDependency — so plain <img> is the correct element
    // and this rule does not apply to shipped components or the Vite demo harness.
    files: ["components/**/*.tsx", "demo/**/*.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
]);

export default eslintConfig;
