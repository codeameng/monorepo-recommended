import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

import { defineESLintConfig } from '@/utils/index.ts';

import type { Config } from '@/types/index.ts';

export const createPerfectionistConfig = (typescriptAliases: {
  patterns: string[];
}): Config[] => {
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
         * Enforces consistent ordering of module contents.
         *
         * Consistently organized module contents improve code readability and maintainability
         * by providing a predictable structure that developers can easily navigate. This
         * standardization helps team members quickly locate specific functions, variables,
         * or classes within a module without having to scan the entire file. It reduces
         * cognitive load when working with large modules, minimizes merge conflicts when
         * multiple developers contribute to the same file, and creates a more professional
         * and polished codebase. By grouping related functionality together in a consistent
         * order, the code becomes more self-documenting and the module's purpose and structure
         * become immediately clear.
         *
         * @see https://perfectionist.dev/rules/sort-modules
         */
        'perfectionist/sort-modules': 'error',

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

        /**
         * Enforces consistent ordering of import statements.
         *
         * Well-ordered imports significantly improve code maintainability and readability by
         * creating a logical structure that developers can quickly scan and understand. This
         * organization reduces the time needed to locate specific imports and helps prevent
         * duplicate imports. Consistently ordered imports also minimize merge conflicts when
         * multiple developers add new dependencies to the same file. Additionally, grouping
         * imports by their source type (built-in, external, internal, etc.) creates a clear
         * visual hierarchy that reflects dependency relationships and improves the overall
         * architecture understanding.
         *
         * @see https://perfectionist.dev/rules/sort-imports
         */
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              value: {
                'global-alias': typescriptAliases.patterns,
              },
              type: {
                'global-alias-type': typescriptAliases.patterns,
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

        /**
         * Enforces consistent ordering of named imports within import statements.
         *
         * Properly sorted named imports significantly improve code navigation efficiency by
         * creating a predictable pattern that developers can quickly scan. This reduces the
         * cognitive effort required when working with modules that have numerous imports.
         * It also minimizes merge conflicts when multiple developers add new imports to the
         * same import statement, simplifies identifying duplicate imports during code reviews,
         * and creates visual consistency across the entire codebase. Well-organized imports
         * serve as implicit documentation, making the dependencies between modules more
         * immediately apparent.
         *
         * @see https://perfectionist.dev/rules/sort-named-imports
         */
        'perfectionist/sort-named-imports': 'error',
      },
    },
  ]);
};
