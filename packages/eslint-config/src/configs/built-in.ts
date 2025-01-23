import eslintJs from '@eslint/js';

import type { FlatConfig } from '../utilities.ts';
import { defineInfiniteDepthFlatConfig } from '../utilities.ts';

function createBuiltInConfig(): FlatConfig[] {
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
        'curly': 'error',
        'func-style': ['error', 'declaration'],
        'id-length': 'off',
        'max-lines-per-function': 'off',
        'max-statements': 'error',
        'no-continue': 'off',
        'no-duplicate-imports': 'off',
        'no-negated-condition': 'error',
        'no-ternary': 'off',
        'no-undefined': 'off',
        'one-var': ['error', 'never'],
        'sort-imports': 'off',
        'sort-keys': 'off',
      },
    },
  ]);
}

export { createBuiltInConfig };
