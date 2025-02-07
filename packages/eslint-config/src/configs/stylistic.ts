import stylisticPlugin from '@stylistic/eslint-plugin';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';
import type { FlatConfig } from '$utilities/index.ts';

const createStylisticConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    stylisticPlugin.configs['recommended-flat'],
    {
      // @keep-sorted
      rules: {
        '@stylistic/array-bracket-newline': 'off',
        '@stylistic/array-bracket-spacing': 'off',
        '@stylistic/array-element-newline': 'off',
        '@stylistic/arrow-parens': 'off',
        '@stylistic/brace-style': 'off',
        '@stylistic/comma-dangle': 'off',
        '@stylistic/comma-spacing': 'off',
        '@stylistic/eol-last': 'off',
        '@stylistic/function-call-argument-newline': 'off',
        '@stylistic/function-paren-newline': 'off',
        '@stylistic/implicit-arrow-linebreak': 'off',
        '@stylistic/indent-binary-ops': 'off',
        '@stylistic/indent': 'off',
        '@stylistic/jsx-newline': 'error',
        '@stylistic/jsx-one-expression-per-line': 'off',
        '@stylistic/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
          },
        ],
        '@stylistic/jsx-wrap-multilines': 'off',
        '@stylistic/key-spacing': 'off',
        '@stylistic/lines-around-comment': [
          'error',
          {
            allowBlockStart: true,
            allowObjectStart: true,
            allowArrayStart: true,
            allowClassStart: true,
          },
        ],
        '@stylistic/max-len': 'off',
        '@stylistic/member-delimiter-style': 'off',
        '@stylistic/multiline-comment-style': 'off',
        '@stylistic/multiline-ternary': 'off',
        '@stylistic/no-multi-spaces': 'off',
        '@stylistic/no-multiple-empty-lines': 'off',
        '@stylistic/no-trailing-spaces': 'off',
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
        '@stylistic/object-curly-spacing': 'off',
        '@stylistic/object-property-newline': 'off',
        '@stylistic/operator-linebreak': 'off',
        '@stylistic/padding-line-between-statements': [
          'error',

          /** Directive */
          {
            blankLine: 'always',
            prev: 'directive',
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: 'directive',
          },
          {
            blankLine: 'any',
            prev: 'directive',
            next: 'directive',
          },

          /** Type like */
          {
            blankLine: 'always',
            prev: ['interface', 'type', 'enum'],
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: ['interface', 'type', 'enum'],
          },
          {
            blankLine: 'any',
            prev: ['interface', 'type', 'enum'],
            next: ['interface', 'type', 'enum'],
          },

          /** Variable */
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: ['const', 'let', 'var'],
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var'],
          },

          /** Block like */
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

          /** Expression */
          {
            blankLine: 'always',
            prev: 'expression',
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: 'expression',
          },
          {
            blankLine: 'any',
            prev: 'expression',
            next: 'expression',
          },

          /** Case */
          {
            blankLine: 'always',
            prev: ['case', 'default'],
            next: '*',
          },

          /** Return */
          {
            blankLine: 'always',
            prev: 'return',
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: 'return',
          },

          /** Export */
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

          /** Function overload */
          {
            blankLine: 'never',
            prev: 'function-overload',
            next: 'function',
          },
        ],
        '@stylistic/quote-props': 'off',
        '@stylistic/quotes': 'off',
        '@stylistic/semi': 'off',
        '@stylistic/space-infix-ops': 'off',
        '@stylistic/wrap-regex': 'off',
      },
    },
  ]);
};

export { createStylisticConfig };
