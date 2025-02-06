import eslintJs from '@eslint/js';

import { defineInfiniteDepthFlatConfig } from '../utilities.ts';
import type { FlatConfig } from '../utilities.ts';

const createBuiltInConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    eslintJs.configs.recommended,
    {
      // @keep-sorted
      rules: {
        'capitalized-comments': [
          'error',
          'always',
          {
            line: {
              ignorePattern: '.*',
            },
          },
        ],
        'func-names': ['error', 'as-needed'],
        'func-style': 'error',
        'id-length': [
          'error',
          {
            exceptions: ['R'],
          },
        ],
        'max-lines-per-function': 'off',
        'max-lines': [
          'error',
          {
            max: 512,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'no-continue': 'off',
        'no-duplicate-imports': 'off',
        'no-ternary': 'off',
        'one-var': ['error', 'never'],
        'sort-imports': 'off',
        'sort-keys': 'off',
      },
    },
  ]);
};

export { createBuiltInConfig };
