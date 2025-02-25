import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import eslintJs from '@eslint/js';

export const createBuiltInConfig = (): Config[] => {
  return defineConfig([
    eslintJs.configs.recommended,
    {
      rules: {
        /**
         * Disables the restriction on using the continue statement.
         *
         * - Code Readability:
         *   - Allows for clearer expression of "early skip" logic in loops
         *   - Reduces nesting levels in complex conditional blocks
         *   - Improves scan-ability by highlighting exceptional cases first
         *
         * - Control Flow Management:
         *   - Provides a straightforward way to skip iterations
         *   - Reduces cognitive load when handling exception cases
         *   - Allows for more linear code execution paths
         *
         * - Practical Considerations:
         *   - Forcing alternatives often leads to more complex code
         *   - Using flags or nested conditionals as alternatives can be error-prone
         *   - Well-placed continue statements can enhance code maintainability
         *
         * @see https://eslint.org/docs/latest/rules/no-continue
         */
        'no-continue': 'off',
        /**
         * Configures a higher limit for the maximum number of statements allowed in a function.
         *
         * - Function Complexity Management:
         *   - Allows more complex functions when appropriate
         *   - Prevents arbitrary splitting of cohesive logic
         *   - Recognizes that some complex algorithms require more statements
         *
         * - Developer Experience:
         *   - Avoids forcing artificial function boundaries
         *   - Reduces refactoring overhead for reasonable function sizes
         *   - Permits domain-specific complexity when necessary
         *
         * - Practical Considerations:
         *   - Some operations naturally require more statements to implement clearly
         *   - Function length alone is not always indicative of poor code quality
         *   - Other metrics like cyclomatic complexity often better indicate maintainability
         *
         * @see https://eslint.org/docs/latest/rules/max-statements
         */
        'max-statements': ['error', 16],
        /**
         * Enforces one variable declaration per statement.
         *
         * - Code Clarity:
         *   - Improves readability by giving each variable its own line
         *   - Makes code review more straightforward
         *   - Prevents confusion with complex initialization patterns
         *
         * - Debugging and Maintenance:
         *   - Easier to add or remove individual variables
         *   - Simplifies debugging by isolating variable declarations
         *   - Reduces merge conflicts in version control
         *
         * - TypeScript Integration:
         *   - Better aligns with TypeScript's type declaration syntax
         *   - Makes type annotations more readable
         *   - Consistent with modern JavaScript best practices
         *
         * @see https://eslint.org/docs/latest/rules/one-var
         */
        'one-var': ['error', 'never'],
        /**
         * Enforces the use of function expressions instead of function declarations.
         *
         * - Consistency and Predictability:
         *   - Creates a uniform approach to function definitions
         *   - Prevents mixing different function styles within the codebase
         *   - Establishes clear patterns for code organization
         *
         * - Modern JavaScript Practices:
         *   - Aligns with functional programming paradigms
         *   - Works better with TypeScript's type system for complex functions
         *   - Encourages the use of arrow functions for concise expressions
         *
         * - Scoping Benefits:
         *   - Avoids function hoisting which can lead to confusing behavior
         *   - Treats functions like other variables with consistent scoping rules
         *   - Reduces potential for temporal dead zone issues
         *
         * @see https://eslint.org/docs/latest/rules/func-style
         */
        'func-style': ['error', 'expression'],
        /**
         * Disables the restriction on using ternary operators.
         *
         * - Code Conciseness:
         *   - Enables compact, expressive conditional assignments
         *   - Reduces boilerplate for simple conditional logic
         *   - Can lead to more declarative code patterns
         *
         * - Modern JavaScript Idioms:
         *   - Ternary operators are a standard part of modern JS/TS development
         *   - Common in React and other declarative frameworks
         *   - Used extensively in functional programming patterns
         *
         * - Developer Experience:
         *   - Well-understood by most developers
         *   - Particularly useful in TypeScript for conditional types
         *   - When used appropriately, improves code readability
         *
         * @see https://eslint.org/docs/latest/rules/no-ternary
         */
        'no-ternary': 'off',
        /**
         * Sets a reasonable maximum length for functions.
         *
         * - Code Organization:
         *   - Encourages breaking large functions into smaller, focused units
         *   - Promotes single responsibility principle
         *   - Improves overall code structure and organization
         *
         * - Cognitive Load Management:
         *   - Limits the amount of logic a developer needs to understand at once
         *   - Makes functions easier to reason about and debug
         *   - Enhances maintainability of the codebase
         *
         * - Practical Balance:
         *   - Allows enough lines for meaningful implementation
         *   - Not so restrictive as to force artificial function splitting
         *   - Accommodates proper error handling and documentation
         *
         * @see https://eslint.org/docs/latest/rules/max-lines-per-function
         */
        'max-lines-per-function': [
          'error',
          {
            max: 64,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
          },
        ],
        /**
         * Allows the use of undefined as a variable or property.
         *
         * - TypeScript Integration:
         *   - undefined is a fundamental concept in TypeScript's type system
         *   - Used extensively with optional parameters and properties
         *   - Essential for nullable and optional type handling
         *
         * - Modern JavaScript Practices:
         *   - undefined is a standard primitive value in JavaScript
         *   - Commonly used to represent uninitialized state
         *   - Essential for optional chaining and nullish coalescing
         *
         * - Practical Considerations:
         *   - Restricting undefined creates artificial limitations
         *   - Forces unnecessarily verbose alternative patterns
         *   - TypeScript's type system already provides safety around undefined
         *
         * @see https://eslint.org/docs/latest/rules/no-undefined
         */
        'no-undefined': 'off',
        /**
         * Disables ESLint warning comments checking in favor of dedicated tools.
         *
         * - Rationale:
         *   - Warning comments (TODO, FIXME) are better managed by specialized tools
         *   - Dedicated tools provide better tracking and management features
         *   - Avoids duplicate functionality with task management systems
         *   - Allows more flexible and customized warning comment workflows
         *
         * @see https://eslint.org/docs/latest/rules/no-warning-comments
         */
        'no-warning-comments': 'off',
      },
    },
  ]);
};
