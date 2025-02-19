import { Config } from '$types/index.ts';
import {
  createPresetConfig,
  Options as PresetOptions,
} from './configs/index.ts';

interface Options {
  presetOptions: PresetOptions;
}
export async function createConfig(options: Options): Promise<Config[]> {
  const { presetOptions } = options;

  const presetConfigs = await createPresetConfig(presetOptions);

  return presetConfigs;
}
