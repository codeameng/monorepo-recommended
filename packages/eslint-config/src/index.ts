import { defineESLintConfig, GLOBS, injectAllRules, R } from '$utils/index.ts';
import type { Config, StrictConfigWithExtends } from '$types/index.ts';
import {
  createBuiltInConfig,
  createGitignoreConfig,
  createImportXConfig,
  createStylisticConfig,
  createTypescriptConfig,
} from './configs/index.ts';
import pProps from 'p-props';

interface Options {
  rootDirectory: string;
  shouldInjectAllRules: boolean;
  overrideConfigs: Config[];
}

const createConfig = async (options: Options): Promise<Config[]> => {
  const { rootDirectory, shouldInjectAllRules, overrideConfigs } = options;

  const typescriptProject = ['**/tsconfig.json', '**/tsconfig.*.json'];

  const {
    gitignoreConfig,
    builtInConfig,
    typescriptConfig,
    importXConfig,
    stylisticConfig,
  } = await pProps({
    gitignoreConfig: createGitignoreConfig(rootDirectory),
    builtInConfig: createBuiltInConfig(),
    typescriptConfig: createTypescriptConfig(rootDirectory),
    importXConfig: createImportXConfig({
      rootDirectory,
      typescriptProject,
    }),
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

export { GLOBS, createConfig };
