import { createConfig, GLOBS } from '@packages/eslint-config';

const { ESLINT_INJECT_ALL_RULES } = process.env;

export default createConfig({
  rootDirectory: import.meta.dirname,
  shouldInjectAllRules: ESLINT_INJECT_ALL_RULES === 'true',
  overrideConfigs: [
    {
      files: GLOBS.ALL_JS_LIKE,
      rules: {
        'sort-keys': 'off',
        'sort-imports': 'off',
      },
    },
  ],
});
