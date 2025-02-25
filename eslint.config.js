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
        'sort-imports': 'off',
        'arrow-body-style': 'off',
        'require-unicode-regexp': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
});
