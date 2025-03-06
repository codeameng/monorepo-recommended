import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import { R } from '@packages/utils';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import path from 'path';
import { simpleGit } from 'simple-git';

const getGitignoreFiles = async (rootDirectory: string): Promise<string[]> => {
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
};

export const createGitignoreConfig = async (
  rootDirectory: string,
): Promise<Config[]> => {
  return defineConfig([
    eslintConfigFlatGitignore({
      root: true,
      files: await getGitignoreFiles(rootDirectory),
    }),
  ]);
};
