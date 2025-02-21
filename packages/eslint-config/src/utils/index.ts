import { R } from '@packages/utils';
import { simpleGit } from 'simple-git';
import path from 'path';
import { Config, ConfigWithExtendsOrArray } from '$types/index.ts';

export async function getGitignoreFiles(rootDirectory: string) {
  const git = simpleGit(rootDirectory);
  const allFiles = await git.raw([
    'ls-files',
    '--cached',
    '--others',
    '--exclude-standard',
  ]);

  return R.pipe(
    allFiles,
    R.split(/\r?\n/),
    R.filter(R.endsWith('.gitignore')),
    R.map((file) => path.join(rootDirectory, file)),
  );
}

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

export function unshiftAllRules(configs: Config[]): Config[] {
  const allRulesConfigs: Config[] = [];

  return R.concat(allRulesConfigs, configs);
}
