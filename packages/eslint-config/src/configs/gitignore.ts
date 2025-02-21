import { defineConfig } from '$utils/index.ts';
import { R } from '@packages/utils';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import path from 'path';
import { simpleGit } from 'simple-git';

async function getGitignoreFiles(rootDirectory: string) {
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

interface Options {
  rootDirectory: string;
}
export async function createGitignoreConfig(options: Options) {
  const { rootDirectory } = options;

  return defineConfig([
    eslintConfigFlatGitignore({
      root: true,
      files: await getGitignoreFiles(rootDirectory),
    }),
  ]);
}
