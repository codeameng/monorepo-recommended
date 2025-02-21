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
        R.pipe(
          extendsConfig,
          R.merge(R.pick(config, ['files', 'ignores'])),
          R.omitBy(R.isNot(R.isDefined)),
        ),
      );
    }

    eslintConfigs.push(R.omit(config, ['extends']));
  }

  return eslintConfigs;
}
