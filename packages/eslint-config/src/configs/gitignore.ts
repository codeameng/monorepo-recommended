import path from 'path';

import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import { globby } from 'globby';

import { defineESLintConfig, R } from '$utils/index.ts';

import type { Config } from '$types/index.ts';

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
