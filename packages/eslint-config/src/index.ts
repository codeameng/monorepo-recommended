import { R } from '@packages/utils';
import { defineConfig } from '$utils/index.ts';
import { createGitignoreConfig } from './configs/gitignore.ts';
import { createBuiltInConfig } from './configs/built-in.ts';
import { createTypescriptConfig } from './configs/typescript.ts';
import { GLOBS } from '$utils/globs.ts';
import { Config, ConfigWithExtends } from '$types/index.ts';

function unshiftAllRules(configs: Config[]): Config[] {
  const allRulesConfigs: Config[] = [];

  return R.concat(allRulesConfigs, configs);
}

type StrictConfigWithExtends = {
  files: ConfigWithExtends['files'];
} & Required<Pick<ConfigWithExtends, 'name' | 'extends'>>;
interface Options {
  rootDirectory: string;
  shouldEnableAllRules: boolean;
}
export async function createConfig(options: Options): Promise<Config[]> {
  const { rootDirectory, shouldEnableAllRules } = options;

  const configs = defineConfig([
    {
      name: 'gitignore',
      files: undefined,
      extends: await createGitignoreConfig({ rootDirectory }),
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
  ] satisfies StrictConfigWithExtends[]);

  return R.pipe(configs, shouldEnableAllRules ? unshiftAllRules : R.identity());
}
