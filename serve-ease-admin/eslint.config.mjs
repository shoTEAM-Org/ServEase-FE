import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "build/**",
      "coverage/**",
      "dist/**",
      "next-env.d.ts",
      "node_modules/**",
      "out/**",
      "src/imports/**",
      "tests/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["jest.config.js", "jest.setup.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },
  },
];

export default eslintConfig;
