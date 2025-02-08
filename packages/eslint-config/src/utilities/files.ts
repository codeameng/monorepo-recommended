const js = '**/*.{js,cjs,mjs}';
const ts = '**/*.{ts,cts,mts}';
const dts = '**/*.d.ts';
const jsx = '**/*.{jsx,cjsx,mjsx}';
const tsx = '**/*.{tsx,ctsx,mtsx}';
const json = '**/*.{json,jsonc,code-snippets}';

const files = {
  /** General extensions */
  js,
  ts,
  dts,
  jsx,
  tsx,
  json,

  /** Special files */
  'package-d-ts': '**/package.d.ts',
  'package-json': '**/package.json',
  'tsconfig-json': ['**/tsconfig.json', '**/tsconfig.*.json'],
  'turbo-json': '**/turbo.json',

  /** Grouped files */
  'javascript-like': [js, ts, jsx, tsx],
  'javascript-like-config': '**/*.config.{js,cjs,mjs,ts,cts,mts}',
};

export { files };
