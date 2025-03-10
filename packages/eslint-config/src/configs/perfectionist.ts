import type { Config } from '$types/index.ts';
import { defineESLintConfig } from '$utils/index.ts';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

export const createPerfectionistConfig = (): Config[] => {
  return defineESLintConfig([
    {
      plugins: {
        perfectionist: eslintPluginPerfectionist,
      },
      settings: {
        perfectionist: {
          type: 'natural',
          ignoreCase: false,
        },
      },
    },
    {
      rules: {
        'sort-imports': 'off',
        'import-x/order': 'off',
      },
    },
    {
      rules: {},
    },
  ]);
};
