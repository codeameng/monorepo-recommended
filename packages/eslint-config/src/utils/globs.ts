import { R } from './remeda.ts';

const ALL_PACKAGE_D_TS = ['**/package.d.ts'];
const ALL_PACKAGE_JSON = ['**/package.json'];
const ALL_TSCONFIG_JSON = ['**/tsconfig.json', '**/tsconfig.*.json'];
const ALL_TURBO_JSON = ['**/turbo.json'];

const ALL_JS = ['**/*.{js,cjs,mjs}'];
const ALL_TS = ['**/*.{ts,cts,mts}'];
const ALL_D_TS = ['**/*.d.ts'];
const ALL_JSX = ['**/*.{jsx,cjsx,mjsx}'];
const ALL_TSX = ['**/*.{tsx,ctsx,mtsx}'];
const ALL_JSON = ['**/*.{json,jsonc}', '**/.vscode/**/*.code-snippets'];

const ALL_JS_LIKE = R.flat([ALL_JS, ALL_TS, ALL_D_TS, ALL_JSX, ALL_TSX]);
const ALL_JS_LIKE_CONFIG = ['**/*.config.{js,cjs,mjs,ts,cts,mts}'];

export const GLOBS = {
  ALL_PACKAGE_D_TS,
  ALL_PACKAGE_JSON,
  ALL_TSCONFIG_JSON,
  ALL_TURBO_JSON,

  ALL_JS,
  ALL_TS,
  ALL_D_TS,
  ALL_JSX,
  ALL_TSX,
  ALL_JSON,

  ALL_JS_LIKE,
  ALL_JS_LIKE_CONFIG,
} satisfies Record<string, string[]>;
