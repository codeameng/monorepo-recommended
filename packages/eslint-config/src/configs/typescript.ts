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
         * Enforces a consistent pattern for type imports.
         *
         * - Improves code organization and maintainability
         * - Enhances tree-shaking capabilities
         * - Creates a clear visual distinction between value and type imports
         *
         * @see https://typescript-eslint.io/rules/consistent-type-imports
         */
        '@typescript-eslint/consistent-type-imports': 'error',
        /**
         * Requires explicit return types on functions and class methods.
         * Forces developers to think about the types they're returning and serves as inline documentation.
         *
         * @see https://typescript-eslint.io/rules/explicit-function-return-type
         */
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ]);
};
