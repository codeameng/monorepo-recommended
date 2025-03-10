import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

import { defineESLintConfig } from '$utils/index.ts';

import type { Config } from '$types/index.ts';

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

        /**
         * Disables automatic sorting of module declarations.
         *
         * While organizing modules can be beneficial, automatic module sorting may
         * interfere with intentional module ordering that serves specific purposes,
         * such as dependency initialization order or custom organizational patterns
         * established by the team. Preserving manual control over module ordering
         * allows developers to express architectural intent and maintain critical
         * execution sequences when necessary.
         *
         * @see https://perfectionist.dev/rules/sort-modules
         */
        'perfectionist/sort-modules': 'off',

        /**
         * Enforces consistent ordering of interface properties.
         *
         * Consistently ordered interface properties improve code readability and maintainability
         * by creating a predictable structure that developers can quickly scan and comprehend.
         * This standardization reduces cognitive load when working with complex interfaces and
         * makes it easier to identify missing or duplicate properties during code reviews.
         * It also helps prevent merge conflicts when multiple developers add properties to the
         * same interface.
         *
         * @see https://perfectionist.dev/rules/sort-interfaces
         */
        'perfectionist/sort-interfaces': 'error',

        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              value: {
                'global-alias': String.raw`^\$.*$`,
              },
              type: {
                'global-alias-type': String.raw`^\$.*$`,
              },
            },
            groups: [
              'builtin',
              'builtin-type',
              'external',
              'external-type',
              'internal',
              'internal-type',
              'global-alias',
              'global-alias-type',
              'parent',
              'parent-type',
              'sibling',
              'sibling-type',
              'index',
              'index-type',
              'object',
              'style',
              'side-effect',
              'side-effect-style',
              'unknown',
            ],
          },
        ],
      },
    },
  ]);
};
