import { Config } from '$types/index.ts';
import {
  createPresetConfig,
  Options as PresetOptions,
} from './configs/index.ts';

interface Options {
  presetOptions: PresetOptions;
}
export function createConfig(options: Options): Config[] {
  const { presetOptions } = options;

  const presetConfigs = createPresetConfig(presetOptions);

  return presetConfigs;
}
