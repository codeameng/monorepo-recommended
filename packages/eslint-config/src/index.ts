import { ESLintConfig } from '$types/index.ts';
import { createPresetConfig, PresetOptions } from './configs/index.ts';

interface Options {
  presetOptions: PresetOptions;
}
export async function createConfig(options: Options): Promise<ESLintConfig[]> {
  const { presetOptions } = options;

  const presetConfigs = await createPresetConfig(presetOptions);

  return presetConfigs;
}
