import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import { configs, plugin } from 'typescript-eslint';
import eslintJs from '@eslint/js';
import { R } from '@packages/utils';

export const createTypescriptConfig = (tsconfigRootDir: string): Config[] => {
  return defineConfig([
    configs.strictTypeChecked,
    configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
    {
      rules: R.pipe(
        eslintJs.configs.all.rules,
        R.keys(),
        R.intersection(R.keys(plugin.rules ?? {})),
        R.mapToObj((ruleName) => [ruleName, 'off']),
      ),
    },
    {
      rules: {
        /**
         * Disables readonly parameter types requirement.
         *
         * Improves developer experience (reduces type definition burden,
         * minimizes conflicts with third-party libraries), and is too restrictive
         * in practice, potentially leading to difficult-to-maintain code.
         *
         * @see https://typescript-eslint.io/rules/prefer-readonly-parameter-types
         */
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',

        /**
         * Restricts the types allowed in boolean expressions.
         *
         * Prevents subtle bugs from implicit type conversions,
         * makes boolean conditions more explicit and readable, and encourages
         * proper null/undefined checking patterns.
         *
         * Configuration allows common TypeScript patterns while preventing dangerous
         * implicit conversions.
         *
         * @see https://typescript-eslint.io/rules/strict-boolean-expressions
         */
        '@typescript-eslint/strict-boolean-expressions': 'error',

        /**
         * Enforces consistent usage of type imports.
         *
         * Avoids unintentional side effects from module imports,
         * supports isolated module transpilation, and helps transpilers
         * (like Babel/SWC/Vite) correctly identify and handle pure type imports.
         *
         * @see https://typescript-eslint.io/rules/consistent-type-imports
         */
        '@typescript-eslint/consistent-type-imports': 'error',

        /**
         * Enforces explicit return type declarations for functions.
         *
         * Improves code readability and self-documentation, prevents
         * unintended type inference, ensures correctness (validates function implementation),
         * aids refactoring, and may improve TypeScript compiler performance.
         *
         * @see https://typescript-eslint.io/rules/explicit-function-return-type
         */
        '@typescript-eslint/explicit-function-return-type': 'error',

        /**
         * Enforces the use of top-level import type qualifier to avoid side effects.
         *
         * When using the verbatimModuleSyntax compiler option, prevents inline type imports
         * from generating unnecessary empty imports (e.g., import {} from 'mod'). This avoids
         * unintended side effects such as: module execution at runtime, increased bundle size,
         * potential circular dependencies, and slower application startup. Ensures type-only
         * imports are completely removed during compilation, keeping build output clean and minimal.
         *
         * @see https://typescript-eslint.io/rules/no-import-type-side-effects
         */
        '@typescript-eslint/no-import-type-side-effects': 'error',

        /**
         * Prohibits the use of magic numbers (unnamed numeric literals) in code.
         *
         * Improves code maintainability and readability by requiring developers
         * to declare named constants for numeric values, making their purpose explicit.
         * Prevents confusion about the meaning of arbitrary numbers and reduces errors when
         * values need to be changed.
         *
         * @see https://typescript-eslint.io/rules/no-magic-numbers
         */
        '@typescript-eslint/no-magic-numbers': [
          'error',
          {
            ignore: [-1, 0, 1],
          },
        ],

        /**
         * Enforces consistent naming conventions across the codebase.
         *
         * Consistent naming patterns significantly improve code readability
         * and maintainability by making code more predictable. Proper naming conventions
         * help developers quickly understand the purpose and behavior of different code
         * elements, reduce cognitive load when reading code, and prevent confusion about
         * the nature or intent of variables, functions, and other identifiers.
         *
         * @see https://typescript-eslint.io/rules/naming-convention
         */
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
          },
          {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
          },
          {
            selector: 'variable',
            types: ['boolean'],
            modifiers: ['destructured'],
            format: null,
          },
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          },
          {
            selector: 'objectLiteralProperty',
            modifiers: ['requiresQuotes'],
            format: null,
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
      },
    },
  ]);
};
