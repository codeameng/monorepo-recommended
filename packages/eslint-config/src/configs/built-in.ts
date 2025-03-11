import eslintJs from '@eslint/js';

import { defineESLintConfig } from '@/utils/index.ts';

import type { Config } from '@/types/index.ts';

export const createBuiltInConfig = (): Config[] => {
  return defineESLintConfig([
    eslintJs.configs.recommended,
    {
      rules: {
        /**
         * Disables the restriction on using the continue statement.
         *
         * Improves code readability (clearer "early skip" logic, reduces nesting),
         * simplifies control flow management, and often leads to more maintainable code
         * compared to alternatives like flags or nested conditionals.
         *
         * @see https://eslint.org/docs/latest/rules/no-continue
         */
        'no-continue': 'off',

        /**
         * Configures the maximum number of statements allowed in a function.
         *
         * Manages function complexity, encourages breaking down logic into
         * smaller functions, improves maintainability, and helps adhere to the
         * single responsibility principle.
         *
         * @see https://eslint.org/docs/latest/rules/max-statements
         */
        'max-statements': [
          'error',
          {
            max: 16,
          },
        ],

        /**
         * Enforces one variable declaration per statement.
         *
         * Improves code clarity, simplifies debugging and maintenance,
         * and better aligns with TypeScript's type declaration syntax.
         *
         * @see https://eslint.org/docs/latest/rules/one-var
         */
        'one-var': ['error', 'never'],

        /**
         * Enforces the use of function expressions instead of function declarations.
         *
         * Creates consistency in function definitions, aligns with modern
         * JavaScript practices, and avoids function hoisting which can lead to
         * confusing behavior.
         *
         * @see https://eslint.org/docs/latest/rules/func-style
         */
        'func-style': ['error', 'expression'],

        /**
         * Disables the restriction on using ternary operators.
         *
         * Enables concise conditional expressions, aligns with modern
         * JavaScript idioms, and improves code readability when used appropriately.
         *
         * @see https://eslint.org/docs/latest/rules/no-ternary
         */
        'no-ternary': 'off',

        /**
         * Disables the enforcement of consistent use of braces around arrow function bodies.
         *
         * Allows developers to decide when to use braces based on context and team preferences,
         * supporting both concise expressions without braces and more complex implementations with braces.
         * This flexibility enables more natural coding styles while maintaining readability.
         *
         * @see https://eslint.org/docs/latest/rules/arrow-body-style
         */
        'arrow-body-style': 'off',

        /**
         * Sets a reasonable maximum length for functions.
         *
         * Encourages better code organization, reduces cognitive load,
         * and strikes a practical balance that allows meaningful implementation
         * without forcing artificial function splitting.
         *
         * @see https://eslint.org/docs/latest/rules/max-lines-per-function
         */
        'max-lines-per-function': [
          'error',
          {
            max: 128,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
          },
        ],

        /**
         * Allows the use of undefined as a variable or property.
         *
         * Undefined is fundamental to TypeScript's type system and modern
         * JavaScript practices. Restricting it creates artificial limitations and
         * forces unnecessarily verbose alternative patterns.
         *
         * @see https://eslint.org/docs/latest/rules/no-undefined
         */
        'no-undefined': 'off',

        /**
         * Disables ESLint warning comments checking in favor of dedicated tools.
         *
         * Warning comments (TODO, FIXME) are better managed by specialized
         * tools that provide better tracking and management features.
         *
         * @see https://eslint.org/docs/latest/rules/no-warning-comments
         */
        'no-warning-comments': 'off',

        /**
         * Enforces curly braces for all control statements (if, else, for, while, do).
         *
         * Benefits:
         * - Defensive Programming: Prevents bugs from forgetting to add braces when
         *   adding new lines to previously single-line statements
         * - Code Consistency: Maintains uniform formatting across all control structures,
         *   eliminating the need to decide between single-line and multi-line styles
         * - Maintainability: No structural changes needed when expanding conditional
         *   blocks, easier code reviews due to consistent formatting
         *
         * @see https://eslint.org/docs/latest/rules/curly
         */
        'curly': ['error', 'all'],

        /**
         * Enforces capitalization of the first letter in block comments while ignoring all line comments.
         *
         * Maintains professionalism and consistency in documentation blocks
         * where formal documentation is important, while allowing flexibility in quick
         * line comments for development notes, debugging, and inline explanations without
         * disrupting developer workflow.
         *
         * @see https://eslint.org/docs/latest/rules/capitalized-comments
         */
        'capitalized-comments': [
          'error',
          'always',
          {
            block: {},
            line: {
              ignorePattern: '.*',
            },
          },
        ],

        /**
         * Enforces a minimum and/or maximum identifier length.
         *
         * Disabled in this configuration as overly restrictive identifier length limits can
         * reduce code readability and expressiveness. Teams should establish their own
         * conventions for identifier naming based on their specific context rather than
         * enforcing arbitrary length constraints.
         *
         * @see https://eslint.org/docs/latest/rules/id-length
         */
        'id-length': 'off',
      },
    },
  ]);
};
