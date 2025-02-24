import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import eslintJs from '@eslint/js';

export const createBuiltInConfig = (): Config[] => {
  return defineConfig([
    eslintJs.configs.recommended,
    {
      rules: {
        /**
         * Disables the restriction on using 'continue' statements in loops.
         *
         * - Allows early exits from loop iterations
         * - Reduces code nesting and complexity
         * - Can improve readability in certain scenarios
         *
         * @see https://eslint.org/docs/rules/no-continue
         */
        'no-continue': 'off',
        /**
         * Enforces a maximum number of statements allowed in a function.
         *
         * - Ensures functions remain focused and single-purpose
         * - Improves code maintainability
         * - Encourages function decomposition
         *
         * @see https://eslint.org/docs/rules/max-statements
         */
        'max-statements': 'error',
        /**
         * Requires each variable to be declared in a separate statement.
         *
         * - Improves code readability
         * - Makes variable declarations easier to maintain
         * - Prevents confusion with comma operator
         * - Simplifies version control diffs
         *
         * @see https://eslint.org/docs/rules/one-var
         */
        'one-var': ['error', 'never'],
        /**
         * Enforces the use of function expressions over function declarations.
         *
         * - Provides consistent function definition style
         * - Avoids hoisting-related bugs
         * - Encourages treating functions as first-class values
         * - Better supports functional programming patterns
         *
         * @see https://eslint.org/docs/rules/func-style
         */
        'func-style': 'error',
        /**
         * Disables the restriction on using ternary operators.
         *
         * - Ternary operators can improve code conciseness
         * - Useful for simple conditional expressions
         * - Common in modern JavaScript/TypeScript codebases
         * - Enhances readability when used appropriately
         *
         * @see https://eslint.org/docs/rules/no-ternary
         */
        'no-ternary': 'off',
      },
    },
  ]);
};
