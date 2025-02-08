import eslintJs from '@eslint/js';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const createBuiltInConfig = (): FlatConfig[] => {
  return defineInfiniteDepthFlatConfig([
    eslintJs.configs.recommended,
    {
      // @keep-sorted
      rules: {
        'arrow-body-style': 'off',
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
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'require-unicode-regexp': 'off',
        'sort-imports': 'off',
        'sort-keys': 'off',
      },
    },
  ]);
};

export { createBuiltInConfig };
