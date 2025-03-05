import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import eslintPluginImportX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export const createImportXConfig = (typescriptProject: string[]): Config[] => {
  return defineConfig([
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            project: typescriptProject,
          }),
        ],
      },
      rules: {
        /**
         * Disallows the use of default exports in favor of named exports.
         *
         * Improves refactoring support by enabling tools to reliably track dependencies,
         * enhances code readability through self-documenting explicit exports,
         * provides better tree-shaking optimization for bundlers,
         * prevents naming ambiguities across different imports of the same component,
         * and strengthens type safety with more accurate TypeScript type inference.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-default-export.md
         */
        'import-x/no-default-export': 'error',

        /**
         * Disabled because we want to encourage named exports instead of default exports,
         * which aligns with our approach of enabling the no-default-export rule.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-export.md
         */
        'import-x/no-named-export': 'off',

        /**
         * Disabled because it contradicts our preference for named exports enforced by
         * the no-default-export rule above.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/prefer-default-export.md
         */
        'import-x/prefer-default-export': 'off',

        /**
         * Enforces the explicit use of file extensions in all import statements.
         *
         * Improved code clarity by making the exact file type immediately visible,
         * enhanced tooling compatibility across different environments, simplified debugging
         * by providing complete file paths, and better alignment with ESM standards
         * where extensions are often required.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
         */
        'import-x/extensions': ['error', 'always'],
      },
    },
  ]);
};
