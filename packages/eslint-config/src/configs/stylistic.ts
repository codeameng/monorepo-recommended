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

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/function-call-argument-newline
         */
        '@stylistic/function-call-argument-newline': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/array-element-newline
         */
        '@stylistic/array-element-newline': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/max-len
         */
        '@stylistic/max-len': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/multiline-ternary
         */
        '@stylistic/multiline-ternary': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/function-paren-newline
         */
        '@stylistic/function-paren-newline': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/implicit-arrow-linebreak
         */
        '@stylistic/implicit-arrow-linebreak': 'off',

        /**
         * Enforces consistent empty lines between statements to improve code readability.
         *
         * Benefits: Creates logical separation between different code blocks, making the code
         * structure more apparent and easier to scan. Particularly useful for distinguishing
         * related statements from unrelated ones in dense code sections.
         *
         * @see https://eslint.style/rules/default/padding-line-between-statements
         */
        '@stylistic/padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: '*',
            next: 'return',
          },
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var'],
          },
          {
            blankLine: 'always',
            prev: 'directive',
            next: '*',
          },
          {
            blankLine: 'any',
            prev: 'directive',
            next: 'directive',
          },
          {
            blankLine: 'always',
            prev: ['case', 'default'],
            next: '*',
          },
          {
            blankLine: 'always',
            prev: 'block-like',
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: 'block-like',
          },
          {
            blankLine: 'always',
            prev: 'import',
            next: '*',
          },
          {
            blankLine: 'any',
            prev: 'import',
            next: 'import',
          },
          {
            blankLine: 'always',
            prev: 'export',
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: 'export',
          },
        ],

        /**
         * Enforces consistent line break style for object literals.
         *
         * Benefits: Improves code readability by ensuring consistent formatting
         * of object literals. Objects with multiple properties are displayed with
         * properties on separate lines, making complex objects easier to read and
         * maintain while preserving space efficiency for simpler objects.
         *
         * @see https://eslint.style/rules/default/object-curly-newline
         */
        '@stylistic/object-curly-newline': [
          'error',
          {
            ObjectExpression: {
              multiline: true,
              minProperties: 2,
              consistent: true,
            },
          },
        ],

        /**
         * Enforces a specific style for multiline comments.
         *
         * Benefits: Standardizes comment formatting across the codebase by requiring
         * separate-line comments. This approach improves comment readability by
         * giving each comment line its own distinct marker, making comments easier
         * to edit and maintain over time. JSDoc comments are exempted to preserve
         * their specialized format.
         *
         * @see https://eslint.style/rules/default/multiline-comment-style
         */
        '@stylistic/multiline-comment-style': [
          'error',
          'separate-lines',
          { checkJSDoc: false },
        ],
      },
    },
  ]);
};
