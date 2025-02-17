import { Config, ESLintConfig } from '$types/index.ts';
import { defineConfig } from '$utilities/index.ts';
import { R } from '@packages/utilities';
import { createBuiltInConfig } from './built-in.ts';

interface ConfigBase {
  name: string;
}
interface ConfigWithIgnores extends ConfigBase {
  ignores: Array<string | string[]>;
}
interface ConfigWithExtends extends ConfigBase {
  files: Array<string | string[]>;
  extends: Config[];
}
type ConfigCombined = ConfigWithIgnores | ConfigWithExtends;

function defineRecommendedConfig(configs: ConfigCombined[]) {
  const recommendedConfigs: Config[] = [];

  R.forEach(configs, (config) => {
    if ('ignores' in config) {
      recommendedConfigs.push({
        ...config,
        ignores: R.flat(config.ignores),
      });
    }
  });

  return defineConfig(recommendedConfigs);
}
