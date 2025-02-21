import { createConfig } from '@packages/eslint-config';

const { ESLINT_ENABLE_ALL_RULES } = process.env;

export default createConfig({
  rootDirectory: import.meta.dirname,
  shouldEnableAllRules: ESLINT_ENABLE_ALL_RULES === 'true',
});
