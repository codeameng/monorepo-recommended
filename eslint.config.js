import { createConfig } from '@packages/eslint-config';

export default createConfig({
  shouldEnableAllRules: process.env['ESLINT_ENABLE_ALL_RULES'] === 'true',
  rootDirname: import.meta.dirname,
  ruleLevel: undefined,
  prettierPrintWidth: 80,
});
