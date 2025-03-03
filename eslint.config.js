import { createConfig, GLOBS } from '@packages/eslint-config';

const { ESLINT_INJECT_ALL_RULES } = process.env;

const shouldInjectAllRules = ESLINT_INJECT_ALL_RULES === 'true';

export default createConfig({
  rootDirectory: import.meta.dirname,
  shouldInjectAllRules,
  overrideConfigs: [
    {
      files: GLOBS.ALL_JS_LIKE,
      // TODO: Remove these rules once we have a better way to handle them
      rules: {
        'sort-keys': 'off',
        'sort-imports': 'off',
        'require-unicode-regexp': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@stylistic/implicit-arrow-linebreak': 'off',
      },
    },
  ],
});
