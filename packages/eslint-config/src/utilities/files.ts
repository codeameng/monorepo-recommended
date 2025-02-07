const js = '**/*.{js,cjs,mjs}';
const ts = '**/*.{ts,cts,mts}';
const jsx = '**/*.{jsx,cjsx,mjsx}';
const tsx = '**/*.{tsx,ctsx,mtsx}';
const json = '**/*.{json,jsonc,code-snippets}';

export const files = {
  /** General extensions */
  js,
  ts,
  jsx,
  tsx,
  json,

  /** Special files */
  'package-json': '**/package.json',
  'tsconfig-json': ['**/tsconfig.json', '**/tsconfig.*.json'],
  'turbo-json': '**/turbo.json',

  /** Grouped files */
  'javascript-like': [js, ts, jsx, tsx],
  'javascript-like-config': '**/*.config.{js,cjs,mjs,ts,cts,mts}',
};
