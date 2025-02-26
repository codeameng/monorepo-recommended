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
      },
    },
  ]);
};
