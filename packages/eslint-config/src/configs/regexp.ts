import { configs } from 'eslint-plugin-regexp';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const createRegexpConfig = (): FlatConfig[] => {
  return defineInfiniteDepthFlatConfig([
    configs['flat/recommended'],
    {
      // @keep-sorted
      rules: {
        'regexp/prefer-lookaround': 'error',
        'regexp/prefer-named-capture-group': 'error',
        'regexp/require-unicode-regexp': 'error',
        'regexp/require-unicode-sets-regexp': 'error',
      },
    },
  ]);
};

export { createRegexpConfig };
