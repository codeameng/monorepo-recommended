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
  overrides: [],
});
