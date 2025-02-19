import { Config, ConfigOrArray } from '$types/index.ts';
import { R } from '@packages/utils';

export function defineConfig(configs: ConfigOrArray[]): Config[] {
  return R.flat(configs);
}
