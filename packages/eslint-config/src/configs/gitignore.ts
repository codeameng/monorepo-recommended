import type { Config } from '$types/index.ts';
import { defineESLintConfig } from '$utils/index.ts';
import { R } from '@packages/utils';
import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import { globby } from 'globby';
import path from 'path';

export const createGitignoreConfig = async (
  rootDirectory: string,
): Promise<Config[]> => {
  const gitignoreFiles = await globby('**/.gitignore', {
    cwd: rootDirectory,
    gitignore: true,
  });

  return defineESLintConfig([
    eslintConfigFlatGitignore({
      root: true,
      files: R.map(gitignoreFiles, (file) => path.basename(file)),
    }),
  ]);
};
