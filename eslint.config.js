import {
  createConfig,
  JAVASCRIPT_LIKE_CONFIG_FILES,
} from '@packages/eslint-config';

export default createConfig({
  /** General options */
  shouldEnableAllRules: process.env['ESLINT_ENABLE_ALL_RULES'] === 'true',
  ruleLevel: null,
  prettierPrintWidth: 80,
  tsconfigRootDir: import.meta.dirname,
  tsconfigProject: ['**/tsconfig.json', '**/tsconfig.*.json'],

  /** Overrides */
  overrides: [
    {
      files: [JAVASCRIPT_LIKE_CONFIG_FILES],
      rules: {
        'import-x/no-default-export': 'off',
      },
    },
  ],
});
