const JS = '**/*.{js,cjs,mjs}';
const TS = '**/*.{ts,cts,mts}';
const D_TS = '**/*.d.ts';
const JSX = '**/*.{jsx,cjsx,mjsx}';
const TSX = '**/*.{tsx,ctsx,mtsx}';
const JSON = '**/*.{json,jsonc,code-snippets}';

const FILES = {
  /** General extensions */
  '*.js': JS,
  '*.ts': TS,
  '*.d.ts': D_TS,
  '*.jsx': JSX,
  '*.tsx': TSX,
  '*.json': JSON,

  /** Grouped files */
  'js-like': [JS, TS, JSX, TSX],
  'js-like-config': '**/*.config.{js,cjs,mjs,ts,cts,mts}',

  /** Special files */
  'package.d.ts': '**/package.d.ts',
  'package.json': '**/package.json',
  'tsconfig.json': ['**/tsconfig.json', '**/tsconfig.*.json'],
  'turbo.json': '**/turbo.json',
};

export { FILES };
