import perfectionistPlugin from 'eslint-plugin-perfectionist';

import type { FlatConfig } from '../utilities.ts';
import { defineInfiniteDepthFlatConfig } from '../utilities.ts';

interface Options {
  sortImportsMaxLineLength: number;
}
function createPerfectionistConfig(options: Options): FlatConfig[] {
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
      rules: {},
    },
  ]);
}

export { createPerfectionistConfig };
