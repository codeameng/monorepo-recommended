import { createConfig } from '@packages/eslint-config';

const { ESLINT_ENABLE_ALL_RULES } = process.env;

export default createConfig({
  shouldEnableAllRules: ESLINT_ENABLE_ALL_RULES === 'true',
  presetOptions: {
    rootDirectory: import.meta.dirname,
  },
});
