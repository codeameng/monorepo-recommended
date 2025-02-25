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
         * Disables the requirement for readonly parameter types.
         *
         * - Developer Experience:
         *   - Reduces type definition burden
         *   - Minimizes type conflicts with third-party libraries
         *   - Avoids excessive type assertions and conversions
         *
         * - Practical Considerations:
         *   - Theoretically sound but too restrictive in practice
         *   - Not worth enforcing in most projects
         *   - Can lead to verbose and difficult-to-maintain code
         *
         * @see https://typescript-eslint.io/rules/prefer-readonly-parameter-types
         */
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        /**
         * Enforces consistent usage of type imports.
         *
         * - Avoiding Unintentional Side Effects:
         *   - Some modules may cause side effects when imported (e.g., network requests, DOM operations)
         *   - Using type imports ensures these modules won't execute when only types are needed
         *   - Helps control module loading order
         *
         * - Supporting Isolated Module Transpilation:
         *   - Helps transpilers like Babel/SWC/Vite identify pure type imports
         *   - Enables transpilers to correctly remove imports used only for type checking
         *   - Necessary for transpilers that don't have access to TypeScript's type system
         *
         * @see https://typescript-eslint.io/rules/consistent-type-imports
         */
        '@typescript-eslint/consistent-type-imports': 'error',
        /**
         * Enforces explicit return type declarations for functions.
         *
         * - Documentation:
         *   - Makes return types visible in code reviews without hovering
         *   - Provides better self-documentation directly in the code
         *   - Improves code maintainability and readability
         *
         * - Prevents Unintended Inferred Types:
         *   - Avoids unnecessarily complex inferred types
         *   - Ensures intended return types are used rather than compiler inference
         *
         * - Ensures Correctness:
         *   - Implements a contract that validates the function implementation
         *   - Catches missing return statements or incorrect return values
         *   - Alerts errors at the source rather than where the return value is used
         *
         * - Aids Refactoring:
         *   - Helps maintain consistent return types during implementation changes
         *   - Guides refactoring by immediately identifying type mismatches
         *   - Provides better TypeScript guidance during large-scale changes
         *
         * - Improves Performance:
         *   - Can improve TypeScript compiler performance
         *   - Named types are more compact than inferred anonymous types
         *
         * @see https://typescript-eslint.io/rules/explicit-function-return-type
         */
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ]);
};
