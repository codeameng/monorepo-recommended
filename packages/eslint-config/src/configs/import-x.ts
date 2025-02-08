import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importXPlugin from 'eslint-plugin-import-x';

import type { FlatConfig } from '$utilities/index.ts';

import {
  defineInfiniteDepthFlatConfig,
  OFF_LEVEL_IN_EDITOR,
} from '$utilities/index.ts';

interface Options {
  tsconfigProject: string[];
}

const createImportXConfig = function (options: Options): FlatConfig[] {
  const { tsconfigProject } = options;

  return defineInfiniteDepthFlatConfig([
    importXPlugin.flatConfigs.recommended,
    importXPlugin.flatConfigs.typescript,
    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            project: tsconfigProject,
          }),
        ],
      },
      // @keep-sorted
      rules: {
        'import-x/consistent-type-specifier-style': 'error',
        'import-x/dynamic-import-chunkname': 'off',
        'import-x/exports-last': 'error',
        'import-x/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
          },
        ],
        'import-x/first': 'error',
        'import-x/group-exports': 'error',
        'import-x/max-dependencies': 'off',
        'import-x/newline-after-import': 'error',
        'import-x/no-absolute-path': 'error',
        'import-x/no-anonymous-default-export': 'error',
        'import-x/no-default-export': 'error',
        'import-x/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: false,
            optionalDependencies: false,
            peerDependencies: false,
            bundledDependencies: false,
            includeInternal: false,
            includeTypes: true,
            whitelist: [],
          },
        ],
        'import-x/no-internal-modules': 'off',
        'import-x/no-named-as-default-member': 'off',
        'import-x/no-named-export': 'off',
        'import-x/no-namespace': 'error',
        'import-x/no-nodejs-modules': 'error',
        'import-x/no-relative-parent-imports': [
          'error',
          {
            ignore: ['^\\$.*$'],
          },
        ],
        'import-x/no-rename-default': 'off',
        'import-x/no-unassigned-import': [
          'error',
          {
            allow: [],
          },
        ],
        'import-x/order': 'off',
        'import-x/prefer-default-export': 'off',
        'import-x/unambiguous': OFF_LEVEL_IN_EDITOR,
      },
    },
  ]);
};

export { createImportXConfig };
