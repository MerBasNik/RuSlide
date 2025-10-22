import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        extends: [js.configs.recommended, prettierConfig],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
    },

    ...tseslint.configs.recommended,

    {
        files: ["**/*.{jsx,tsx}"],
        plugins: {
            react: pluginReact,
            prettier: prettierPlugin,
            "react-hooks": reactHooks,
        },
        rules: {
            ...pluginReact.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "prettier/prettier": "error",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },

    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "prefer-const": "error",
        },
    },
]);
