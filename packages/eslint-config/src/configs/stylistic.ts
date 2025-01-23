import stylisticPlugin from '@stylistic/eslint-plugin';

import type { FlatConfig } from '../utilities.ts';
import { defineInfiniteDepthFlatConfig } from '../utilities.ts';

function createStylisticConfig(): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    stylisticPlugin.configs['recommended-flat'],
    {
      // @keep-sorted
      rules: {},
    },
  ]);
}

export { createStylisticConfig };
