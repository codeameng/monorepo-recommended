import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import { getPrettierConfig } from '$utils/prettier.ts';
import stylisticEslintPlugin from '@stylistic/eslint-plugin';

export const createStylisticConfig = async (): Promise<Config[]> => {
  const { singleQuote } = await getPrettierConfig();

  return defineConfig([
    {
      plugins: {
        '@stylistic': stylisticEslintPlugin,
      },
      rules: {
        /**
         * Configures quote style based on Prettier configuration.
         *
         * Handles edge cases that Prettier cannot process, such as template literals.
         * Ensuring consistent quote usage throughout the codebase.
         *
         * @see https://eslint.style/rules/default/quotes
         */
        '@stylistic/quotes': ['error', singleQuote ? 'single' : 'double'],
      },
    },
  ]);
};
