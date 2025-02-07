import perfectionistPlugin from 'eslint-plugin-perfectionist';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const createPerfectionistConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    {
      plugins: {
        perfectionist: perfectionistPlugin,
      },
      settings: {
        perfectionist: {
          type: 'natural',
          ignoreCase: false,
        },
      },
      // @keep-sorted
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              value: {
                'global-alias': '^\\$.*$',
                'workspace-package': '^\\@packages\\/.*$',
              },
              type: {
                'global-alias-type': '^\\$.*$',
                'workspace-package-type': '^\\@packages\\/.*$',
              },
            },
            groups: [
              'builtin-type',
              'builtin',
              'external-type',
              'external',
              'internal-type',
              'internal',
              'workspace-package-type',
              'workspace-package',
              'global-alias-type',
              'global-alias',
              'parent-type',
              'parent',
              'sibling-type',
              'sibling',
              'index-type',
              'index',
              'object',
              'style',
              'side-effect',
              'side-effect-style',
              'unknown',
            ],
          },
        ],
        'perfectionist/sort-interfaces': 'error',
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-named-exports': [
          'error',
          {
            groupKind: 'values-first',
          },
        ],
        'perfectionist/sort-named-imports': 'error',
        'perfectionist/sort-objects': [
          'error',
          {
            destructureOnly: true,
          },
        ],
        'perfectionist/sort-union-types': 'error',
      },
    },
  ]);
};

export { createPerfectionistConfig };
