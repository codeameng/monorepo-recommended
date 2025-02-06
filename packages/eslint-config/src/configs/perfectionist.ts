import perfectionistPlugin from 'eslint-plugin-perfectionist';

import { defineInfiniteDepthFlatConfig } from '../utilities.ts';
import type { FlatConfig } from '../utilities.ts';

interface Options {
  sortImportsMaxLineLength: number;
}

const createPerfectionistConfig = function (options: Options): FlatConfig[] {
  const { sortImportsMaxLineLength } = options;

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
            type: 'line-length',
            order: 'desc',
            maxLineLength: sortImportsMaxLineLength,
            groups: [
              ['builtin', 'builtin-type'],
              ['external', 'external-type'],
              ['internal', 'internal-type'],
              ['parent', 'parent-type'],
              ['sibling', 'sibling-type'],
              ['index', 'index-type'],
              ['object'],
              ['style'],
              ['side-effect'],
              ['side-effect-style'],
              ['unknown'],
            ],
          },
        ],
        'perfectionist/sort-interfaces': 'error',
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-named-exports': 'error',
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
