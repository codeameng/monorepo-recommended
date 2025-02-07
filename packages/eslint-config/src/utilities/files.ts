const FILES = {
  js: '**/*.{js,cjs,mjs}',
  ts: '**/*.{ts,cts,mts}',
  jsx: '**/*.{jsx,cjsx,mjsx}',
  tsx: '**/*.{tsx,ctsx,mtsx}',
  json: '**/*.{json,jsonc,code-snippets}',
};

const PACKAGE_JSON_FILES = '**/package.json';
const TS_CONFIG_JSON_FILES = ['**/tsconfig.json', '**/tsconfig.*.json'];
const TURBO_JSON_FILES = '**/turbo.json';
const JAVASCRIPT_LIKE_FILES = [FILES.js, FILES.ts, FILES.jsx, FILES.tsx];
const JAVASCRIPT_LIKE_CONFIG_FILES = '**/*.config.{js,cjs,mjs,ts,cts,mts}';

export {
  FILES,
  JAVASCRIPT_LIKE_CONFIG_FILES,
  JAVASCRIPT_LIKE_FILES,
  PACKAGE_JSON_FILES,
  TS_CONFIG_JSON_FILES,
  TURBO_JSON_FILES,
};
