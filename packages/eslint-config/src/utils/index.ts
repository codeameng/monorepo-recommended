import { ESLintConfig } from '$types/index.ts';
import { R } from '@packages/utils';
import { simpleGit } from 'simple-git';
import path from 'path';

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

interface Config extends ESLintConfig {
  extends?: (ESLintConfig | ESLintConfig[])[];
}
export function defineConfig(configs: (Config | Config[])[]): ESLintConfig[] {
  const eslintConfigs: ESLintConfig[] = [];

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

export function unshiftAllRules(configs: ESLintConfig[]): ESLintConfig[] {
  const allRulesConfigs: ESLintConfig[] = [];

  return R.concat(allRulesConfigs, configs);
}
