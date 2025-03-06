import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import eslintPluginImportX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { R } from '@packages/utils';
import { globby } from 'globby';
import path from 'path';
import { parseJsonConfigFileContent, readConfigFile, sys } from 'typescript';
import globToRegexp from 'glob-to-regexp';

interface ReadTypescriptAliasPatternsOptions {
  rootDirectory: string;
  typescriptProject: string[];
}

const readTypescriptAliasPatterns = async (
  options: ReadTypescriptAliasPatternsOptions,
): Promise<string[]> => {
  const { rootDirectory, typescriptProject } = options;

  const tsconfigFiles = await globby(typescriptProject, {
    cwd: rootDirectory,
    gitignore: true,
  });

  return R.flatMap(tsconfigFiles, (file) => {
    const configPath = path.join(rootDirectory, file);
    const configFile = readConfigFile(configPath, (path) => {
      return sys.readFile(path);
    });
    const parsedConfig = parseJsonConfigFileContent(
      configFile.config,
      sys,
      path.dirname(configPath),
    );

    return R.pipe(
      parsedConfig.options.paths ?? {},
      R.keys(),
      R.map((str) => {
        return globToRegexp(str).source;
      }),
    );
  });
};

interface CreateImportXConfigOptions {
  rootDirectory: string;
  typescriptProject: string[];
}

export const createImportXConfig = async (
  options: CreateImportXConfigOptions,
): Promise<Config[]> => {
  const { rootDirectory, typescriptProject } = options;

  const typescriptAliasPatterns = await readTypescriptAliasPatterns({
    rootDirectory,
    typescriptProject,
  });

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

        /**
         * Requires all exports to be grouped together in a single declaration or assignment.
         *
         * Improves code readability by keeping all exports in one place, makes it easier to see
         * what a module provides, ensures consistent export patterns across the codebase, and
         * simplifies maintenance by centralizing export management.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/group-exports.md
         */
        'import-x/group-exports': 'error',

        /**
         * Requires all exports to be placed at the end of the file.
         *
         * Enhances code organization by establishing a consistent structure,
         * improves readability by making exports easy to locate at a predictable position,
         * separates implementation from interface, and creates a clear visual distinction
         * between internal logic and public API.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/exports-last.md
         */
        'import-x/exports-last': 'error',

        /**
         * Requires all import statements to be placed at the top of the file.
         *
         * Improves code organization by establishing a clear dependency section,
         * enhances readability by keeping all module dependencies visible at a glance,
         * prevents potential temporal dead zone issues with imports, and provides
         * a consistent structural pattern across the entire codebase.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/first.md
         */
        'import-x/first': 'error',

        /**
         * Disabled to allow renaming default exports when importing from third-party libraries.
         *
         * While our codebase discourages default exports (enforced by no-default-export),
         * we still need to interact with external libraries that may use default exports.
         * Allowing renaming provides flexibility to align imported names with our project
         * conventions, improving code clarity and consistency when working with external modules.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-rename-default.md
         */
        'import-x/no-rename-default': 'off',

        /**
         * Disabled to allow direct imports of Node.js builtin modules.
         *
         * In a Node.js environment or full-stack application, direct access to Node's core modules
         * is often necessary for server-side functionality. Disabling this rule enables developers
         * to leverage the standard library efficiently without unnecessary wrappers, maintaining
         * idiomatic Node.js code patterns when working with file systems, networking, and other
         * server-side capabilities.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-nodejs-modules.md
         */
        'import-x/no-nodejs-modules': 'off',

        /**
         * Enforced to prevent parent directory relative imports (../foo).
         *
         * Using parent directory imports creates tight coupling between modules and folder structure,
         * making code more brittle when refactoring. This rule encourages the use of aliased imports
         * instead, which creates a more maintainable codebase by decoupling module references from
         * physical file locations. Path aliases provide stable import references that remain valid
         * even when files are moved, reducing refactoring overhead and making import statements more
         * meaningful and self-documenting.
         *
         * TypeScript path aliases defined in tsconfig are automatically excluded from this rule.
         *
         * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-parent-imports.md
         */
        'import-x/no-relative-parent-imports': [
          'error',
          {
            ignore: R.isEmpty(typescriptAliasPatterns)
              ? undefined
              : typescriptAliasPatterns,
          },
        ],
      },
    },
  ]);
};
