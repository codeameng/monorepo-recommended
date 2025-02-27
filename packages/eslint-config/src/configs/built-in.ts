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
         * @see https://eslint.org/docs/rules/no-continue
         */
        'no-continue': 'off',
        /**
         * Configures the maximum number of statements allowed in a function.
         *
         * Benefits: Manages function complexity, encourages breaking down logic into
         * smaller functions, improves maintainability, and helps adhere to the
         * single responsibility principle.
         *
         * @see https://eslint.org/docs/rules/max-statements
         */
        'max-statements': ['error', 10],
        /**
         * Enforces one variable declaration per statement.
         *
         * Benefits: Improves code clarity, simplifies debugging and maintenance,
         * and better aligns with TypeScript's type declaration syntax.
         *
         * @see https://eslint.org/docs/rules/one-var
         */
        'one-var': ['error', 'never'],
        /**
         * Enforces the use of function expressions instead of function declarations.
         *
         * Benefits: Creates consistency in function definitions, aligns with modern
         * JavaScript practices, and avoids function hoisting which can lead to
         * confusing behavior.
         *
         * @see https://eslint.org/docs/rules/func-style
         */
        'func-style': ['error', 'expression'],
        /**
         * Disables the restriction on using ternary operators.
         *
         * Benefits: Enables concise conditional expressions, aligns with modern
         * JavaScript idioms, and improves code readability when used appropriately.
         *
         * @see https://eslint.org/docs/rules/no-ternary
         */
        'no-ternary': 'off',
        /**
         * Enforces concise arrow function syntax using 'as-needed' approach.
         *
         * Benefits: Improves code readability by requiring braces only when necessary,
         * encourages functional programming patterns with concise expressions, and
         * maintains consistency in arrow function syntax across the codebase.
         *
         * @see https://eslint.org/docs/rules/arrow-body-style
         */
        'arrow-body-style': ['error', 'as-needed'],
        /**
         * Disables the maximum length restriction for functions.
         *
         * Rationale: While disabling line-based function length restrictions, we still encourage
         * appropriate function decomposition. Functions should be split based on logical cohesion
         * rather than simple line count. This goal is better achieved through other more appropriate
         * rules such as complexity, max-depth, etc. This approach more effectively promotes
         * code quality while avoiding readability issues that might arise from artificial
         * line-count-based function splitting.
         *
         * @see https://eslint.org/docs/rules/max-lines-per-function
         */
        'max-lines-per-function': 'off',
        /**
         * Allows the use of undefined as a variable or property.
         *
         * Rationale: Undefined is fundamental to TypeScript's type system and modern
         * JavaScript practices. Restricting it creates artificial limitations and
         * forces unnecessarily verbose alternative patterns.
         *
         * @see https://eslint.org/docs/rules/no-undefined
         */
        'no-undefined': 'off',
        /**
         * Disables ESLint warning comments checking in favor of dedicated tools.
         *
         * Rationale: Warning comments (TODO, FIXME) are better managed by specialized
         * tools that provide better tracking and management features.
         *
         * @see https://eslint.org/docs/rules/no-warning-comments
         */
        'no-warning-comments': 'off',
        /**
         * Disables the requirement for comments to start with uppercase letters.
         *
         * Rationale: While consistent comment formatting has value, enforcing capitalization
         * can reduce developers' willingness to write comments. The quality and presence of
         * comments is more important than their format.
         *
         * @see https://eslint.org/docs/rules/capitalized-comments
         */
        'capitalized-comments': 'off',
      },
    },
  ]);
