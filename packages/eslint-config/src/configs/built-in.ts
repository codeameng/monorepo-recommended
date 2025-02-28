import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import eslintJs from '@eslint/js';

export const createBuiltInConfig = (): Config[] =>
  defineConfig([
    eslintJs.configs.recommended,
    {
      rules: {
        /**
         * Disables the restriction on using the continue statement.
         *
         * Benefits: Improves code readability (clearer "early skip" logic, reduces nesting),
         * simplifies control flow management, and often leads to more maintainable code
         * compared to alternatives like flags or nested conditionals.
         *
         * @see https://eslint.org/docs/latest/rules/no-continue
         */
        'no-continue': 'off',
        /**
         * Configures the maximum number of statements allowed in a function.
         *
         * Benefits: Manages function complexity, encourages breaking down logic into
         * smaller functions, improves maintainability, and helps adhere to the
         * single responsibility principle.
         *
         * @see https://eslint.org/docs/latest/rules/max-statements
         */
        'max-statements': ['error', 10],
        /**
         * Enforces one variable declaration per statement.
         *
         * Benefits: Improves code clarity, simplifies debugging and maintenance,
         * and better aligns with TypeScript's type declaration syntax.
         *
         * @see https://eslint.org/docs/latest/rules/one-var
         */
        'one-var': ['error', 'never'],
        /**
         * Enforces the use of function expressions instead of function declarations.
         *
         * Benefits: Creates consistency in function definitions, aligns with modern
         * JavaScript practices, and avoids function hoisting which can lead to
         * confusing behavior.
         *
         * @see https://eslint.org/docs/latest/rules/func-style
         */
        'func-style': ['error', 'expression'],
        /**
         * Disables the restriction on using ternary operators.
         *
         * Benefits: Enables concise conditional expressions, aligns with modern
         * JavaScript idioms, and improves code readability when used appropriately.
         *
         * @see https://eslint.org/docs/latest/rules/no-ternary
         */
        'no-ternary': 'off',
        /**
         * Enforces concise arrow function syntax using 'as-needed' approach.
         *
         * Benefits: Improves code readability by requiring braces only when necessary,
         * encourages functional programming patterns with concise expressions, and
         * maintains consistency in arrow function syntax across the codebase.
         *
         * @see https://eslint.org/docs/latest/rules/arrow-body-style
         */
        'arrow-body-style': ['error', 'as-needed'],
        /**
         * Sets a reasonable maximum length for functions.
         *
         * Benefits: Encourages better code organization, reduces cognitive load,
         * and strikes a practical balance that allows meaningful implementation
         * without forcing artificial function splitting.
         *
         * @see https://eslint.org/docs/latest/rules/max-lines-per-function
         */
        'max-lines-per-function': [
          'error',
          {
            max: 50,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
          },
        ],
        /**
         * Allows the use of undefined as a variable or property.
         *
         * Rationale: Undefined is fundamental to TypeScript's type system and modern
         * JavaScript practices. Restricting it creates artificial limitations and
         * forces unnecessarily verbose alternative patterns.
         *
         * @see https://eslint.org/docs/latest/rules/no-undefined
         */
        'no-undefined': 'off',
        /**
         * Disables ESLint warning comments checking in favor of dedicated tools.
         *
         * Rationale: Warning comments (TODO, FIXME) are better managed by specialized
         * tools that provide better tracking and management features.
         *
         * @see https://eslint.org/docs/latest/rules/no-warning-comments
         */
        'no-warning-comments': 'off',
        /**
         * Enforces capitalization of the first letter in block comments while ignoring all line comments.
         *
         * Benefits: Maintains professionalism and consistency in documentation blocks
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
      },
    },
  ]);
