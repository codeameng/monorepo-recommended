import { ConfigArray } from 'typescript-eslint';

export type ESLintConfig = ConfigArray[number];
export type ESLintConfigOrArray = ESLintConfig | ESLintConfig[];
