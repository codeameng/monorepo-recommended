import dependPlugin from 'eslint-plugin-depend';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';
import type { FlatConfig } from '$utilities/index.ts';

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
