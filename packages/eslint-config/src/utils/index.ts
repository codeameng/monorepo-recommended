import { ESLintConfig, ESLintConfigOrArray } from '$types/index.ts';
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

export function defineConfig(configs: ESLintConfigOrArray[]): ESLintConfig[] {
  return R.flat(configs);
}

interface PresetConfigWithIgnores {
  name: string;
  ignores: string[];
}
interface PresetConfigWithExtends {
  name: string;
  files: (string | string[])[];
  extends: ESLintConfigOrArray[];
}
type PresetConfig = PresetConfigWithIgnores | PresetConfigWithExtends;
export function definePresetConfig(configs: PresetConfig[]): ESLintConfig[] {
  const presetConfigs: ESLintConfig[] = [];

  R.forEach(configs, (config) => {
    if ('ignores' in config) {
      presetConfigs.push(config);
    }

    if ('extends' in config) {
      const extendsConfigs = defineConfig(config.extends);
      R.forEach(extendsConfigs, (extendsConfig) => {
        presetConfigs.push({
          ...extendsConfig,
          files: config.files,
        });
      });
    }
  });

  return presetConfigs;
}

export function enableAllRules(configs: ESLintConfig[]): ESLintConfig[] {

  return configs;
}
