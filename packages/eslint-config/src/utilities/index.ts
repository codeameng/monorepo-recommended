import { Config, ESLintConfig } from '$types/index.ts';
import { R } from '@packages/utilities';

export function defineConfig(configs: Config[]): ESLintConfig[] {
  return R.flat(configs);
}
