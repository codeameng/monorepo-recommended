import pProps from 'p-props';

import { defineESLintConfig, GLOBS, injectAllRules, R } from '$utils/index.ts';

import type { Config, StrictConfigWithExtends } from '$types/index.ts';

import {
  createBuiltInConfig,
  createGitignoreConfig,
  createImportXConfig,
  createPerfectionistConfig,
  createStylisticConfig,
  createTypescriptConfig,
} from './configs/index.ts';

interface Options {
  overrideConfigs: Config[];
  rootDirectory: string;
  shouldInjectAllRules: boolean;
}

const createConfig = async (options: Options): Promise<Config[]> => {
  const { rootDirectory, shouldInjectAllRules, overrideConfigs } = options;

  const typescriptProject = ['**/tsconfig.json', '**/tsconfig.*.json'];

  const {
    gitignoreConfig,
    builtInConfig,
    typescriptConfig,
    importXConfig,
    perfectionistConfig,
    stylisticConfig,
  } = await pProps({
    gitignoreConfig: createGitignoreConfig(rootDirectory),
    builtInConfig: createBuiltInConfig(),
    typescriptConfig: createTypescriptConfig(rootDirectory),
    importXConfig: createImportXConfig({
      rootDirectory,
      typescriptProject,
    }),
    perfectionistConfig: createPerfectionistConfig(),
    stylisticConfig: createStylisticConfig(),
  });

  const configs = defineESLintConfig([
    {
      name: 'gitignore',
      files: undefined,
      extends: gitignoreConfig,
    },
    {
      name: 'built-in',
      files: GLOBS.ALL_JS_LIKE,
      extends: builtInConfig,
    },
    {
      name: 'typescript',
      files: GLOBS.ALL_JS_LIKE,
      extends: typescriptConfig,
    },
    {
      name: 'import-x',
      files: GLOBS.ALL_JS_LIKE,
      extends: importXConfig,
    },
    {
      name: 'perfectionist',
      files: GLOBS.ALL_JS_LIKE,
      extends: perfectionistConfig,
    },
    {
      name: 'stylistic',
      files: GLOBS.ALL_JS_LIKE,
      extends: stylisticConfig,
    },
  ] satisfies StrictConfigWithExtends[]);

  return R.pipe(
    configs,
    shouldInjectAllRules ? injectAllRules : R.identity(),
    R.concat(overrideConfigs),
  );
};

export { createConfig, GLOBS };
