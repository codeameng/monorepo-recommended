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
        '@stylistic/quotes': [
          'error',
          singleQuote ? 'single' : 'double',
          {
            ignoreStringLiterals: true,
          },
        ],

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/object-curly-spacing
         */
        '@stylistic/object-curly-spacing': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/comma-dangle
         */
        '@stylistic/comma-dangle': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/quote-props
         */
        '@stylistic/quote-props': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/indent
         */
        '@stylistic/indent': 'off',

        /**
         * Enforces consistent spacing around comments.
         *
         * Benefits: Enhances code readability by visually separating block comments (documentation)
         * from code with blank lines, while allowing line comments to remain compact with their
         * related code. This balanced approach treats block comments as conceptual dividers
         * for major code sections, while preserving the density of line comments for inline
         * explanations and quick annotations.
         *
         * @see https://eslint.style/rules/default/lines-around-comment
         */
        '@stylistic/lines-around-comment': [
          'error',
          {
            beforeBlockComment: true,
            beforeLineComment: false,
            allowBlockStart: true,
            allowObjectStart: true,
            allowArrayStart: true,
            allowClassStart: true,
          },
        ],

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/padded-blocks
         */
        '@stylistic/padded-blocks': 'off',

        /**
         * Enforces consistent spacing in comments.
         *
         * Benefits: Improves readability by ensuring that comments have proper spacing
         * after comment markers. This makes comments more legible and
         * distinguishable from code, enhancing overall code clarity.
         *
         * @see https://eslint.style/rules/default/spaced-comment
         */
        '@stylistic/spaced-comment': 'error',
      },
    },
  ]);
};
