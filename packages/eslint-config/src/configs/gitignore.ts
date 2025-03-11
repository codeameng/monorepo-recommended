import eslintConfigFlatGitignore from 'eslint-config-flat-gitignore';
import { globby } from 'globby';

import { defineESLintConfig } from '$utils/index.ts';

import type { Config } from '$types/index.ts';

export const createGitignoreConfig = async (
  rootDirectory: string,
): Promise<Config[]> => {
  const gitignoreFiles = await globby('**/.gitignore', {
    cwd: rootDirectory,
    gitignore: true,
    absolute: true,
  });

  return defineESLintConfig([
    eslintConfigFlatGitignore({
      root: true,
      files: gitignoreFiles,
    }),
  ]);
};
