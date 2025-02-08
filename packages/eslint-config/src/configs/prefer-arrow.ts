import eslintPluginPreferArrow from 'eslint-plugin-prefer-arrow';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const createPreferArrowConfig = (): FlatConfig[] => {
  return defineInfiniteDepthFlatConfig([
    {
      plugins: {
        'prefer-arrow': eslintPluginPreferArrow,
      },
      // @keep-sorted
      rules: {
        'prefer-arrow/prefer-arrow-functions': [
          'error',
          {
            disallowPrototype: true,
            singleReturnOnly: false,
            classPropertiesAllowed: false,
          },
        ],
      },
    },
  ]);
};

export { createPreferArrowConfig };
