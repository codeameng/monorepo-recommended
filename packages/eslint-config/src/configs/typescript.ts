import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import typescriptEslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import { R } from '@packages/utils';

interface Options {
  tsconfigRootDir: string;
}
export const createTypescriptConfig = (options: Options): Config[] => {
  const { tsconfigRootDir } = options;

  return defineConfig([
    typescriptEslint.configs.strictTypeChecked,
    typescriptEslint.configs.stylisticTypeChecked,
    {
      name: 'disable-overridden-rules',
      rules: R.pipe(
        eslintJs.configs.all.rules,
        R.keys(),
        R.intersection(R.keys(typescriptEslint.plugin.rules ?? {})),
        R.mapToObj((ruleName) => [ruleName, 'off']),
      ),
    },
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      rules: {
        /**
         * Disables readonly parameter types requirement.
         *
         * Rationale: Improves developer experience (reduces type definition burden,
         * minimizes conflicts with third-party libraries), and is too restrictive
         * in practice, potentially leading to difficult-to-maintain code.
         *
         * @see https://typescript-eslint.io/rules/prefer-readonly-parameter-types
         */
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',

        /**
         * Restricts the types allowed in boolean expressions.
         *
         * Benefits: Prevents subtle bugs from implicit type conversions,
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
         * Benefits: Avoids unintentional side effects from module imports,
         * supports isolated module transpilation, and helps transpilers
         * (like Babel/SWC/Vite) correctly identify and handle pure type imports.
         *
         * @see https://typescript-eslint.io/rules/consistent-type-imports
         */
        '@typescript-eslint/consistent-type-imports': 'error',

        /**
         * Enforces explicit return type declarations for functions.
         *
         * Benefits: Improves code readability and self-documentation, prevents
         * unintended type inference, ensures correctness (validates function implementation),
         * aids refactoring, and may improve TypeScript compiler performance.
         *
         * @see https://typescript-eslint.io/rules/explicit-function-return-type
         */
        '@typescript-eslint/explicit-function-return-type': 'error',

        /**
         * Enforces the use of top-level import type qualifier to avoid side effects.
         *
         * Benefits: When using the verbatimModuleSyntax compiler option, prevents inline type imports
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
         * Benefits: Improves code maintainability and readability by requiring developers
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
      },
    },
  ]);
};
