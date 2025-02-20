import { ESLintConfig } from '$types/index.ts';
import { R } from '@packages/utils';
import { createPresetConfig, PresetOptions } from './configs/index.ts';
import { unshiftAllRules } from '$utils/index.ts';

interface Options {
  shouldEnableAllRules: boolean;
  presetOptions: PresetOptions;
}
export async function createConfig(options: Options): Promise<ESLintConfig[]> {
  const { shouldEnableAllRules, presetOptions } = options;

  const presetConfigs = await createPresetConfig(presetOptions);

  return R.pipe(
    presetConfigs,
    shouldEnableAllRules ? unshiftAllRules : R.identity(),
  );
}
