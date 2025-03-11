import stylisticESLintPlugin from '@stylistic/eslint-plugin';

import { defineESLintConfig, getPrettierConfig } from '@/utils/index.ts';

import type { Config } from '@/types/index.ts';

export const createStylisticConfig = async (): Promise<Config[]> => {
  const { singleQuote } = await getPrettierConfig();

  return defineESLintConfig([
    {
      plugins: {
        '@stylistic': stylisticESLintPlugin,
      },
    },
    {
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
         * Enhances code readability by visually separating block comments (documentation)
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
         * Improves readability by ensuring that comments have proper spacing
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
         * Creates logical separation between different code blocks, making the code
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
         * Enforces object properties to always be on separate lines.
         *
         * This strict approach to object formatting provides several benefits:
         * - Improves readability by giving each property its own line
         * - Makes code reviews easier by highlighting property changes in diffs
         * - Establishes a consistent pattern throughout the codebase
         * - Reduces merge conflicts when multiple developers add properties
         * - Scales naturally as objects grow without requiring reformatting
         *
         * @see https://eslint.style/rules/default/object-curly-newline
         */
        '@stylistic/object-curly-newline': [
          'error',
          {
            ObjectExpression: {
              multiline: true,
              minProperties: 1,
              consistent: true,
            },
          },
        ],

        /**
         * Disabled multiline comment style enforcement.
         *
         * This rule is disabled to allow developers to flexibly choose comment styles
         * based on specific contexts. Both block comments and multiple single-line comments
         * have their advantages in different scenarios. Enforcing a single style might
         * reduce readability in certain situations. Maintaining flexibility helps developers
         * select the most appropriate comment style for the context.
         *
         * @see https://eslint.style/rules/default/multiline-comment-style
         */
        '@stylistic/multiline-comment-style': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/no-multiple-empty-lines
         */
        '@stylistic/no-multiple-empty-lines': 'off',

        /**
         * Disabled to prevent conflicts with Prettier formatting.
         *
         * @see https://eslint.style/rules/default/space-before-function-paren
         */
        '@stylistic/space-before-function-paren': 'off',
      },
    },
  ]);
};
