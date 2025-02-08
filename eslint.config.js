import { createConfig, files } from '@packages/eslint-config';

export default createConfig({
  /** General options */
  shouldEnableAllRules: process.env['ESLINT_ENABLE_ALL_RULES'] === 'true',
  ruleLevel: null,
  typescriptConfig: {
    tsconfigRootDir: import.meta.dirname,
    tsconfigProject: files['tsconfig-json'],
  },
  importConfig: {
    workspacePackagePathPatterns: ['^\\@packages\\/.*$'],
    aliasPathPatterns: ['^\\$.*$'],
  },

  /** Overrides */
  overrides: [
    {
      files: [files['javascript-like-config']],
      rules: {
        'import-x/no-default-export': 'off',
      },
    },
  ],
});
