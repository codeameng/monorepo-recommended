import type { Linter } from 'eslint';

export type ESLintConfig = Linter.Config;

export type Config = ESLintConfig | ESLintConfig[];
