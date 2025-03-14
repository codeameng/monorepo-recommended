import { createConfig, GLOBS } from '@packages/eslint-config';

const { ESLINT_INJECT_ALL_RULES } = process.env;

export default createConfig({
  rootDirectory: import.meta.dirname,
  shouldInjectAllRules: ESLINT_INJECT_ALL_RULES === 'true',
  overrideConfigs: [
    {
      files: GLOBS.ALL_JS_LIKE,
      // TODO: Remove these rules once we have a better way to handle them
      rules: {
        'sort-keys': 'off',
        'perfectionist/sort-objects': 'off',
        'require-unicode-regexp': 'off',
        'import-x/dynamic-import-chunkname': 'off',
        '@stylistic/object-property-newline': 'off',
        'perfectionist/sort-object-types': 'off',
      },
    },

    /** Disable import-x/no-default-export for specific files */
    {
      files: GLOBS.ALL_JS_LIKE_CONFIG,
      rules: {
        'import-x/no-default-export': 'off',
      },
    },
  ],
});
