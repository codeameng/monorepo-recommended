import dependPlugin from 'eslint-plugin-depend';

import { defineInfiniteDepthFlatConfig } from '../utilities.ts';
import type { FlatConfig } from '../utilities.ts';

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
