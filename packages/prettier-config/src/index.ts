import type { Config } from 'prettier';

export const prettierConfig: Config = {
  /** General options */
  singleQuote: true,
  quoteProps: 'consistent',
  htmlWhitespaceSensitivity: 'ignore',
  singleAttributePerLine: true,
  vueIndentScriptAndStyle: true,

  /** Overrides */
  overrides: [
    {
      files: [
        '**/.vscode/**/*.json',
        '**/.vscode/**/*.code-snippets',
        '**/tsconfig.json',
        '**/tsconfig.*.json',
      ],
      options: {
        parser: 'jsonc',
      },
    },
    {
      files: ['**/*.html'],
      options: {
        printWidth: 120,
        singleAttributePerLine: false,
      },
    },
    {
      files: ['**/.cursorrules'],
      options: {
        parser: 'markdown',
      },
    },
  ],
};
