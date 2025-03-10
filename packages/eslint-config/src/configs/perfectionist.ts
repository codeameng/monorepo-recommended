import type { Config } from '$types/index.ts';
import { defineESLintConfig } from '$utils/index.ts';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

export const createPerfectionistConfig = (): Config[] => {
  return defineESLintConfig([
    {
      plugins: {
        perfectionist: eslintPluginPerfectionist,
      },
      settings: {
        perfectionist: {
          type: 'natural',
          ignoreCase: false,
        },
      },
    },
    {
      rules: {
        'sort-imports': 'off',
        'import-x/order': 'off',
      },
    },
    {
      rules: {
        /**
         * Enforces consistent ordering of named exports.
         *
         * Consistently organized named exports improve code readability and maintainability
         * by making exports easier to scan, understand, and locate. This reduces cognitive load
         * when working with modules and helps team members quickly identify available exports
         * without needing to parse the entire file.
         *
         * @see https://perfectionist.dev/rules/sort-named-exports
         */
        'perfectionist/sort-named-exports': 'error',
      },
    },
  ]);
};
