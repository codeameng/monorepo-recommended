import dependPlugin from 'eslint-plugin-depend';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const createDependConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    dependPlugin.configs['flat/recommended'],
    {
      rules: {
        'depend/ban-dependencies': [
          'error',
          {
            allowed: [],
          },
        ],
      },
    },
  ]);
};

export { createDependConfig };
