import { R } from '@packages/utils';
import { Config, ConfigWithExtendsOrArray } from '$types/index.ts';

export function defineConfig(configs: ConfigWithExtendsOrArray[]): Config[] {
  const eslintConfigs: Config[] = [];

  for (const config of R.flat(configs)) {
    if (!config.extends) {
      eslintConfigs.push(config);
      continue;
    }

    for (const extendsConfig of R.flat(config.extends)) {
      eslintConfigs.push(
        R.merge(extendsConfig, R.pick(config, ['files', 'ignores'])),
      );
    }

    eslintConfigs.push(R.omit(config, ['extends']));
  }

  return eslintConfigs;
}
