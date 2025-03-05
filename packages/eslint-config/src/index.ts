import { R } from '@packages/utils';
import { defineConfig, injectAllRules } from '$utils/index.ts';
import { createGitignoreConfig } from './configs/gitignore.ts';
import { createBuiltInConfig } from './configs/built-in.ts';
import { createTypescriptConfig } from './configs/typescript.ts';
import { GLOBS } from '$utils/globs.ts';
import type { Config, StrictConfigWithExtends } from '$types/index.ts';
import { createStylisticConfig } from './configs/stylistic.ts';

interface Options {
  rootDirectory: string;
  shouldInjectAllRules: boolean;
  overrideConfigs: Config[];
}

const createConfig = async (options: Options): Promise<Config[]> => {
  const { rootDirectory, shouldInjectAllRules, overrideConfigs } = options;

  const configs = defineConfig([
    {
      name: 'gitignore',
      files: undefined,
      extends: await createGitignoreConfig(rootDirectory),
    },
    {
      name: 'built-in',
      files: GLOBS.ALL_JS_LIKE,
      extends: createBuiltInConfig(),
    },
    {
      name: 'typescript',
      files: GLOBS.ALL_JS_LIKE,
      extends: createTypescriptConfig(rootDirectory),
    },
    {
      name: 'stylistic',
      files: GLOBS.ALL_JS_LIKE,
      extends: await createStylisticConfig(),
    },
  ] satisfies StrictConfigWithExtends[]);

  return R.pipe(
    configs,
    shouldInjectAllRules ? injectAllRules : R.identity(),
    R.concat(overrideConfigs),
  );
};

export { GLOBS, createConfig };
