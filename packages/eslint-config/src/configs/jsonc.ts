import jsoncPlugin from 'eslint-plugin-jsonc';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const createJsoncConfig = (): FlatConfig[] => {
  return defineInfiniteDepthFlatConfig([
    jsoncPlugin.configs['flat/recommended-with-jsonc'],
    {
      // @keep-sorted
      rules: {
        'jsonc/array-element-newline': 'off',
        'jsonc/comma-dangle': 'off',
        'jsonc/indent': 'off',
        'jsonc/key-name-casing': 'off',
        'jsonc/sort-array-values': 'off',
        'jsonc/sort-keys': 'off',
      },
    },
  ]);
};

export { createJsoncConfig };
