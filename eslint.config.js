import { createConfig, FILES } from '@packages/eslint-config';

export default createConfig({
  /** General options */
  shouldEnableAllRules: process.env['ESLINT_ENABLE_ALL_RULES'] === 'true',
  ruleLevel: null,
  typescriptConfig: {
    tsconfigRootDir: import.meta.dirname,
    tsconfigProject: FILES['tsconfig.json'],
  },
  importConfig: {
    workspacePackagePathPatterns: ['^\\@packages\\/.*$'],
    aliasPathPatterns: ['^\\$.*$'],
  },

  /** Overrides */
  overrides: [],
});
