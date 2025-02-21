import { R } from '@packages/utils';
import { defineConfig, unshiftAllRules } from '$utils/index.ts';
import { createGitignoreConfig } from './configs/gitignore.ts';
import { createBuiltInConfig } from './configs/built-in.ts';
import { createTypescriptConfig } from './configs/typescript.ts';
import { GLOBS } from '$utils/globs.ts';
import { Config } from '$types/index.ts';

interface Options {
  rootDirectory: string;
  shouldEnableAllRules: boolean;
}
export async function createConfig(options: Options): Promise<Config[]> {
  const { rootDirectory, shouldEnableAllRules } = options;

  const configs = defineConfig([
    {
      ...(await createGitignoreConfig({ rootDirectory })),
      name: 'gitignore',
    },
    {
      name: 'built-in',
      files: GLOBS.ALL_JS_LIKE,
      extends: createBuiltInConfig(),
    },
    {
      name: 'typescript',
      files: GLOBS.ALL_JS_LIKE,
      extends: createTypescriptConfig({ tsconfigRootDir: rootDirectory }),
    },
  ]);

  return R.pipe(configs, shouldEnableAllRules ? unshiftAllRules : R.identity());
}
