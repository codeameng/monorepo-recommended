import { createConfig } from '@packages/eslint-config';

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
      files: ['**/*.config.{js,cjs,mjs,ts,cts,mts}'],
      rules: {
        'import-x/no-default-export': 'off',
      },
    },
  ],
});
