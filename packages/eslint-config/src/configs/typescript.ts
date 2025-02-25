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
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
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
      rules: {
        /**
         * Disables the enforcement of readonly types for function parameters.
         *
         * - The rule is overly restrictive and requires excessive type annotations
         * - Poor compatibility with type definitions from third-party libraries
         * - Adds unnecessary complexity to the codebase and slows down development
         *
         * @see https://typescript-eslint.io/rules/prefer-readonly-parameter-types
         */
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        /**
         * Enforces consistent pattern for type imports.
         *
         * - Avoiding Unintentional Side Effects:
         *   - Some modules may cause side effects when imported (e.g., network requests, DOM operations)
         *   - Using type imports ensures these modules won't execute when only types are needed
         *   - Helps control module loading order
         *
         * - Supporting Isolated Module Transpilation:
         *   - Helps transpilers like Babel/SWC/Vite identify pure type imports
         *   - Enables transpilers to correctly remove imports used only for type checking
         *   - Optimizes final production code size
         *
         * @see https://typescript-eslint.io/rules/consistent-type-imports
         */
        '@typescript-eslint/consistent-type-imports': 'error',
        /**
         * Requires explicit return types on functions and class methods.
         *
         * - Improves code maintainability and self-documentation
         * - Prevents accidental type changes during refactoring
         * - Makes function signatures more predictable
         * - Helps catch type-related bugs early in development
         *
         * @see https://typescript-eslint.io/rules/explicit-function-return-type
         */
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ]);
};
