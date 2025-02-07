import unusedImportsPlugin from 'eslint-plugin-unused-imports';

import type { FlatConfig } from '$utilities/index.ts';

import {
  defineInfiniteDepthFlatConfig,
  OFF_LEVEL_IN_EDITOR,
} from '$utilities/index.ts';

const createUnusedImportsConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    {
      plugins: {
        'unused-imports': unusedImportsPlugin,
      },
      // @keep-sorted
      rules: {
        'unused-imports/no-unused-imports': OFF_LEVEL_IN_EDITOR,
        'unused-imports/no-unused-vars': 'error',
      },
    },
  ]);
};

export { createUnusedImportsConfig };
