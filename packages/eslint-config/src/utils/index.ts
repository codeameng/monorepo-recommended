import { ESLintConfig, ESLintConfigOrArray } from '$types/index.ts';
import { R } from '@packages/utils';

export function defineConfig(configs: ESLintConfigOrArray[]): ESLintConfig[] {
  return R.flat(configs);
}
